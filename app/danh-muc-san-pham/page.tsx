// Server Component: fetch product categories from Strapi

import { Container, Heading, Text } from '@ktbiotech/system-design';
import { getTranslations } from 'next-intl/server';
import { getProductCategoriesCached } from '../config/api';
import CategoryCard from './components/CategoryCard';

interface PageCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image?: { url?: string } | null;
}

async function getProductCategories(): Promise<PageCategory[]> {
  try {
    // This is the non-locale route, always use Vietnamese
    const categories = await getProductCategoriesCached('vi');
    const list = Array.isArray(categories) ? (categories as any[]) : [];
    return list
      .filter(c => c.parentId == null)
      .map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        color: c.color,
        image: c.image || null,
      }));
  } catch {
    return [];
  }
}

export default async function ProductCategoriesPage() {
  const t = await getTranslations('category');
  const categories = await getProductCategories();

  return (
    <Container>
      <div className='pt-6 pb-10 px-4'>
        <Heading
          level={2}
          className='!text-xl md:!text-2xl mb-6'
          color='#215778'
          weight='semibold'
          decoration='underline'
        >
          {t('title')}
        </Heading>

        <div className='space-y-3 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0'>
          {categories.map((category, index) => {
            // This is the non-locale route (Vietnamese), so no locale prefix needed
            const categoryHref = `/danh-muc-san-pham/${category.slug}`;

            return (
              <CategoryCard
                key={category.id}
                category={category}
                categoryHref={categoryHref}
                index={index}
              />
            );
          })}

          {categories.length === 0 && (
            <div className='col-span-full'>
              <Text className='text-gray-600'>{t('noCategories')}</Text>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}