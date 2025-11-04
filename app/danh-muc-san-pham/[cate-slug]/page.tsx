import CategoryLayout from '@/app/components/containers/CategoryLayout';
import { Container } from '@ktbiotech/system-design';
import type { Metadata } from 'next';
import { StrapiApi, buildImageUrl } from '../../config/api';

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
      <CategoryLayout
        categories={categories as unknown as any}
        activeCategory={active}
        brands={brands}
        products={productRows}
        pagination={{
          total: (productsRes.meta?.pagination?.total as number) || 0,
          page: (productsRes.meta?.pagination?.page as number) || page,
          pageSize:
            (productsRes.meta?.pagination?.pageSize as number) || pageSize,
        }}
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
