import { BlogContentBody, BlogHero, type StrapiBlock } from '@ktbiotech/blog';
import { Container } from '@ktbiotech/system-design';
import AnimatedPageContent from '../../../components/containers/AnimatedPageContent';
import SetBreadcrumb from '../../../components/containers/SetBreadcrumb';
import { buildImageUrl, StrapiApi } from '../../../config/api';
import { getTranslations } from 'next-intl/server';

// Disable static generation - fetch data at request time
export const dynamic = 'force-dynamic';

export default async function CompanyPage() {
  let company: any = null;
  try {
    const api = new StrapiApi();
    company = await api.getAbout();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching company data:', error);
    // Continue with null company - will render empty content
  }

  const blocks: StrapiBlock[] = ((company?.content as any[]) || [])
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

  const heroUrl = company?.image?.url
    ? buildImageUrl(company.image.url)
    : 'https://picsum.photos/1200/600?random=3';
  const title = company?.title || 'Về chúng tôi';

  // Build breadcrumb items from API data
  const t = await getTranslations('breadcrumb');
  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('gioithieu'), href: '/gioi-thieu' },
    { label: title, href: '/gioi-thieu/ve-chung-toi' },
  ];

  return (
    <>
      <SetBreadcrumb items={breadcrumbItems} />
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
    </>
  );
}
