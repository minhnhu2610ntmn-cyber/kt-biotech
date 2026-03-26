'use client';

import { SidebarMenu } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import BrandFilters from './BrandFilters';
import { CategoryHeader } from './CategoryHeader';
import FilterDrawer from './FilterDrawer';
import PaginationControls from './PaginationControls';
import ProductTable, { type ProductRow } from './ProductTable';
import SubcategoryFilters from './SubcategoryFilters';

type CategoryLayoutProps = {
  categories: any[];
  categoriesTree?: any[];
  activeCategory: string;
  brands: Array<{ id: number; name: string }>;
  products: ProductRow[];
  catalogue?: {
    id: number | string;
    title?: string;
    description?: string;
    downloadUrl?: string;
    fileName?: string;
  } | null;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
  isFallback?: boolean;
};

export default function CategoryLayout({
  categories,
  categoriesTree = [],
  activeCategory,
  brands,
  products,
  catalogue = null,
  pagination,
  isFallback = false,
}: CategoryLayoutProps) {
  const t = useTranslations('category');
  const tSidebar = useTranslations('sidebar');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const primaryCatalogue =
    catalogue && catalogue.downloadUrl ? catalogue : null;

  const handleDownloadCatalogue = useCallback(async () => {
    if (!primaryCatalogue?.downloadUrl) return;
    try {
      const response = await fetch(primaryCatalogue.downloadUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to download catalogue: ${response.status} ${response.statusText}`
        );
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = primaryCatalogue.fileName || 'catalogue.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Catalogue download failed', error);
    }
  }, [primaryCatalogue]);

  const FilterIcon = ({ className = '' }: { className?: string }) => (
    <svg
      width={18}
      height={18}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M3 5h18l-7 8v5l-4 2v-7L3 5z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <>
      <div className='min-h-[calc(100vh-100px)] grid grid-cols-1 gap-6 lg:grid-cols-[266px_1fr]'>
        {/* Left Sidebar - Hidden below 1080px */}
        <div className='hidden lg:block'>
          <SidebarMenu
            activeItem={activeCategory}
            productCategories={categories}
            categoryLabel={tSidebar('category')}
            className='w-full [&_.space-y-1>*:first-child]:hidden'
            hrefPrefix='/danh-muc-san-pham'
          />
          <div className='mt-4 w-full rounded-lg bg-[#86BDDF] text-[#1B1C1D] px-4 py-3 flex items-center justify-between'>
            <div className='flex w-full items-center gap-3'>
              <FilterIcon className='text-[#1B1C1D]' />
              <span className='text-sm font-medium'>{t('filter')}</span>
            </div>
          </div>
          <SubcategoryFilters
            categories={categoriesTree}
            activeCategory={activeCategory}
          />
          <BrandFilters brands={brands} />
        </div>

        {/* Right Content */}
        <div>
          <CategoryHeader
            title={t('productList')}
            downloadLabel={primaryCatalogue?.title || t('downloadCatalogue')}
            onDownloadClick={
              primaryCatalogue?.downloadUrl
                ? handleDownloadCatalogue
                : undefined
            }
            onOpenFilter={() => setIsDrawerOpen(true)}
          />
          {/* Fallback locale notice */}
          {isFallback && (
            <div className='mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3'>
              <svg
                className='w-5 h-5 text-amber-500 mt-0.5 shrink-0'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              <div>
                <p className='font-semibold text-amber-800 text-sm'>
                  {t('fallbackNotice')}
                </p>
              </div>
            </div>
          )}
          <ProductTable products={products} />
          <PaginationControls
            total={pagination.total}
            page={pagination.page}
            pageSize={pagination.pageSize}
          />
        </div>
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={categories}
        categoriesTree={categoriesTree}
        activeCategory={activeCategory}
        brands={brands}
      />
    </>
  );
}
