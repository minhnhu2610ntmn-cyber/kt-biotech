'use client';

import {
  ChevronRightIcon,
  Heading,
  Link as SystemLink,
  Text,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../utils/link';
import { memo } from 'react';

export type ProductRow = {
  id: number;
  name: string;
  description: string;
  sku: string;
  spec: string;
  imageUrl?: string;
  slug: string;
};

interface ProductTableProps {
  products: ProductRow[];
  className?: string;
}

function ProductTableBase({ products, className = '' }: ProductTableProps) {
  const t = useTranslations('common');
  const truncate = (text: string, max = 20) =>
    (text || '').length > max ? `${text.slice(0, max)}…` : text || '';

  if (!products || products.length === 0) {
    return (
      <div
        className={`rounded-lg border border-[#E3EEF5] bg-[#F7FBFD] h-[400px] flex items-center justify-center ${className}`}
      >
        <div className='text-center space-y-2'>
          <div className='mx-auto w-16 h-16 rounded-full bg-[#E3EEF5] flex items-center justify-center text-[#215778]'>
            {/* simple box icon */}
            <svg
              width='26'
              height='26'
              viewBox='0 0 24 24'
              fill='none'
              aria-hidden='true'
            >
              <rect
                x='3'
                y='7'
                width='18'
                height='12'
                rx='2'
                stroke='currentColor'
                strokeWidth='2'
              />
              <path d='M3 11h18' stroke='currentColor' strokeWidth='2' />
              <path d='M7 3h10v4H7z' stroke='currentColor' strokeWidth='2' />
            </svg>
          </div>
          <Text className='text-[#1B1C1D] font-medium px-4'>
            {t('noProducts')}
          </Text>
          <Text className='text-gray-500 text-sm'>{t('adjustFilters')}</Text>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div
        className={`hidden md:block rounded-lg overflow-hidden border border-[#E3EEF5] ${className}`}
      >
        <div className='bg-[#D9EDF7] text-[#1B1C1D] font-medium px-4 py-3 grid grid-cols-[120px_1fr_140px_160px]'>
          <span>{t('image')}</span>
          <span>{t('product')}</span>
          <span>{t('sku')}</span>
          <span>{t('specification')}</span>
        </div>
        <div className='divide-y divide-[#EAF3F8]'>
          {products.map(p => {
            if (!p.slug) return null;
            const productHref = `/san-pham/${p.slug}`;

            return (
              <Link
                key={p.id}
                href={productHref}
                className='px-4 py-4 grid grid-cols-[120px_1fr_140px_160px] items-start hover:bg-gray-50 transition-colors cursor-pointer'
              >
                {p.imageUrl ? (
                  <div className='relative w-16 h-16 rounded-md overflow-hidden bg-gray-100'>
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                ) : (
                  <div className='w-16 h-16 rounded-md bg-gray-200' />
                )}
                <div>
                  <Text className='font-bold text-[#1B1C1D]' weight='bold'>
                    {p.name}
                  </Text>
                  <Text
                    color='#636A6E'
                    className='text-sm pr-4 mt-1'
                    lineClamp={2}
                  >
                    {p.description}
                  </Text>
                </div>
                <div className='font-semibold'>{p.sku}</div>
                <div className='truncate font-semibold' title={p.spec}>
                  {truncate(p.spec, 20)}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Card View (< 768px) - Horizontal Layout */}
      <div
        className={`md:hidden space-y-3 ${className}`}
      >
        {products.map(p => {
          if (!p.slug) return null;
          const productHref = `/san-pham/${p.slug}`;

          return (
            <article
              key={p.id}
              className='flex gap-3 cursor-pointer group rounded-lg overflow-hidden border border-[#E3EEF5] bg-white hover:bg-gray-50 transition-colors'
              onClick={() => {
                window.location.href = productHref;
              }}
            >
              {/* Image - Left (1/3) */}
              <div className='flex-shrink-0 w-1/3 relative'>
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    width={120}
                    height={120}
                    className='w-full h-full object-cover rounded-lg'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-300 rounded-lg flex items-center justify-center'>
                    <Text variant='caption' color='muted' className='text-xs'>
                      Image
                    </Text>
                  </div>
                )}
              </div>

              {/* Content - Right (2/3) */}
              <div className='flex-1 flex flex-col justify-between py-1'>
                {/* Title */}
                <Heading
                  level={4}
                  color='#1B1C1D'
                  className='!text-base !font-[700] mb-2 line-clamp-2'
                >
                  {p.name}
                </Heading>

                {/* Description - Truncated */}
                <Text
                  variant='caption'
                  color='#7C8388'
                  className='text-xs mb-2 line-clamp-2'
                >
                  {p.description}
                </Text>

                {/* View All Link */}
                <SystemLink
                  href={productHref}
                  className='inline-flex items-center gap-1 !text-[#3691C9] hover:!text-[#3691C9] font-medium text-xs !underline-none !no-underline whitespace-nowrap'
                >
                  <div className='flex items-center gap-1'>
                    <span>{t('viewAll')}</span>
                    <ChevronRightIcon
                      fill='#3691C9'
                      className='w-3 h-3 flex-shrink-0'
                    />
                  </div>
                </SystemLink>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

const ProductTable = memo(ProductTableBase);
export default ProductTable;
