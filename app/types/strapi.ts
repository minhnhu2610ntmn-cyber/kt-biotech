/**
 * Common types for Strapi API responses
 */

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category extends StrapiItem {
  type: 'blog' | 'product';
  name: string;
  color: string;
  description: string;
  slug: string;
}

export interface Author extends StrapiItem {
  name: string;
  email: string;
}

export interface MediaFile extends StrapiItem {
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider_metadata?: any;
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ArticleBlock {
  __component:
    | 'shared.rich-text'
    | 'shared.quote'
    | 'shared.media'
    | 'shared.slider';
  id: number;
  body?: string;
  title?: string;
  file?: MediaFile | null;
  files?: MediaFile[];
  slides?: Array<{
    image?: { url: string };
    caption?: string;
  }>;
}

export interface Article extends StrapiItem {
  title: string;
  description: string;
  slug: string;
  author: Author;
  category: Category;
  cover?: MediaFile;
  blocks: ArticleBlock[];
  seo?: {
    id: number;
    metaTitle: string;
    metaDescription: string;
  };
}

export interface ProductCategory extends Category {
  type: 'product';
}

export interface ProductBlock {
  __component:
    | 'shared.rich-text'
    | 'shared.quote'
    | 'shared.media'
    | 'shared.slider';
  id: number;
  body?: string;
  title?: string;
  file?: MediaFile | null;
  files?: MediaFile[];
}

export interface Product extends StrapiItem {
  name: string;
  description: string;
  slug: string;
  sku?: string;
  price?: number;
  stock?: number;
  status?: 'available' | 'out-of-stock' | 'discontinued';
  category: ProductCategory;
  cover?: MediaFile;
  images?: MediaFile[];
  content?: ProductBlock[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  specifications?: any;
  seo?: {
    id: number;
    metaTitle: string;
    metaDescription: string;
  };
}
