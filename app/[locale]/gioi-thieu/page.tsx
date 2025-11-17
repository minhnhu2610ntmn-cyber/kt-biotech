// eslint-disable-next-line no-restricted-imports
import { AboutSection } from '../../components/containers';
import SetBreadcrumb from '../../components/containers/SetBreadcrumb';
import { buildImageUrl, StrapiApi } from '../../config/api';
import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const api = new StrapiApi();
  const global = await api.getGlobal();

  // Map data from Strapi global to items format
  // Assuming global has a structure like { aboutItems: [...] }
  // Adjust the mapping based on your actual Strapi structure
  const items =
    global
      ?.sort((a: any, b: any) => {
        const orderA = a.order ?? a.Order ?? 0;
        const orderB = b.order ?? b.Order ?? 0;
        return orderA - orderB;
      })
      .map((item: any) => {
        const image = item.image?.[0];
        const imagePath = image?.url;
        const imageUrl = imagePath ? buildImageUrl(imagePath) : undefined;

        return {
          title: item.title || '',
          description: item.description || '',
          link: item.link || '',
          imageUrl,
        };
      }) || [];

  // Build breadcrumb items from translation
  const t = await getTranslations('breadcrumb');
  const breadcrumbItems = [
    { label: t('home'), href: '/' },
    { label: t('gioithieu'), href: '/gioi-thieu' },
  ];

  // Return empty items if global is null/not found
  return (
    <>
      <SetBreadcrumb items={breadcrumbItems} />
      <AboutSection items={items} />
    </>
  );
}
