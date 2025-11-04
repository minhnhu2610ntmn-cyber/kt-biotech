import BrandFilters from '@/app/components/containers/BrandFilters';
import { CategoryHeader } from '@/app/components/containers/CategoryHeader';
import PaginationControls from '@/app/components/containers/PaginationControls';
import ProductTable from '@/app/components/containers/ProductTable';
import {
  ChevronRightIcon,
  Container,
  MenuIcon,
  SidebarMenu,
} from '@ktbiotech/system-design';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { StrapiApi, buildImageUrl } from '../../config/api';

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

// ProductTable moved to containers/ProductTable

export default async function CategoryListingPage({
  params,
  searchParams,
}: {
  params: { 'cate-slug': string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const api = new StrapiApi();
  const [categories, brands] = await Promise.all([
    getProductCategories(),
    api.getBrands(),
  ]);
  const active = params['cate-slug'];

  const q = (searchParams?.q as string) || '';
  const brandIds = (searchParams?.brands as string) || '';
  const page = Number(searchParams?.page || 1);
  const pageSize = Number(searchParams?.pageSize || 20);

  const productsRes = await api.getProducts({
    q,
    brandIds,
    categorySlug: active,
    page,
    pageSize,
  });
  const productRows = (productsRes.data as any[]).map(p => {
    const images = p.images || p.attributes?.images || {};
    const firstUrl = Array.isArray(images)
      ? images[0]?.url
      : images?.data?.[0]?.attributes?.url;
    const imageUrl = firstUrl ? buildImageUrl(firstUrl) : undefined;
    return {
      id: p.id,
      name: p.title,
      description: p.description || '',
      sku: p.sku || '-',
      spec: p.specification || '-',
      imageUrl,
    };
  });
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
              hrefPrefix='/danh-muc-san-pham'
            />
            <FilterHeader />
            <FiltersPanel brands={brands} />
          </div>
        }
        right={
          <div>
            <ProductTable products={productRows} />
            <PaginationControls
              total={(productsRes.meta?.pagination?.total as number) || 0}
              page={(productsRes.meta?.pagination?.page as number) || page}
              pageSize={
                (productsRes.meta?.pagination?.pageSize as number) || pageSize
              }
            />
          </div>
        }
      />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { 'cate-slug': string };
}): Promise<Metadata> {
  const api = new StrapiApi();
  const category = await api.getCategoryBySlug(params['cate-slug']);
  if (!category) {
    return {
      title: 'Danh mục sản phẩm',
    };
  }
  const title = category.name || 'Danh mục sản phẩm';
  const description = (category as any).description || 'Sản phẩm của KTBioTech';
  const base =
    process.env.NEXT_PUBLIC_PRODUCTS_BASE_URL ||
    process.env.PRODUCTS_BASE_URL ||
    'https://ktbiotech.com/danh-muc-san-pham';
  const url = `${base}/${params['cate-slug']}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  };
}
