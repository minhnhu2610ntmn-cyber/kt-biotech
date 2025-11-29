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

async function getProductCategories(locale: string): Promise<PageCategory[]> {
  try {
    const categories = await getProductCategoriesCached(locale);
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

export default async function ProductCategoriesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  const t = await getTranslations('category');
  const categories = await getProductCategories(locale);

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
            const imageUrl = category.image?.url
              ? buildImageUrl(category.image.url)
              : '';
            const categoryHref =
              locale === 'vi'
                ? `/danh-muc-san-pham/${category.slug}`
                : `/${locale}/danh-muc-san-pham/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={categoryHref}
                className='group block animate-fade-in-up lg:block'
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                {/* Mobile Card Design - Horizontal Layout */}
                <article className='lg:hidden flex gap-3 cursor-pointer group rounded-lg overflow-hidden'>
                  {/* Image - Left (Square, Max 100px) */}
                  <div className='flex-shrink-0 max-w-[100px] w-[100px] aspect-square relative'>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={category.name}
                        width={100}
                        height={100}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    ) : (
                      <div className='w-full h-full aspect-square bg-gray-300 rounded-lg flex items-center justify-center'>
                        <Text
                          variant='caption'
                          color='muted'
                          className='text-xs'
                        >
                          Image
                        </Text>
                      </div>
                    )}
                  </div>

                  {/* Content - Right (2/3) */}
                  <div className='flex-1 flex flex-col py-1'>
                    {/* Title */}
                    <Heading
                      level={4}
                      color='#1B1C1D'
                      className='!text-base !font-[700] mb-2 line-clamp-2 capitalize'
                    >
                      {category.name}
                    </Heading>

                    {/* Description - Truncated */}
                    <Text
                      variant='caption'
                      color='#7C8388'
                      className='text-xs mb-2 line-clamp-2'
                    >
                      {category.description || 'description'}
                    </Text>
                  </div>
                </article>

                {/* Desktop Card - Original Design */}
                <div className='hidden lg:block'>
                  <div className='rounded-xl overflow-hidden bg-gray-100 border border-gray-200'>
                    <div className='relative w-full h-[220px]'>
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
