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
};

export default function CategoryLayout({
  categories,
  categoriesTree = [],
  activeCategory,
  brands,
  products,
  catalogue = null,
  pagination,
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
