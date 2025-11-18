/**
 * API Configuration
 * Centralized configuration for all API calls
 */

import type { Article, Author, Category } from '../types/strapi';

export interface ApiConfig {
  baseUrl: string;
  token: string;
  timeout: number;
}

/**
 * Get API configuration from environment variables
 */
export function getApiConfig(): ApiConfig {
  return {
    baseUrl:
      process.env.STRAPI_URL ||
      process.env.NEXT_PUBLIC_STRAPI_URL ||
      'http://103.90.225.225:1337',
    token:
      process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN || '',
    timeout: 10000, // 10 seconds
  };
}

/**
 * Get axios headers for Strapi API
 */
export function getApiHeaders(token?: string): Record<string, string> {
  const config = getApiConfig();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || config.token}`,
  };
}

/**
 * Get axios config for Strapi API calls
 */
export function getAxiosConfig(token?: string) {
  const config = getApiConfig();
  return {
    headers: getApiHeaders(token),
    timeout: config.timeout,
  };
}

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  categories: '/api/categories',
  articles: '/api/articles',
  authors: '/api/authors',
  products: '/api/products',
  brands: '/api/brands',
  catalogue: '/api/catalogue',
  upload: '/api/upload',
  about: '/api/about',
  global: '/api/globals',
  genServices: '/api/gen-service',
  researchService: '/api/research-service',
  vision: '/api/vision',
  mission: '/api/mission',
  structure: '/api/structure',
  award: '/api/award',
  relationship: '/api/relationship',
  contacts: '/api/contacts',
} as const;

export type CatalogueEntry = {
  id: number;
  title: string;
  description?: string;
  downloadUrl?: string;
  fileName?: string;
};

export function normalizeCatalogueEntry(raw: any): CatalogueEntry | null {
  if (!raw) return null;
  const node = raw?.attributes || raw || {};
  const file =
    node?.file?.data?.attributes || node?.file?.data || node?.file || null;

  const downloadUrl = file?.url ? buildImageUrl(file.url) : undefined;
  const fileName =
    file?.name || file?.alternativeText || file?.caption || 'catalogue.pdf';

  return {
    id: raw?.id ?? node?.id ?? 0,
    title: node?.title || node?.name || 'Product Catalogue',
    description: node?.description || '',
    downloadUrl,
    fileName,
  };
}

/**
 * Build full API URL
 */
export function buildApiUrl(endpoint: string): string {
  const config = getApiConfig();
  return `${config.baseUrl}${endpoint}`;
}

/**
 * Build full image URL from Strapi
 */
export function buildImageUrl(imagePath?: string): string {
  const config = getApiConfig();
  if (!imagePath) return '/images/hero.png'; // Fallback image
  return `${config.baseUrl}${imagePath}`;
}

/**
 * Convert hex color to lighter shade
 */
export function lightenColor(hex: string, percent: number): string {
  // Remove # if present
  const color = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate lighter color
  const newR = Math.round(r + (255 - r) * (percent / 100));
  const newG = Math.round(g + (255 - g) * (percent / 100));
  const newB = Math.round(b + (255 - b) * (percent / 100));

  // Convert back to hex
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

/**
 * Common API functions for Strapi
 */
// Strapi API client

// Cached helpers
import { cache } from 'react';

/**
 * Internal cached function - always receives a locale string (normalized)
 */
const _getProductCategoriesCachedInternal = cache(async (locale?: string) => {
  console.log('locale', locale);
  const api = new StrapiApi(locale);
  const raw = (await api.getCategories('product')) as unknown as any[];

  // Normalize shape and build parent-child structure
  const nodes: Record<
    number | string,
    {
      id: number | string;
      name?: string;
      slug?: string;
      description?: string;
      color?: string;
      image?: any;
      // capture the raw parent id for linking
      parentId?: number | string | null;
      // resulting children container
      sub: any[];
    }
  > = {};

  const toId = (v: any): number | string | null => {
    if (!v) return null;
    if (typeof v === 'number' || typeof v === 'string') return v;
    // Strapi relation: object or { data: { id } }
    if (v?.data?.id != null) return v.data.id;
    if (v?.id != null) return v.id;
    return null;
  };

  const list = Array.isArray(raw) ? raw : [];

  // First pass: create node map
  for (const item of list) {
    const a = item.attributes || item;
    const id = item.id ?? a.id;
    if (id == null) continue;
    const parentId = toId(a.parent);
    nodes[id] = {
      id,
      name: a.name,
      slug: a.slug,
      description: a.description,
      color: a.color,
      image: a.image,
      parentId: parentId ?? null,
      sub: [],
    };
  }

  // Second pass: attach children to parent
  for (const id in nodes) {
    const node = nodes[id];
    if (node.parentId != null && nodes[node.parentId]) {
      nodes[node.parentId].sub.push(node);
    }
  }

  // Return only top-level categories (no parent) with sub arrays populated
  const tree = Object.values(nodes).filter(n => n.parentId == null);
  return tree as unknown as Category[];
});

/**
 * Cached fetch for product categories to avoid duplicate requests across layouts/pages
 * Normalizes locale to 'vi' if not provided (for pages outside [locale] route)
 */
export async function getProductCategoriesCached(
  locale?: string
): Promise<Category[]> {
  // Normalize locale: use 'vi' as default when not provided
  // This ensures consistent cache keys and proper filtering
  const normalizedLocale = locale;
  return _getProductCategoriesCachedInternal(normalizedLocale);
}

/**
 * Fetch combined categories-products tree for search/mega menu
 * Normalizes locale to 'vi' if not provided (for pages outside [locale] route)
 */
export async function getCategoriesProducts(
  depth = 1,
  locale?: string
): Promise<any> {
  // Normalize locale: use 'vi' as default when not provided
  const normalizedLocale = locale || 'vi';
  const params = new URLSearchParams({
    depth: depth.toString(),
    locale: normalizedLocale,
  });
  const response = await fetch(
    `${buildApiUrl('/api/search/categories-products')}?${params.toString()}`,
    {
      method: 'GET',
      headers: getApiHeaders(),
      next: { revalidate: 300 },
    }
  );
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Failed to fetch categories-products: ${response.status} ${response.statusText} ${body}`
    );
  }
  return await response.json();
}
// Keep StrapiApi methods after cached helpers to avoid circular import issues in some bundlers
export class StrapiApi {
  private readonly locale: string;

