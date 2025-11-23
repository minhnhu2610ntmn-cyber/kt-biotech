import { BlogContentBody, BlogHero, type StrapiBlock } from '@ktbiotech/blog';
import { Container } from '@ktbiotech/system-design';
import { getTranslations } from 'next-intl/server';
import AnimatedPageContent from '../../../components/containers/AnimatedPageContent';
import SetBreadcrumb from '../../../components/containers/SetBreadcrumb';
import { buildImageUrl, StrapiApi } from '../../../config/api';

export default async function GenomeSequencingServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const api = new StrapiApi(locale);
  const genService = await api.getGenServices();
  const tNavbar = await getTranslations('navbar');
  const tBreadcrumb = await getTranslations('breadcrumb');

  const blocks: StrapiBlock[] = ((genService?.content as any[]) || [])
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

  const heroUrl = genService?.image?.url
    ? buildImageUrl(genService.image.url)
    : 'https://picsum.photos/1200/600?random=8';
  const title = genService?.title || tNavbar('serviceSequencing');

  // Build breadcrumb items
  const baseHref = locale === 'vi' ? '' : `/${locale}`;
  const breadcrumbItems = [
    { label: tBreadcrumb('home'), href: baseHref || '/' },
    { label: tBreadcrumb('dichvu'), href: `${baseHref}/dich-vu` },
    {
      label: title || tBreadcrumb('giaitrinhtugen'),
      href: `${baseHref}/dich-vu/giai-trinh-tu-gen`,
    },
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
