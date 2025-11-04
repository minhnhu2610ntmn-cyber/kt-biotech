import BrandFilters from '@/app/components/containers/BrandFilters';
import { CategoryHeader } from '@/app/components/containers/CategoryHeader';
import {
  ChevronRightIcon,
  Container,
  MenuIcon,
  SidebarMenu,
} from '@ktbiotech/system-design';
import type { ReactNode } from 'react';
import { StrapiApi } from '../../config/api';

type CategoryGridProps = {
  left?: ReactNode;
  right?: ReactNode;
};

function CategoryGrid({ left, right }: CategoryGridProps) {
  return (
    <div className=' min-h-[calc(100vh-100px)] grid grid-cols-1 gap-6 md:grid-cols-[266px_1fr]'>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

interface PageCategory {
  id: number;
  name: string;
  slug: string;
}

async function getProductCategories(): Promise<PageCategory[]> {
  const api = new StrapiApi();
  try {
    const categories = await api.getCategories('product');
    const list = Array.isArray(categories) ? (categories as any[]) : [];
    return list.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug }));
  } catch {
    return [];
  }
}

function FiltersPanel({
  brands,
}: {
  brands: Array<{ id: number; name: string }>;
}) {
  return <BrandFilters brands={brands} />;
}

function FilterHeader() {
  return (
    <div className='mt-4 w-full rounded-lg bg-[#86BDDF] text-[#1B1C1D] px-4 py-3 flex items-center justify-between'>
      <div className='flex w-full items-center gap-3'>
        <MenuIcon width={18} height={18} className='text-[#1B1C1D]' />
        <span className='text-sm font-medium'>Bộ lọc</span>
      </div>
      <ChevronRightIcon width={16} height={16} className='text-[#1B1C1D]' />
    </div>
  );
}

export default async function CategoryListingPage({
  params,
}: {
  params: { 'cate-slug': string };
}) {
  const api = new StrapiApi();
  const [categories, brands] = await Promise.all([
    getProductCategories(),
    api.getBrands(),
  ]);
  const active = params['cate-slug'];
  return (
    <Container className='space-y-4 mt-6 px-4'>
      <CategoryHeader title='DANH SÁCH SẢN PHẨM' />
      <CategoryGrid
        left={
          <div>
            <SidebarMenu
              activeItem={active}
              productCategories={categories as unknown as any}
              className='w-full [&_.space-y-1>*:first-child]:hidden'
            />
            <FilterHeader />
            <FiltersPanel brands={brands} />
          </div>
        }
        right={<div />}
      />
    </Container>
  );
}
