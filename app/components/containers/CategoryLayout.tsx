'use client';

import { SidebarMenu } from '@ktbiotech/system-design';
import { useState } from 'react';
import BrandFilters from './BrandFilters';
import { CategoryHeader } from './CategoryHeader';
import FilterDrawer from './FilterDrawer';
import PaginationControls from './PaginationControls';
import ProductTable, { type ProductRow } from './ProductTable';

type CategoryLayoutProps = {
  categories: any[];
  activeCategory: string;
  brands: Array<{ id: number; name: string }>;
  products: ProductRow[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
};

export default function CategoryLayout({
  categories,
  activeCategory,
  brands,
  products,
  pagination,
}: CategoryLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            className='w-full [&_.space-y-1>*:first-child]:hidden'
            hrefPrefix='/danh-muc-san-pham'
          />
          <div className='mt-4 w-full rounded-lg bg-[#86BDDF] text-[#1B1C1D] px-4 py-3 flex items-center justify-between'>
            <div className='flex w-full items-center gap-3'>
              <FilterIcon className='text-[#1B1C1D]' />
              <span className='text-sm font-medium'>Bộ lọc</span>
            </div>
          </div>
          <BrandFilters brands={brands} />
        </div>

        {/* Right Content */}
        <div>
          <CategoryHeader
            title='DANH SÁCH SẢN PHẨM'
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
        activeCategory={activeCategory}
        brands={brands}
      />
    </>
  );
}
