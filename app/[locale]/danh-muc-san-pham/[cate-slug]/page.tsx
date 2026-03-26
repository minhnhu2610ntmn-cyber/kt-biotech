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

async function getProductCategoriesTree(locale: string): Promise<any[]> {
  try {
    const categories = await getProductCategoriesCached(locale);
    return Array.isArray(categories) ? categories : [];
  } catch {
    return [];
  }
}

async function getProductCategories(locale: string): Promise<PageCategory[]> {
  try {
    const categories = await getProductCategoriesCached(locale);
    const list = Array.isArray(categories) ? (categories as any[]) : [];
    return list.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug }));
  } catch {
    return [];
  }
}

/**
 * Helper function to find category by slug in tree
 */
function findCategoryInTree(categories: any[], slug: string): any | null {
  for (const cat of categories) {
    if (cat.slug === slug) {
      return cat;
    }
    if (cat.sub && cat.sub.length > 0) {
      const found = findCategoryInTree(cat.sub, slug);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Helper function to collect all category slugs including parent and all subcategories recursively
 * If subcategorySlug is provided, only filter by that specific subcategory
 */
function getAllCategorySlugs(
  categories: any[],
  targetSlug: string,
  subcategorySlug?: string
): string[] {
  // If subcategory slug is provided, only use that subcategory
  if (subcategorySlug) {
    // Verify the subcategory belongs to the parent category
    const parentCategory = findCategoryInTree(categories, targetSlug);
    if (parentCategory) {
      // Check if subcategory exists in parent's subcategories
      const hasSubcategory = (cat: any): boolean => {
        if (cat.slug === subcategorySlug) return true;
        if (cat.sub && cat.sub.length > 0) {
          return cat.sub.some((sub: any) => hasSubcategory(sub));
        }
        return false;
      };

      if (hasSubcategory(parentCategory)) {
        return [subcategorySlug];
      }
    }
    // If subcategory doesn't belong to parent, fall back to parent only
    return [targetSlug];
  }

  // Default behavior: include parent and all subcategories
  const slugs: string[] = [targetSlug];

  function collectSubcategorySlugs(cat: any): void {
    if (cat.sub && Array.isArray(cat.sub) && cat.sub.length > 0) {
      for (const sub of cat.sub) {
        if (sub.slug) {
          slugs.push(sub.slug);
        }
        // Recursively collect nested subcategories
        if (sub.sub && sub.sub.length > 0) {
          collectSubcategorySlugs(sub);
        }
      }
    }
  }

  const targetCategory = findCategoryInTree(categories, targetSlug);
  if (targetCategory) {
    collectSubcategorySlugs(targetCategory);
  }

  return slugs;
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
  const [categoriesTree, categories, brands] = await Promise.all([
    getProductCategoriesTree(locale),
    getProductCategories(locale),
    api.getBrands(),
  ]);
  const active = resolvedParams['cate-slug'];

  const q = (resolvedSearchParams?.q as string) || '';
  const brandIds = (resolvedSearchParams?.brands as string) || '';
  // Support both 'sub' and 'subcategory' query params (prefer 'sub')
  const subcategorySlug =
    (resolvedSearchParams?.sub as string) ||
    (resolvedSearchParams?.subcategory as string) ||
    '';
  const page = Number(resolvedSearchParams?.page || 1);
  const pageSize = Number(resolvedSearchParams?.pageSize || 20);

  // Get all category slugs including parent and all subcategories
  // If subcategorySlug is provided, only filter by that subcategory
  const allCategorySlugs = getAllCategorySlugs(
    categoriesTree,
    active,
    subcategorySlug || undefined
  );
  // Join all slugs with comma for API call
  const categorySlugsString = allCategorySlugs.join(',');

  const productsRes = await api.getProducts({
    q,
    brandIds,
    categorySlug: categorySlugsString,
    page,
    pageSize,
  });
  const isFallbackProducts = (productsRes as any)._fallback || false;

  let catalogue: CatalogueItem | null = await api.getCatalogue();

  // Fallback to Vietnamese catalogue if current locale catalogue has no downloadUrl
  if (!catalogue?.downloadUrl && locale !== 'vi') {
    const viApi = new StrapiApi('vi');
    const viCatalogue = await viApi.getCatalogue();
    if (viCatalogue?.downloadUrl) {
      catalogue = viCatalogue;
    }
  }

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
      <Container className='space-y-4 mt-6 px-4 pb-8'>
        <CategoryLayout
          categories={categories as unknown as any}
          categoriesTree={categoriesTree}
          activeCategory={active}
          brands={brands}
          products={productRows}
          catalogue={catalogue}
          isFallback={isFallbackProducts}
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
