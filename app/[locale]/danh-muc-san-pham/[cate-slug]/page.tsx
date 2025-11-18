import { Container } from '@ktbiotech/system-design';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CategoryLayout from '../../../components/containers/CategoryLayout';
import SetBreadcrumb from '../../../components/containers/SetBreadcrumb';
import {
  StrapiApi,
  buildImageUrl,
  getProductCategoriesCached,
  type CatalogueEntry,
} from '../../../config/api';

interface PageCategory {
  id: number;
  name: string;
  slug: string;
}

type CatalogueItem = CatalogueEntry;

async function getProductCategories(locale: string): Promise<PageCategory[]> {
  try {
    const categories = await getProductCategoriesCached(locale);
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
  params: Promise<{ locale: string; 'cate-slug': string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale } = resolvedParams;
  const api = new StrapiApi(locale);
  const [categories, brands] = await Promise.all([
    getProductCategories(locale),
    api.getBrands(),
  ]);
  const active = resolvedParams['cate-slug'];

  const q = (resolvedSearchParams?.q as string) || '';
  const brandIds = (resolvedSearchParams?.brands as string) || '';
  const page = Number(resolvedSearchParams?.page || 1);
  const pageSize = Number(resolvedSearchParams?.pageSize || 20);

  const productsRes = await api.getProducts({
    q,
    brandIds,
    categorySlug: active,
    page,
    pageSize,
  });
  const catalogue: CatalogueItem | null = await api.getCatalogue();

  // Get category data for breadcrumb
  const category = await api.getCategoryBySlug(active);
  const categoryName = category?.name || active;

  const productRows = (productsRes.data as any[])
    .map(p => {
      const productData = p.attributes || p;
      const images = productData.images || p.images || {};
      const firstUrl = Array.isArray(images)
        ? images[0]?.url || images[0]?.attributes?.url
        : images?.data?.[0]?.attributes?.url;
      const imageUrl = firstUrl ? buildImageUrl(firstUrl) : undefined;
      const slug = productData.slug || p.slug;

      // Only include products with slug
      if (!slug) return null;

      return {
        id: p.id,
        name: productData.title || p.title,
        description: productData.description || p.description || '',
        sku: productData.sku || p.sku || '-',
        spec: productData.specification || p.specification || '-',
        imageUrl,
        slug,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const t = await getTranslations('breadcrumb');

  // Build breadcrumb items
  const baseHref = locale === 'vi' ? '' : `/${locale}`;
  const breadcrumbItems = [
    { label: t('home'), href: baseHref || '/' },
    { label: t('danhmucsanpham'), href: `${baseHref}/danh-muc-san-pham` },
    { label: categoryName, href: `${baseHref}/danh-muc-san-pham/${active}` },
  ];

  return (
    <>
      <SetBreadcrumb items={breadcrumbItems} />
      <Container className='space-y-4 mt-6 px-4'>
        <CategoryLayout
          categories={categories as unknown as any}
          activeCategory={active}
          brands={brands}
          products={productRows}
          catalogue={catalogue}
          pagination={{
            total: (productsRes.meta?.pagination?.total as number) || 0,
            page: (productsRes.meta?.pagination?.page as number) || page,
            pageSize:
              (productsRes.meta?.pagination?.pageSize as number) || pageSize,
          }}
        />
      </Container>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; 'cate-slug': string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const tCategory = await getTranslations('category');

  const tCommon = await getTranslations('common');
  const api = new StrapiApi(locale);
  const category = await api.getCategoryBySlug(resolvedParams['cate-slug']);
  if (!category) {
    return {
      title: tCategory('title'),
    };
  }
  const title = category.name || tCategory('title');

  const description =
    (category as any).description || tCommon('productsOfKTBioTech');
  const baseDomain =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://ktbiotech.com';
  const localePrefix = locale === 'vi' ? '' : `/${locale}`;
  const url = `${baseDomain}${localePrefix}/danh-muc-san-pham/${resolvedParams['cate-slug']}`;
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
