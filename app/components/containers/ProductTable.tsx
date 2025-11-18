'use client';

import { Text } from '@ktbiotech/system-design';
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

      {/* Mobile Card View (< 768px) */}
      <div
        className={`md:hidden rounded-lg overflow-hidden border border-[#E3EEF5] ${className}`}
      >
        {/* Tab Header */}
        <div className='grid grid-cols-[150px_1fr] bg-[#D9EDF7]'>
          <div
            className={` px-6 py-3 text-sm font-medium transition-colors rounded-none  text-[#1B1C1D]`}
          >
            {t('image')}
          </div>
          <div
            className={` text-center  py-3 text-sm font-medium text-[#1B1C1D] transition-colors rounded-none `}
          >
            {t('product')}
          </div>
        </div>

        {/* Content */}
        <div className='bg-white divide-y divide-[#EAF3F8]'>
          {products.map(p => {
            if (!p.slug) return null;
            const productHref = `/san-pham/${p.slug}`;

            return (
              <Link
                key={p.id}
                href={productHref}
                className='p-4 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer'
              >
                {/* Image - Large square on left */}
                <div className='flex-shrink-0'>
                  {p.imageUrl ? (
                    <div className='relative w-[150px] h-[150px] rounded-md overflow-hidden bg-gray-100'>
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                  ) : (
                    <div className='w-[150px] h-[150px] rounded-md bg-gray-200' />
                  )}
                </div>

                {/* Content - Right side */}
                <div className='flex-1 min-w-0'>
                  <Text
                    className='font-bold text-[#1B1C1D]'
                    weight='bold'
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {p.name}
                  </Text>
                  <Text
                    color='#636A6E'
                    className='text-sm mt-1'
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {p.description}
                  </Text>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

const ProductTable = memo(ProductTableBase);
export default ProductTable;
