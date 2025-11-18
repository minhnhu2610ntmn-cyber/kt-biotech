import type { ProductImage } from '@ktbiotech/system-design';
import {
  Container,
  Heading,
  ProductImageGallery,
  Text,
} from '@ktbiotech/system-design';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ProductContactCard from '../../../components/containers/ProductContactCard';
import ProductDetailContent, {
  type ProductDetailBlock,
} from '../../../components/containers/ProductDetailContent';
import RelatedProductsSection from '../../../components/containers/RelatedProductsSection';
import SetBreadcrumb from '../../../components/containers/SetBreadcrumb';
import { buildImageUrl, StrapiApi } from '../../../config/api';
import { Link } from '../../../utils/link';

interface ProductDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Fetch product by slug or documentId from Strapi API

async function getProductByIdentifier(
  identifier: string,
  locale: string
): Promise<any | null> {
  try {
    const api = new StrapiApi(locale);
    // Try slug first
    let product = await api.getProductBySlug(identifier);
    // If not found, try documentId
    if (!product) {
      product = await api.getProductByDocumentId(identifier);
    }
    return product;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const product = await getProductByIdentifier(resolvedParams.slug, locale);
  // eslint-disable-next-line no-console
  console.log('product', product);
  if (!product) {
    notFound();
  }

  // Extract product data - handle both direct and attributes structure
  const productData = product.attributes || product;
  const title = productData.title || '';
  const description = productData.description || '';
  const sku = productData.sku || '';
  const specification = productData.specification || '';
  const tags = productData.tags || '';

  // Handle categories - could be in data array or direct
  const categoriesData =
    productData.categories?.data || productData.categories || [];
  const category = Array.isArray(categoriesData)
    ? categoriesData[0]?.attributes || categoriesData[0] || {}
    : {};
  const categoryName = category.name || '';
  const categorySlug = category.slug || '';

  // Handle brand - could be in data array or direct (singular relation)
  const brandData =
    productData.brand?.data ||
    productData.brand ||
    productData.brands?.data ||
    productData.brands ||
    null;
  const brand = brandData
    ? Array.isArray(brandData)
      ? brandData[0]?.attributes || brandData[0] || {}
      : brandData?.attributes || brandData || {}
    : {};
  const brandName = brand.name || '';

  // Handle sale - extract sale data for contact card
  const saleData = productData.sale?.data || productData.sale || null;
  const sale = saleData ? saleData?.attributes || saleData : null;
  const saleName = sale?.name || '';
  const salePhone = sale?.phone || '';
  const salePosition = sale?.position || '';
  const saleAvatar = sale?.avatar;
  const saleAvatarUrl = saleAvatar?.url
    ? buildImageUrl(saleAvatar.url)
    : saleAvatar?.formats?.small?.url
      ? buildImageUrl(saleAvatar.formats.small.url)
      : saleAvatar?.formats?.thumbnail?.url
        ? buildImageUrl(saleAvatar.formats.thumbnail.url)
        : undefined;

  // Map images for ProductImageGallery
  const images: ProductImage[] = [];
  const productImages = productData.images?.data || productData.images || [];

  if (Array.isArray(productImages) && productImages.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    productImages.forEach((img: any) => {
      const imageData = img.attributes || img;
      const imageUrl = imageData.url || imageData.data?.attributes?.url;
      if (imageUrl) {
        images.push({
          url: buildImageUrl(imageUrl),
          alt: imageData.alternativeText || title,
          thumbnailUrl: imageData.formats?.thumbnail?.url
            ? buildImageUrl(imageData.formats.thumbnail.url)
            : undefined,
        });
      }
    });
  }

  // Helper function to convert Strapi rich text format to markdown string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertStrapiRichTextToMarkdown = (blocks: any[]): string => {
    if (!Array.isArray(blocks)) return '';

    return (
      blocks
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((block: any) => {
          if (block.type === 'paragraph' && block.children) {
            return (
              block.children
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((child: any) => {
                  if (child.type === 'text') {
                    let text = child.text || '';
                    // Handle formatting
                    if (child.bold) text = `**${text}**`;
                    if (child.italic) text = `*${text}*`;
                    if (child.code) text = `\`${text}\``;
                    return text;
                  }
                  if (child.type === 'link') {
                    const linkText = child.children?.[0]?.text || '';
                    return `[${linkText}](${child.url})`;
                  }
                  return '';
                })
                .join('')
            );
          }
          if (block.type === 'heading') {
            const level = block.level || 1;
            const text = block.children?.[0]?.text || '';
            return `${'#'.repeat(level)} ${text}`;
          }
          if (block.type === 'list') {
            const items = block.children || [];
            return (
              items
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((item: any, index: number) => {
                  const itemText = item.children?.[0]?.text || '';
                  return block.format === 'ordered'
                    ? `${index + 1}. ${itemText}`
                    : `- ${itemText}`;
                })
                .join('\n')
            );
          }
          return '';
        })
        .filter(Boolean)
        .join('\n\n')
    );
  };

  // Convert detail blocks to BlogContentBody format if available
  const detailBlocks: ProductDetailBlock[] = [];
  if (productData.detail && Array.isArray(productData.detail)) {
    // Convert entire detail array to markdown string
    const markdownContent = convertStrapiRichTextToMarkdown(productData.detail);
    if (markdownContent) {
      detailBlocks.push({
        __component: 'shared.rich-text',
        id: 1,
        body: markdownContent,
      } as ProductDetailBlock);
    }
  }

  // Related products: same category or brand, exclude current product
  const relatedApi = new StrapiApi(locale);
  const relatedRes = await relatedApi.getProducts({
    categorySlug: categorySlug || undefined,
    page: 1,
    pageSize: 8,
    excludeSlug: resolvedParams.slug,
  });
  const relatedMeta = relatedRes.meta?.pagination || { pageCount: 1, total: 0 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const relatedItems = (relatedRes.data as any[])
    .map(p => {
      const pd = p.attributes || p;
      const images = pd.images || p.images || {};
      const firstUrl = Array.isArray(images)
        ? images[0]?.url || images[0]?.attributes?.url
        : images?.data?.[0]?.attributes?.url;
      const imageUrl = firstUrl ? buildImageUrl(firstUrl) : undefined;
      const slug = pd.slug || p.slug;
      //   if (!slug) return null;
      const catLabel =
        pd.categories?.data?.[0]?.attributes?.name ||
        pd.categories?.[0]?.name ||
        categoryName ||
        '';
      // Mark as new if created within last 30 days (or if explicit flag exists)
      const createdAtStr = pd.createdAt || p.createdAt;
      const createdAt = createdAtStr ? new Date(createdAtStr).getTime() : 0;
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      const isNew =
        typeof pd.isNew === 'boolean'
          ? pd.isNew
          : createdAt > 0
            ? Date.now() - createdAt <= THIRTY_DAYS
            : false;
      return {
        slug,
        title: pd.title || p.title || '',
        description: pd.description || '',
        category: catLabel,
        imageUrl,
        isNew,
      };
    })
    .filter(Boolean) as {
    slug: string;
    title: string;
    description?: string;
    category?: string;
    imageUrl?: string;
    isNew?: boolean;
  }[];

  const t = await getTranslations('product');
  const tBreadcrumb = await getTranslations('breadcrumb');

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: tBreadcrumb('home'), href: '/' },
    { label: tBreadcrumb('danhmucsanpham'), href: '/danh-muc-san-pham' },
  ];

  // Add category if available
  if (categoryName && categorySlug) {
    breadcrumbItems.push({
      label: categoryName,
      href: `/danh-muc-san-pham/${categorySlug}`,
    });
  }

  // Add product name
  breadcrumbItems.push({
    label: title || resolvedParams.slug,
    href: `/san-pham/${resolvedParams.slug}`,
  });

  return (
    <>
      <SetBreadcrumb items={breadcrumbItems} />
      <Container className='py-8 px-4'>
        <div className='space-y-8'>
          {/* Main Product Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Column - Product Images */}
            <div>
              <ProductImageGallery images={images} />
            </div>

            {/* Right Column - Product Information */}
            <div className='space-y-6'>
              {/* Category Label */}
              {categoryName && categorySlug ? (
                <Link href={`/danh-muc-san-pham/${categorySlug}`}>
                  <Text className='text-gray-500 text-sm uppercase hover:text-[#215778] hover:underline underline-offset-2 decoration-[#215778] transition-colors'>
                    {categoryName}
                  </Text>
                </Link>
              ) : (
                categoryName && (
                  <Text className='text-gray-500 text-sm uppercase'>
                    {categoryName}
                  </Text>
                )
              )}

              {/* Product Name */}
              <Heading level={1} className='!text-3xl md:!text-4xl !font-bold'>
                {title}
              </Heading>

              {/* Short Description */}
              {description && (
                <Text className='text-gray-700 leading-relaxed'>
                  {description}
                </Text>
              )}

              {/* Product Attributes */}
              <div className='space-y-3 border-t border-b border-gray-200 py-4'>
                {brandName && (
                  <div className='flex flex-wrap gap-2'>
                    <Text className='font-semibold text-gray-900 w-32 shrink-0'>
                      {t('manufacturer')}:
                    </Text>
                    <Text className='text-gray-700 flex-1'>{brandName}</Text>
                  </div>
                )}
                {specification && (
                  <div className='flex flex-wrap gap-2'>
                    <Text className='font-semibold text-gray-900 w-32 shrink-0'>
                      {t('specification')}:
                    </Text>
                    <Text className='text-gray-700 flex-1'>
                      {specification}
                    </Text>
                  </div>
                )}
                {sku && (
                  <div className='flex flex-wrap gap-2'>
                    <Text className='font-semibold text-gray-900 w-32 shrink-0'>
                      {t('sku')}:
                    </Text>
                    <Text className='text-gray-700 flex-1'>{sku}</Text>
                  </div>
                )}
                {tags && (
                  <div className='flex flex-wrap gap-2'>
                    <Text className='font-semibold text-gray-900 w-32 shrink-0'>
                      {t('tags')}:
                    </Text>
                    <Text className='text-gray-700 flex-1'>{tags}</Text>
                  </div>
                )}
              </div>

              {/* Contact Card */}
              {saleName && (
                <ProductContactCard
                  phone={salePhone || '(+84) 28.3761.2606'}
                  contactName={saleName || ''}
                  contactPosition={salePosition || ''}
                  contactImage={saleAvatarUrl}
                />
              )}
            </div>
          </div>

          {/* Product Details Section */}
          {detailBlocks.length > 0 && (
            <div className='space-y-4'>
              <Heading
                level={2}
                className='!text-2xl !font-bold'
                color='#215778'
              >
                {t('details')}
              </Heading>
              <ProductDetailContent blocks={detailBlocks} />
            </div>
          )}
          {relatedItems.length > 0 && (
            <RelatedProductsSection
              heading={t('relatedProducts')}
              products={relatedItems}
              showPagination={(relatedMeta?.pageCount || 1) > 1}
            />
          )}
        </div>
      </Container>
    </>
  );
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tCommon = await getTranslations('common');
  const product = await getProductByIdentifier(resolvedParams.slug);

  if (!product) {
    return {
      title: tCommon('productNotFound'),
    };
  }

  const productData = product.attributes || product;
  const title = productData.title || tCommon('product');
  const description = productData.description || tCommon('productDetails');
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    'https://ktbiotech.com';
  const url = `${baseUrl}/san-pham/${resolvedParams.slug}`;

  // Get first image for Open Graph
  const productImages = productData.images?.data || productData.images || [];
  const firstImage =
    Array.isArray(productImages) && productImages.length > 0
      ? productImages[0]?.attributes || productImages[0]
      : null;
  const imageUrl = firstImage?.url ? buildImageUrl(firstImage.url) : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
  };
}
