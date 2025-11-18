import { Container, Heading, SliderV2, Text } from '@ktbiotech/system-design';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import ScrollAnimationWrapper from '../../../components/containers/ScrollAnimationWrapper';
import { StrapiApi, buildImageUrl } from '../../../config/api';

type WitnessItem = {
  id: number | string;
  imageUrl: string;
  title?: string;
  alt?: string;
};

type AwardItem = {
  id: number | string;
  imageUrl: string;
  title?: string;
  alt?: string;
};

function normalizeWitnessItems(rawWitness: unknown): WitnessItem[] {
  if (!rawWitness) return [];

  // Handle different Strapi response structures
  const witnessData =
    (rawWitness as any)?.data || (rawWitness as any)?.witness || rawWitness;

  if (!Array.isArray(witnessData)) return [];

  const mappedItems = witnessData.map((item: any) => {
    const itemData = item;
    const imageData = itemData?.image || itemData;

    const imageUrl = imageData?.url || itemData?.url;
    if (!imageUrl) return null;

    return {
      id: item?.id ?? itemData?.id ?? Math.random(),
      imageUrl: buildImageUrl(imageUrl),
      title: itemData?.title || itemData?.name || itemData?.caption,
      alt:
        imageData?.alternativeText ||
        itemData?.alternativeText ||
        itemData?.title ||
        itemData?.name ||
        'Certificate',
    };
  });

  return mappedItems.filter(item => item !== null) as WitnessItem[];
}

function normalizeAwardItems(rawAward: unknown): AwardItem[] {
  if (!rawAward) return [];

  // Handle different Strapi response structures
  const awardData =
    (rawAward as any)?.data ||
    (rawAward as any)?.award ||
    (rawAward as any)?.awards ||
    rawAward;

  if (!Array.isArray(awardData)) return [];

  const mappedItems = awardData.map((item: any) => {
    const itemData = item;
    const imageData = itemData?.image || itemData;

    const imageUrl = imageData?.url || itemData?.url;
    if (!imageUrl) return null;

    return {
      id: item?.id ?? itemData?.id ?? Math.random(),
      imageUrl: buildImageUrl(imageUrl),
      title: itemData?.title || itemData?.name || itemData?.caption,
      alt:
        imageData?.alternativeText ||
        itemData?.alternativeText ||
        itemData?.title ||
        itemData?.name ||
        'Award',
    };
  });

  return mappedItems.filter(item => item !== null) as AwardItem[];
}

export default async function AwardPage() {
  const t = await getTranslations('common');
  const api = new StrapiApi();
  const award = await api.getAward();
  const awardData = award?.attributes || award || null;
  const witnessItems = normalizeWitnessItems(
    awardData?.witness || award?.witness
  );
  const awardItems = normalizeAwardItems(
    awardData?.award || awardData?.awards || award?.award || award?.awards
  );

  return (
    <Container className='py-12 md:py-16 lg:py-20'>
      {/* CHỨNG NHẬN Section */}
      <div className='space-y-8 md:space-y-10'>
        {/* Heading */}
        <ScrollAnimationWrapper className='relative w-fit'>
          <div className='relative w-fit'>
            <Heading
              level={2}
              className='!text-2xl md:!text-3xl font-semibold tracking-wide uppercase relative'
              weight='bold'
              color='#215778'
            >
              CHỨNG NHẬN
            </Heading>
            <span
              className='absolute bottom-0 left-0 h-0.5 bg-[#215778] block w-full animate-underline'
              style={{ width: '0%' }}
            />
          </div>
        </ScrollAnimationWrapper>

        {/* Grid Layout - 2 rows x 3 columns */}
        {witnessItems.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6'>
            {witnessItems.map((item, index) => (
              <ScrollAnimationWrapper
                key={item.id}
                className='relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200'
                animationClass='animate-fade-in-up-delayed'
                delay={index * 100}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt || `Certificate ${index + 1}`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  priority={index === 0}
                />
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
              {t('updatingCertificate')}
            </Text>
          </div>
        )}
      </div>

      {/* GIẢI THƯỞNG Section */}
      <div className='space-y-8 md:space-y-10 mt-16 md:mt-20 lg:mt-24'>
        {/* Heading */}
        <ScrollAnimationWrapper className='relative w-fit'>
          <div className='relative w-fit'>
            <Heading
              level={2}
              className='!text-2xl md:!text-3xl font-semibold tracking-wide uppercase relative'
              weight='bold'
              color='#215778'
            >
              GIẢI THƯỞNG
            </Heading>
            <span
              className='absolute bottom-0 left-0 h-0.5 bg-[#215778] block w-full animate-underline'
              style={{ width: '0%' }}
            />
          </div>
        </ScrollAnimationWrapper>

        {/* Slider Layout */}
        {awardItems.length > 0 ? (
          <ScrollAnimationWrapper delay={200}>
            <div className='relative overflow-hidden'>
              <SliderV2
                slidesPerView={1.5}
                spaceBetween={20}
                loop={awardItems.length > 3}
                navigation={true}
                customNavigation={awardItems.length > 3}
                centeredSlides={true}
                grabCursor={true}
                allowTouchMove={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                }}
              >
                {awardItems.map((item, index) => (
                  <div
                    key={item.id}
                    className='relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200'
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.alt || `Award ${index + 1}`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      priority={index < 3}
                    />
                  </div>
                ))}
              </SliderV2>
            </div>
          </ScrollAnimationWrapper>
        ) : (
          <div className='rounded-2xl border border-dashed border-[#C9DCEB] bg-[#F8FBFE] p-6 text-center'>
            <Heading
              level={5}
              className='!text-base text-[#215778] mb-2'
              weight='semibold'
            >
              {t('updating')}
            </Heading>
            <Text className='text-sm text-[#4B5053]'>{t('updatingAward')}</Text>
          </div>
        )}
      </div>
    </Container>
  );
}
