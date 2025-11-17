import { BlogContentBody, BlogHero, type StrapiBlock } from '@ktbiotech/blog';
import { Container } from '@ktbiotech/system-design';
import AnimatedPageContent from '../../../components/containers/AnimatedPageContent';
import { buildImageUrl, StrapiApi } from '../../../config/api';

export default async function ResearchServicePage() {
  const api = new StrapiApi();
  const researchService = await api.getResearchService();

  const blocks: StrapiBlock[] = ((researchService?.content as any[]) || [])
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
        case 'shared.slider':
          return {
            __component: 'shared.slider',
            id: block.id,
            slides: block.slides || [],
          } as StrapiBlock;
        default:
          return null;
      }
    })
    .filter(Boolean) as StrapiBlock[];

  const title = researchService?.title || 'Nghiên cứu khoa học';
  const heroUrl = researchService?.image?.url
    ? buildImageUrl(researchService.image.url)
    : 'https://picsum.photos/1200/600?random=9';

  return (
    <Container>
      <div className='!pt-10'>
        <AnimatedPageContent>
          <BlogHero title={title} imageUrl={heroUrl} imageAlt={title} />
        </AnimatedPageContent>
        <AnimatedPageContent delay={200}>
          <div className='max-w-4xl mx-auto px-2 lg:px-0 py-8'>
            {blocks?.length > 0 && <BlogContentBody blocks={blocks} />}
          </div>
        </AnimatedPageContent>
      </div>
    </Container>
  );
}


