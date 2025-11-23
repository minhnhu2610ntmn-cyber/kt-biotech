import { BlogContentBody, BlogHero, type StrapiBlock } from '@ktbiotech/blog';
import { Container } from '@ktbiotech/system-design';
import AnimatedPageContent from '../../../components/containers/AnimatedPageContent';
import { buildImageUrl, StrapiApi } from '../../../config/api';

export default async function RelationshipPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  const api = new StrapiApi(locale);
  const relationship = await api.getRelationship();

  const relationshipData = relationship?.attributes || relationship || null;
  const blocks: StrapiBlock[] = ((relationshipData?.content as any[]) || [])
    .map((block: any) => {
      switch (block.__component) {
        case 'shared.rich-text':
          return {
            __component: 'shared.rich-text',
            id: block.id,
            body: block.body,
          } as StrapiBlock;
        case 'shared.quote':
          return {
            __component: 'shared.quote',
            id: block.id,
            title: block.title || '',
            body: block.body || '',
          } as StrapiBlock;
        case 'shared.media':
          return {
            __component: 'shared.media',
            id: block.id,
            file: block.file,
          } as StrapiBlock;
        case 'shared.slider': {
          // Normalize slides data from Strapi format
          const rawFiles =
            block.files?.data ||
            block.files ||
            block.slides?.data ||
            block.slides ||
            [];
          const normalizedSlides = Array.isArray(rawFiles)
            ? rawFiles.map((file: any) => {
                const fileData = file.attributes || file;
                const imageData =
                  fileData?.image?.data?.attributes ||
                  fileData?.image?.data ||
                  fileData?.image?.attributes ||
                  fileData?.image ||
                  fileData;
                return {
                  url: imageData?.url || fileData?.url,
                  caption:
                    imageData?.alternativeText ||
                    fileData?.caption ||
                    fileData?.title,
                };
              })
            : [];
          return {
            __component: 'shared.slider',
            id: block.id,
            slides: normalizedSlides,
          } as StrapiBlock;
        }
        default:
          return null;
      }
    })
    .filter(Boolean) as StrapiBlock[];

  const heroUrl = relationshipData?.image?.url
    ? buildImageUrl(relationshipData.image.url)
    : 'https://picsum.photos/1200/600?random=3';
  const title = relationshipData?.title || 'Quan hệ hợp tác';

  return (
    <Container>
      <div className='!pt-10'>
        <AnimatedPageContent>
          <BlogHero title={title} imageUrl={heroUrl} imageAlt={title} />
        </AnimatedPageContent>
        <AnimatedPageContent delay={200}>
          <div className='max-w-5xl mx-auto px-2 lg:px-0 py-8'>
            {blocks?.length > 0 && <BlogContentBody blocks={blocks} />}
          </div>
        </AnimatedPageContent>
      </div>
    </Container>
  );
}
