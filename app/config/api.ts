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
  upload: '/api/upload',
} as const;

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
export class StrapiApi {
  private config: ApiConfig;

  constructor() {
    this.config = getApiConfig();
  }

  /**
   * Get categories by type
   */
  async getCategories(type?: 'blog' | 'product'): Promise<Category[]> {
    const params: Record<string, string> = {
      populate: '*',
    };
    if (type) {
      params['filters[type][$eq]'] = type;
    }

    const response = await fetch(
      `${buildApiUrl(API_ENDPOINTS.categories)}?${new URLSearchParams(params).toString()}`,
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
    const response = await fetch(buildApiUrl(API_ENDPOINTS.authors), {
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
    const response = await fetch(buildApiUrl(API_ENDPOINTS.brands), {
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
   * Get single category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const params = new URLSearchParams({
      'filters[slug][$eq]': slug,
      populate: '*',
    });
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
    page?: number;
    pageSize?: number;
  }): Promise<{ data: any[]; meta: any }> {
    const params: string[] = [];
    // populate images and brands
    params.push('populate[images][fields]=*');
    params.push('[populate[brand][fields]=*');

    if (filters?.q) {
      const qEncoded = encodeURIComponent(filters.q);
      params.push(`filters[$or][0][title][$containsi]=${qEncoded}`);
      params.push(`filters[$or][1][description][$containsi]=${qEncoded}`);
    }

    if (filters?.brandIds) {
      // relation key is "brands" in Strapi (plural)
      params.push(
        `filters[brand][id][$in]=${encodeURIComponent(filters.brandIds)}`
      );
    }

    if (filters?.categorySlug) {
      // assuming product has relation categories.slug (many-to-one or many-to-many)
      params.push(
        `filters[categories][slug][$eq]=${encodeURIComponent(filters.categorySlug)}`
      );
    }

    if (filters?.page) params.push(`pagination[page]=${filters.page}`);
    if (filters?.pageSize)
      params.push(`pagination[pageSize]=${filters.pageSize}`);

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
}
