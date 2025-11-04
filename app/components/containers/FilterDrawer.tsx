'use client';

import { Button, DownloadIcon, Input, MenuIcon, SidebarMenu } from '@ktbiotech/system-design';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import BrandFilters from './BrandFilters';

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  activeCategory: string;
  brands: Array<{ id: number; name: string }>;
};

export default function FilterDrawer({
  isOpen,
  onClose,
  categories,
  activeCategory,
  brands,
}: FilterDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = 'q';
  const initial = useMemo(() => searchParams.get(searchKey) || '', [searchParams]);
  const [value, setValue] = useState(initial);

  useEffect(() => setValue(initial), [initial]);

  useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value.trim()) {
        params.set(searchKey, value.trim());
      } else {
        params.delete(searchKey);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(handle);
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 z-[9998] lg:hidden'
        onClick={onClose}
        aria-hidden='true'
      />
      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-[266px] bg-white z-[9999] shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='h-full overflow-y-auto'>
          <div className='p-4 border-b flex items-center justify-between'>
            <span className='font-semibold text-[#1B1C1D]'>Bộ lọc</span>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded'
              aria-label='Đóng'
            >
              <MenuIcon width={20} height={20} className='rotate-90' />
            </button>
          </div>
          {/* Search + Download */}
          <div className='p-4 pt-3 space-y-3 border-b'>
            <div className='relative'>
              <Input
                placeholder='Search here...'
                aria-label='Tìm kiếm sản phẩm'
                className='h-10 pl-3 pr-12 rounded-full border border-gray-200'
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              <span className='pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 h-5 w-px bg-gray-200' />
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
                {/* search icon simplified */}
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                  <path d='M21 21l-4.3-4.3' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  <circle cx='10' cy='10' r='7' stroke='currentColor' strokeWidth='2' />
                </svg>
              </span>
            </div>
            <Button variant='outline' className='w-full rounded-full h-10 flex items-center justify-center gap-2'>
              <DownloadIcon width={18} height={18} />
              <span>Download Catalogue</span>
            </Button>
          </div>
          <div className='p-4 space-y-4'>
            <SidebarMenu
              activeItem={activeCategory}
              productCategories={categories}
              className='w-full [&_.space-y-1>*:first-child]:hidden'
              hrefPrefix='/danh-muc-san-pham'
            />
            <div className='rounded-lg bg-[#86BDDF] text-[#1B1C1D] px-4 py-3 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <MenuIcon width={18} height={18} className='text-[#1B1C1D]' />
                <span className='text-sm font-medium'>Bộ lọc</span>
              </div>
            </div>
            <BrandFilters brands={brands} />
          </div>
        </div>
      </div>
    </>
  );
}

