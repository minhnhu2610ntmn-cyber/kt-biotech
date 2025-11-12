'use client';

import { Heading, SliderV2, Text } from '@ktbiotech/system-design';
import Image from 'next/image';
import Link from 'next/link';

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
  heading = 'Sản phẩm liên quan',
  products,
}: RelatedProductsSectionProps) {
  // Use SliderV2 like homepage sections; no external ref needed

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className='space-y-6'>
      <Heading
        level={2}
        color='#215778'
        className='!text-2xl !font-bold text-[#215778] !uppercase tracking-wide'
        transform='uppercase'
      >
        {heading}
      </Heading>
      <div className='relative'>
        <SliderV2
          className='w-full'
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          navigation={true}
          customNavigation={products.length > 4}
          navigationPosition='inside'
          navigationStyle='modern'
          grabCursor={true}
          allowTouchMove={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {[...products].map(product => (
            <div key={product.slug} className='h-full'>
              <Link
                href={`/san-pham/${product.slug}`}
                className='block h-full rounded-3xl border border-[#E3EEF5] bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#215778]/40'
              >
                <div className='relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-[#D8DEE4]'>
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes='(max-width: 640px) 100vw, 50vw'
                      className='object-cover'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center text-sm text-gray-400'>
                      Không có hình ảnh
                    </div>
                  )}
                  {product.isNew && (
                    <span className='absolute right-4 top-4 rounded-full bg-[#86BDDF] px-3 py-1 text-xs font-semibold text-white'>
                      New
                    </span>
                  )}
                </div>
                <div className='space-y-2 px-5 pb-6 pt-4'>
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
              </Link>
            </div>
          ))}
        </SliderV2>
      </div>
    </section>
  );
}
