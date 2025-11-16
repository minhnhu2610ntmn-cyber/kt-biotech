import { Container, Heading, Text } from '@ktbiotech/system-design';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import ScrollAnimationWrapper from '../../components/containers/ScrollAnimationWrapper';
import { StrapiApi, buildImageUrl } from '../../config/api';

type VisionBlock = {
  id: number;
  title: string;
  description: string;
};

type MissionBlock = {
  id: number;
  title: string;
  description: string;
};

type StrapiRichTextBlock = {
  __component?: string;
  id?: number;
  body?: string;
};

function isRichTextBlock(value: unknown): value is StrapiRichTextBlock {
  if (typeof value !== 'object' || value === null) return false;
  return '__component' in value || 'body' in value;
}

function normalizeVisionBlocks(rawContent: unknown): VisionBlock[] {
  if (!Array.isArray(rawContent)) return [];

  return rawContent
    .map(item => {
      if (!isRichTextBlock(item)) return null;
      const component = item.__component;
      const body = item.body;
      const id = item.id ?? Math.random();
      if (component !== 'shared.rich-text' || typeof body !== 'string') {
        return null;
      }

      const [rawTitle, ...rest] = body.split('\n');
      const title = rawTitle?.replace(/^#+\s*/, '').trim() || 'Our Vision';
      const description = rest.join('\n').trim();

      return {
        id,
        title,
        description,
      } satisfies VisionBlock;
    })
    .filter((block): block is VisionBlock => Boolean(block));
}

function normalizeMissionBlocks(rawContent: unknown): MissionBlock[] {
  if (!Array.isArray(rawContent)) return [];

  return rawContent
    .map(item => {
      if (!isRichTextBlock(item)) return null;
      const component = item.__component;
      const body = item.body;
      const id = item.id ?? Math.random();
      if (component !== 'shared.rich-text' || typeof body !== 'string') {
        return null;
      }

      const [rawTitle, ...rest] = body.split('\n');
      const title = rawTitle?.replace(/^#+\s*/, '').trim() || 'Our Mission';
      const description = rest.join('\n').trim();

      return {
        id,
        title,
        description,
      } satisfies MissionBlock;
    })
    .filter((block): block is MissionBlock => Boolean(block));
}

export default async function VisionAndMissionPage() {
  const t = await getTranslations('common');
  const api = new StrapiApi();
  const [vision, mission] = await Promise.all([
    api.getVision(),
    api.getMission(),
  ]);

  const visionData = vision?.attributes || vision || null;
  const description: string = visionData?.description || '';

  const contentBlocks = normalizeVisionBlocks(visionData?.content);

  const imageAttributes = visionData?.image || null;
  const imageUrl = imageAttributes?.url
    ? buildImageUrl(imageAttributes.url)
    : null;

  const heading = visionData?.title || 'TẦM NHÌN';
  const subheading = visionData?.subtitle || null;

  const missionData = mission?.attributes || mission || null;
  const missionDescription: string = missionData?.description || '';
  const missionContentBlocks = normalizeMissionBlocks(missionData?.content);
  const missionHeading = missionData?.title || 'SỨ MỆNH';
  const missionImageAttributes = missionData?.image || null;
  const missionImageUrl = missionImageAttributes?.url
    ? buildImageUrl(missionImageAttributes.url)
    : null;

  return (
    <Container className='py-12 md:py-16 lg:py-20 space-y-16 md:space-y-20 lg:space-y-24'>
      <div className='grid  lg:grid-cols-[0.8fr_1fr] items-center'>
        <div
          className='relative overflow-hidden rounded-lg  min-h-[600px] lg:min-h-[700px]'
          style={
            imageUrl
              ? {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundColor: 'lightgray',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: '100%',
                }
              : undefined
          }
        >
          {imageUrl && (
            <>
              <div className='absolute inset-0 bg-[#218aec]/30 mix-blend-multiply' />
            </>
          )}
          <div className='relative z-10  mb-10 flex flex-col justify-end h-full p-8 md:p-12 lg:p-22 space-y-6 via-transparent'>
            <ScrollAnimationWrapper className='relative w-fit'>
              <div className='relative w-fit'>
                <Heading
                  level={2}
                  className='!text-2xl md:!text-3xl font-semibold tracking-wide uppercase relative'
                  weight='bold'
                  color='#215778'
                >
                  {heading}
                </Heading>
                <span
                  className='absolute bottom-0 left-0 h-0.5 bg-[#215778] block w-full animate-underline'
                  style={{ width: '0%' }}
                />
              </div>
            </ScrollAnimationWrapper>
            {subheading && (
              <Text className='!text-lg font-medium text-blue-50'>
                {subheading}
              </Text>
            )}
            <Text
              color='#333638'
              className='text-sm md:text-base leading-relaxed'
            >
              {description}
            </Text>
          </div>
        </div>

        <div className='flex flex-col justify-center space-y-5'>
          {contentBlocks.length > 0 ? (
            contentBlocks.map((block, index) => (
              <ScrollAnimationWrapper
                key={block.id}
                className='rounded-r-2xl border border-[#E3EEF5] bg-[#F4F9FD] p-6 shadow-sm hover:shadow-md transition-shadow duration-200'
                animationClass='animate-fade-in-up-delayed'
                delay={index * 200}
              >
                <Heading
                  level={4}
                  className='!text-lg md:!text-xl text-[#215778]'
                  weight='semibold'
                >
                  {block.title}
                </Heading>
                <div
                  className='mt-3 text-sm md:text-base text-[#4B5053] leading-relaxed line-clamp-3'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {block.description}
                </div>
              </ScrollAnimationWrapper>
            ))
          ) : (
            <div className='rounded-2xl border border-dashed border-[#C9DCEB] bg-[#F8FBFE] p-6 text-center'>
              <Heading
                level={5}
                className='!text-base text-[#215778] mb-2'
                weight='semibold'
              >
                {t('updating')}
              </Heading>
              <Text className='text-sm text-[#4B5053]'>
                {t('updatingVision')}
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* Mission Section */}
      <div className='space-y-8 md:space-y-10'>
        {/* Mission Heading */}
        <ScrollAnimationWrapper className='relative w-fit'>
          <div className='relative w-fit'>
            <Heading
              level={2}
              className='!text-2xl md:!text-3xl font-semibold tracking-wide uppercase relative'
              weight='bold'
              color='#215778'
            >
              {missionHeading}
            </Heading>
            <span
              className='absolute bottom-0 left-0 h-0.5 bg-[#215778] block w-full animate-underline'
              style={{ width: '0%' }}
            />
          </div>
        </ScrollAnimationWrapper>

        {/* Mission Description */}
        <ScrollAnimationWrapper delay={200}>
          <Text
            color='#4B5053'
            className='text-sm md:text-base leading-relaxed '
          >
            {missionDescription}
          </Text>
        </ScrollAnimationWrapper>

        {/* Mission Content Blocks with Image - Grid 3 columns */}
        {missionContentBlocks.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-fr'>
            {/* Column 1: First 2 items */}
            {missionContentBlocks.slice(0, 2).map((block, index) => (
              <ScrollAnimationWrapper
                key={block.id}
                className='rounded-2xl border border-[#E3EEF5] bg-[#F4F9FD] p-6 shadow-sm hover:shadow-md transition-shadow duration-200 md:col-start-1'
                animationClass='animate-fade-in-up-delayed'
                delay={index * 200}
                style={{
                  gridRowStart: index + 1,
                }}
              >
                <Heading
                  level={4}
                  className='!text-lg md:!text-xl text-[#215778]'
                  weight='semibold'
                >
                  {block.title}
                </Heading>
                <div
                  className='mt-3 text-sm md:text-base text-[#4B5053] leading-relaxed line-clamp-3'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {block.description}
                </div>
              </ScrollAnimationWrapper>
            ))}

            {/* Column 2: Image spanning 2 rows */}
            {missionImageUrl && (
              <ScrollAnimationWrapper
                className='relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden md:col-start-2 md:row-start-1 md:row-span-2'
                animationClass='animate-fade-in-up-delayed'
                delay={400}
              >
                <Image
                  src={missionImageUrl}
                  alt={missionHeading}
                  fill
                  className='object-cover'
                  priority
                />
              </ScrollAnimationWrapper>
            )}

            {/* Column 3: Last 2 items */}
            {missionContentBlocks.slice(2, 4).map((block, index) => (
              <ScrollAnimationWrapper
                key={block.id}
                className='rounded-2xl border border-[#E3EEF5] bg-[#F4F9FD] p-6 shadow-sm hover:shadow-md transition-shadow duration-200 md:col-start-3'
                animationClass='animate-fade-in-up-delayed'
                delay={(index + 2) * 200}
                style={{
                  gridRowStart: index + 1,
                }}
              >
                <Heading
                  level={4}
                  className='!text-lg md:!text-xl text-[#215778]'
                  weight='semibold'
                >
                  {block.title}
                </Heading>
                <div
                  className='mt-3 text-sm md:text-base text-[#4B5053] leading-relaxed line-clamp-3'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {block.description}
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        ) : (
          <div className='rounded-2xl border border-dashed border-[#C9DCEB] bg-[#F8FBFE] p-6 text-center'>
            <Heading
              level={5}
              className='!text-base text-[#215778] mb-2'
              weight='semibold'
            >
              {t('updating')}
            </Heading>
            <Text className='text-sm text-[#4B5053]'>
              {t('updatingMission')}
            </Text>
          </div>
        )}
      </div>
    </Container>
  );
}
