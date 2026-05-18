import { getTranslations } from 'next-intl/server';
import { AboutSection } from '../../components/containers';
import SetBreadcrumb from '../../components/containers/SetBreadcrumb';
import { buildImageUrl, StrapiApi } from '../../config/api';

// Disable static generation - fetch data at request time
export const dynamic = 'force-dynamic';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const api = new StrapiApi(locale);
  const tb = await getTranslations('breadcrumb');

  // Fetch data from global single type
  const global = await api.getGlobal();

  // Global data is already an array directly
  const itemsArray = Array.isArray(global) ? global : [];

  // Build items from global data
  const items: Array<{
    title: string;
    description: string;
    link: string;
    imageUrl?: string;
  }> =
    itemsArray
      .sort((a: any, b: any) => {
        const orderA = a.order ?? a.Order ?? 0;
        const orderB = b.order ?? b.Order ?? 0;
        return orderA - orderB;
      })
      .map((item: any) => {
        // Handle image - it's an array with image objects
        const imageData = item.image?.[0];
        const imagePath = imageData?.url;
        const imageUrl = imagePath ? buildImageUrl(imagePath) : undefined;

        return {
          title: item.title || '',
          description: item.description || '',
          link: item.link || '',
          imageUrl,
        };
      }) || [];

  // Build breadcrumb items from translation
  const pageTitle = tb('gioithieuchung');
  const baseHref = locale === 'vi' ? '' : `/${locale}`;
  const breadcrumbItems = [
    { label: tb('home'), href: baseHref || '/' },
    { label: tb('gioithieu'), href: `${baseHref}/gioi-thieu` },
  ];

  return (
    <>
      <SetBreadcrumb items={breadcrumbItems} />
      <AboutSection items={items} title={pageTitle} />
    </>
  );
}
