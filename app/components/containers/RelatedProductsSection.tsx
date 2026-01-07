'use client';

import { Heading, SliderV2, Text } from '@ktbiotech/system-design';
import { take } from 'lodash';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../utils/link';

export interface RelatedProductItem {
  slug: string;
  title: string;
  description?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  isNew?: boolean;
}

interface RelatedProductsSectionProps {
  heading?: string;
  products: RelatedProductItem[];
  showPagination?: boolean;
}

export default function RelatedProductsSection({
  heading,
  products,
}: RelatedProductsSectionProps) {
  const t = useTranslations('product');
  const defaultHeading = heading || t('relatedProducts');
  // Use SliderV2 like homepage sections; no external ref needed

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className='space-y-6 pb-5'>
      <Heading
        level={2}
        color='#215778'
        className='!text-2xl !font-bold text-[#215778] !uppercase tracking-wide underline decoration-[#2C3E50] decoration-1 underline-offset-4'
        transform='uppercase'
      >
        {defaultHeading}
      </Heading>

      {/* Mobile only (< 640px): Vertical list with horizontal cards */}
      <div className='sm:hidden space-y-4'>
        {take(products, 4).map(product => (
          <Link
            key={product.slug}
            href={`/san-pham/${product.slug}`}
            className='flex flex-row rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#215778]/40 overflow-hidden'
          >
            <div className='relative w-32 h-32 flex-shrink-0 bg-[#D8DEE4]'>
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes='128px'
                  className='object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center text-xs text-gray-400'>
                  {t('noImage')}
                </div>
              )}
              {product.isNew && (
                <span className='absolute right-2 top-2 rounded-full bg-[#86BDDF] px-2 py-0.5 text-xs font-semibold text-white'>
                  {t('new')}
                </span>
              )}
            </div>
            <div className='flex flex-col justify-center space-y-1 px-4 py-3 flex-1'>
              <Heading
                level={3}
                className='!text-base !font-bold text-[#1B1C1D] line-clamp-3 !leading-tight'
              >
                {product.title}
              </Heading>
              {product.description && (
                <Text className='text-xs text-gray-600 line-clamp-3'>
                  {product.description}
                </Text>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Tablet (>= 640px, < 1024px): SliderV2 */}
      <div className='hidden sm:block lg:hidden relative related-products-slider'>
        <SliderV2
          className='w-full'
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          navigation={true}
          customNavigation={products.length > 2}
          navigationPosition='inside'
          navigationStyle='modern'
          grabCursor={true}
          allowTouchMove={true}
        >
          {[...products].map(product => (
            <Link
              key={product.slug}
              href={`/san-pham/${product.slug}`}
              className='flex flex-col h-full rounded-3xl border border-[#E3EEF5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#215778]/40'
            >
              <div className='relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-t-3xl bg-[#D8DEE4]'>
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes='(max-width: 768px) 50vw, 33vw'
                    className='object-cover'
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center text-sm text-gray-400'>
                    {t('noImage')}
                  </div>
                )}
                {product.isNew && (
                  <span className='absolute right-4 top-4 rounded-full bg-[#86BDDF] px-3 py-1 text-xs font-semibold text-white'>
                    {t('new')}
                  </span>
                )}
              </div>
              <div className='px-5 pb-6 pt-4 flex-1 flex flex-col justify-end'>
                <div className='space-y-2'>
                  {product.category && (
                    <Text className='text-sm uppercase text-[#215778]/70'>
                      {product.category}
                    </Text>
                  )}
                  <Heading
                    level={3}
                    className='!text-xl !font-bold text-[#1B1C1D]'
                  >
                    {product.title}
                  </Heading>
                  {product.description && (
                    <Text className='text-sm text-gray-600 line-clamp-2'>
                      {product.description}
                    </Text>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </SliderV2>
      </div>

      {/* Desktop (>= 1024px): Grid layout */}
      <div className='hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {take(products, 4).map(product => (
          <Link
            key={product.slug}
            href={`/san-pham/${product.slug}`}
            className='flex flex-col h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#215778]/40'
          >
            <div className='relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#D8DEE4] flex-shrink-0'>
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes='(max-width: 640px) 100vw, 33vw'
                  className='object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center text-sm text-gray-400'>
                  {t('noImage')}
                </div>
              )}
              {product.isNew && (
                <span className='absolute right-4 top-4 rounded-full bg-[#86BDDF] px-3 py-1 text-xs font-semibold text-white'>
                  {t('new')}
                </span>
              )}
            </div>
            <div className='flex flex-col flex-1 mt-3'>
              {product.category && (
                <Text className='text-sm uppercase text-[#215778]/70 mb-2'>
                  {product.category}
                </Text>
              )}
              <Heading
                level={3}
                className='!text-xl !font-bold text-[#1B1C1D] mb-2'
              >
                {product.title}
              </Heading>
              {product.description && (
                <Text className='text-sm text-gray-600 line-clamp-3 mt-auto'>
                  {product.description}
                </Text>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
