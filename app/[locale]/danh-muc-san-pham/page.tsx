// Server Component: fetch product categories from Strapi

import { Container, Heading, Text } from '@ktbiotech/system-design';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { buildImageUrl, getProductCategoriesCached } from '../../config/api';
import { Link } from '../../utils/link';

interface PageCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image?: { url?: string } | null;
}

// Blur placeholder utils (LQIP)
const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f3f4f6" offset="20%" />
        <stop stop-color="#e5e7eb" offset="50%" />
        <stop stop-color="#f3f4f6" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f3f4f6" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

async function getProductCategories(): Promise<PageCategory[]> {
  try {
    const categories = await getProductCategoriesCached();
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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {categories.map((category, index) => {
            const imageUrl = category.image?.url
              ? buildImageUrl(category.image.url)
              : '';
            return (
              <Link
                key={category.id}
                href={`/danh-muc-san-pham/${category.slug}`}
                className='group block animate-fade-in-up'
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className='rounded-xl overflow-hidden bg-gray-100 border border-gray-200'>
                  <div className='relative w-full h-[300px] md:h-[220px]'>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={category.name}
                        fill
                        className='object-cover'
                        placeholder='blur'
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 400)
                        )}`}
                        sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                        fetchPriority={index < 3 ? 'high' : 'low'}
                      />
                    ) : (
                      <div className='w-full h-full bg-slate-100' />
                    )}
                  </div>
                </div>
                <div className='mt-3'>
                  <Text
                    className='!font-semibold !text-gray-900'
                    color='#1B1C1D'
                    weight='semibold'
                  >
                    {category.name}
                  </Text>
                  <Text className='!text-gray-600' color='#636A6E'>
                    {category.description || 'description'}
                  </Text>
                </div>
              </Link>
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