  constructor(locale?: string) {
    // Normalize locale: use 'vi' as default when not provided
    // This ensures all API calls filter by locale (default 'vi')
    this.locale = locale === 'en' ? 'en' : 'vi-VN';
  }

  private appendLocaleToSearchParams(params: URLSearchParams) {
    if (!params.has('locale')) {
      params.set('locale', this.locale);
    }
  }

  private appendLocaleToQueryParts(parts: string[]) {
    if (
      !parts.some(
        part =>
          part.startsWith('locale=') ||
          part.startsWith('locale%5B') ||
          part.startsWith('locale[')
      )
    ) {
      parts.push(`locale=${encodeURIComponent(this.locale)}`);
    }
  }

  private appendLocaleToUrl(url: string) {
    if (url.includes('locale=')) {
      return url;
    }
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}locale=${encodeURIComponent(this.locale)}`;
  }

  /**
   * Get categories by type
   */
  async getCategories(type?: 'blog' | 'product'): Promise<Category[]> {
    const params = new URLSearchParams({
      'populate[image][fields]': '*',
      'populate[parent][fields]': '*',
    });
    if (type) {
      params.set('filters[type][$eq]', type);
    }
    this.appendLocaleToSearchParams(params);

    const response = await fetch(
      `${buildApiUrl(API_ENDPOINTS.categories)}?${params.toString()}`,
      {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();

    return data.data || [];
  }

  /**
   * Get articles with filters
   */
  async getArticles(filters?: Record<string, string>): Promise<Article[]> {
    // Build query string manually to handle bracket notation
    const params: string[] = [];

    // Set default populate if not provided
    if (!filters?.populate) {
      // params.push('populate=*');
    }

    // Add all filters
    Object.entries(filters || {}).forEach(([key, value]) => {
      params.push(`${key}=${value}`);
    });
    this.appendLocaleToQueryParts(params);

    const queryString = params.join('&');
    const response = await fetch(
      `${buildApiUrl(API_ENDPOINTS.articles)}?${queryString}`,
      {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  /**
   * Get authors
   */
  async getAuthors(): Promise<Author[]> {
    const url = this.appendLocaleToUrl(buildApiUrl(API_ENDPOINTS.authors));
    const response = await fetch(url, {
      method: 'GET',
      headers: getApiHeaders(),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch authors: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  /**
   * Get brands (manufacturers)
   */
  async getBrands(): Promise<Array<{ id: number; name: string }>> {
    const url = this.appendLocaleToUrl(buildApiUrl(API_ENDPOINTS.brands));
    const response = await fetch(url, {
      method: 'GET',
      headers: getApiHeaders(),
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.statusText}`);
    }

    const data = await response.json();
    const list = Array.isArray(data?.data) ? (data.data as any[]) : [];
    return list.map((b: any) => ({ id: b.id, name: b.name }));
  }

  /**
   * Get catalogues with optional filters
   */
  async getCatalogue(): Promise<CatalogueEntry | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.catalogue)}?populate=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch catalogue: ${response.status} ${response.statusText} ${body}`
        );
      }

      const json = await response.json();
      return normalizeCatalogueEntry(json?.data || null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching catalogue:', error);
      return null;
    }
  }

  /**
   * Get single category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const params = new URLSearchParams({
      'filters[slug][$eq]': slug,
      populate: '*',
    });
    this.appendLocaleToSearchParams(params);
    const response = await fetch(
      `${buildApiUrl(API_ENDPOINTS.categories)}?${params.toString()}`,
      {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const list = Array.isArray(data?.data) ? (data.data as Category[]) : [];
    return list[0] || null;
  }

  /**
   * Get products with optional filters: q (search), brandIds (comma), categorySlug
   */
  async getProducts(filters?: {
    q?: string;
    brandIds?: string; // comma-separated ids
    categorySlug?: string;
    excludeSlug?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: any[]; meta: any }> {
    const params: string[] = [];
    // populate images and brands
    params.push('populate[images][fields]=*');
    params.push('populate[categories][fields]=*');

    if (filters?.q) {
      const qEncoded = encodeURIComponent(filters.q);
      params.push(`filters[$or][0][title][$containsi]=${qEncoded}`);
      params.push(`filters[$or][1][description][$containsi]=${qEncoded}`);
    }

    if (filters?.brandIds) {
      params.push(
        `filters[brand][id][$in]=${encodeURIComponent(filters.brandIds)}`
      );
    }

    if (filters?.categorySlug) {
      // assuming product has relation categories.slug (many-to-one or many-to-many)
      params.push(
        `filters[categories][slug][$in]=${encodeURIComponent(filters.categorySlug)}`
      );
    }

    if (filters?.page) params.push(`pagination[page]=${filters.page}`);
    if (filters?.pageSize)
      params.push(`pagination[pageSize]=${filters.pageSize}`);

    this.appendLocaleToQueryParts(params);

    if (filters?.excludeSlug) {
      params.push(
        `filters[slug][$ne]=${encodeURIComponent(filters.excludeSlug)}`
      );
    }

    const query = params.join('&');
    const response = await fetch(
      `${buildApiUrl(API_ENDPOINTS.products)}${query ? `?${query}` : ''}`,
      {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 60 },
      }
    );
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText} ${body}`
      );
    }
    const json = await response.json();
    return { data: json?.data || [], meta: json?.meta || {} };
  }

  /**
   * Search materials by query string
   */
  async searchMaterials(query: string): Promise<any[]> {
    if (!query) {
      return [];
    }
    const params = new URLSearchParams({
      q: query,
    });
    this.appendLocaleToSearchParams(params);
    const response = await fetch(
      `${buildApiUrl('/api/search/materials')}?${params.toString()}`,
      {
        method: 'GET',
        headers: getApiHeaders(),
        cache: 'no-store',
      }
    );
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(
        `Failed to search materials: ${response.status} ${response.statusText} ${body}`
      );
    }
    const json: { results?: any[]; data?: any[] } = await response
      .json()
      .catch(() => null);

    if (Array.isArray(json?.results)) return json.results;
    return [];
  }

  /**
   * Get single product by slug
   */
  async getProductBySlug(slug: string): Promise<any | null> {
    try {
      const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'populate[images][fields]': '*',
        'populate[brand][fields]': '*',
        'populate[categories][fields]': '*',
        'populate[sale][fields]': '*',
        'populate[sale][populate][avatar][fields]': '*',
      });
      this.appendLocaleToSearchParams(params);

      const response = await fetch(
        `${buildApiUrl(API_ENDPOINTS.products)}?${params.toString()}`,
        {
          method: 'GET',
          headers: getApiHeaders(),
          next: { revalidate: 300 }, // Cache for 5 minutes
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch product: ${response.status} ${response.statusText} ${body}`
        );
      }

      const json = await response.json();
      console.log('json', json);
      const products = json?.data || [];
      return products.length > 0 ? products[0] : null;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  }

  /**
   * Get single product by documentId (alternative to slug)
   */
  async getProductByDocumentId(documentId: string): Promise<any | null> {
    try {
      const params = new URLSearchParams({
        'filters[documentId][$eq]': documentId,
        'populate[images][fields]': '*',
        'populate[brand][fields]': '*',
        'populate[categories][fields]': '*',
        'populate[sale][populate][avatar][fields]': '*',
      });
      this.appendLocaleToSearchParams(params);

      const response = await fetch(
        `${buildApiUrl(API_ENDPOINTS.products)}?${params.toString()}`,
        {
          method: 'GET',
          headers: getApiHeaders(),
          next: { revalidate: 300 },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch product: ${response.status} ${response.statusText} ${body}`
        );
      }

      const json = await response.json();
      const products = json?.data || [];
      return products.length > 0 ? products[0] : null;
    } catch (error) {
      console.error('Error fetching product by documentId:', error);
      return null;
    }
  }

  /**
   * Get about single type
   */
  async getAbout(): Promise<any | null> {
    const url = this.appendLocaleToUrl(
      `${buildApiUrl(API_ENDPOINTS.about)}?populate=*`
    );
    const response = await fetch(url, {
      method: 'GET',
      headers: getApiHeaders(),
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch about: ${response.statusText}`);
    }

    const data = await response.json();
    // Single types return data directly, not wrapped in data.data
    return data?.data || null;
  }

  /**
   * Get genome services single type
   */
  async getGenServices(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.genServices)}?populate=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch gen services: ${response.status} ${response.statusText} ${body}`
        );
      }

      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching gen services:', error);
      return null;
    }
  }

  /**
   * Get research service single type
   */
  async getResearchService(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.researchService)}?populate=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch research service: ${response.status} ${response.statusText} ${body}`
        );
      }
      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching research service:', error);
      return null;
    }
  }

  /**
   * Get global single type
   */
  async getGlobal(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.global)}?populate[image][fields]=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch global: ${response.status} ${response.statusText} ${body}`
        );
      }

      const data = await response.json();
      // Single types return data directly, not wrapped in data.data
      return data?.data || null;
    } catch (error) {
      console.error('Error fetching global:', error);
      return null;
    }
  }

  /**
   * Get vision single type
   */
  async getVision(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.vision)}?populate=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch vision: ${response.status} ${response.statusText} ${body}`
        );
      }

      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching vision:', error);
      return null;
    }
  }

  /**
   * Get mission single type
   */
  async getMission(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.mission)}?populate=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch mission: ${response.status} ${response.statusText} ${body}`
        );
      }

      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching mission:', error);
      return null;
    }
  }

  /**
   * Get structure single type
   */
  async getStructure(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.structure)}?populate[content][populate]=*&populate[image][fields]=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch structure: ${response.status} ${response.statusText} ${body}`
        );
      }

      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching structure:', error);
      return null;
    }
  }

  /**
   * Get award single type
   */
  async getAward(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.award)}?populate=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch award: ${response.status} ${response.statusText} ${body}`
        );
      }

      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching award:', error);
      return null;
    }
  }

  /**
   * Get relationship single type
   */
  async getRelationship(): Promise<any | null> {
    try {
      const url = this.appendLocaleToUrl(
        `${buildApiUrl(API_ENDPOINTS.relationship)}?populate[content][populate]=*&populate[image][fields]=*`
      );
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders(),
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const body = await response.text().catch(() => '');
        throw new Error(
          `Failed to fetch relationship: ${response.status} ${response.statusText} ${body}`
        );
      }

      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching relationship:', error);
      return null;
    }
  }

  /**
   * Submit contact form
   * @param data - Contact form data
   */
  async submitContact(data: {
    name: string;
    company: string;
    phone: string;
    email: string;
    message: string;
  }): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.contacts), {
        method: 'POST',
        headers: {
          ...getApiHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: data.name,
            company: data.company,
            phone: data.phone,
            email: data.email,
            message: data.message,
          },
        }),
        cache: 'no-store',
      });

      if (!response.ok) {
        await response.text().catch(() => '');
        return {
          success: false,
          error: `Failed to submit contact: ${response.status} ${response.statusText}`,
        };
      }

      const result = await response.json();
      return {
        success: true,
        data: result?.data || result,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Update article field
   * @param articleId - Article ID or documentId
   * @param fieldName - Field name to update
   * @param fieldValue - New field value
   * @param publishedAt - Optional publishedAt date to maintain published status
   */
  async updateArticleField(
    articleId: number | string,
    fieldName: string,
    fieldValue: any,
    publishedAt?: string | null
  ): Promise<void> {
    try {
      // For Strapi v5, try documentId in path first, then fallback to id
      const isDocumentId =
        typeof articleId === 'string' && articleId.includes('-');
      const url = `${buildApiUrl(API_ENDPOINTS.articles)}/${articleId}`;

      // If it's a documentId, try using it in path (Strapi v5 supports this)
      // If that fails, we'll try query parameter approach
      // Include publishedAt: null to keep it published (or set to current date)
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          ...getApiHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            [fieldName]: fieldValue,
            // Keep publishedAt to maintain published status if provided
            ...(publishedAt !== undefined && { publishedAt }),
          },
        }),
        // No caching for updates
        cache: 'no-store',
      });

      if (!response.ok) {
        // If documentId in path failed, try query parameter approach
        if (isDocumentId && response.status === 404) {
          const queryUrl = `${buildApiUrl(API_ENDPOINTS.articles)}?documentId=${articleId}`;
          const retryResponse = await fetch(queryUrl, {
            method: 'PUT',
            headers: {
              ...getApiHeaders(),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: {
                [fieldName]: fieldValue,
                // Keep publishedAt to maintain published status if provided
                ...(publishedAt !== undefined && { publishedAt }),
              },
            }),
            cache: 'no-store',
          });

          if (!retryResponse.ok) {
            const errorBody = await retryResponse.text().catch(() => '');
            // eslint-disable-next-line no-console
            console.error(
              `Failed to update article field: ${retryResponse.status} ${retryResponse.statusText}`,
              errorBody
            );
          }
          return;
        }

        const errorBody = await response.text().catch(() => '');
        // Don't throw error, just log it silently
        // eslint-disable-next-line no-console
        console.error(
          `Failed to update article field: ${response.status} ${response.statusText}`,
          errorBody
        );
      }
    } catch (error) {
      // Don't throw error, just log it silently
      // eslint-disable-next-line no-console
      console.error('Error updating article field:', error);
    }
  }
}
