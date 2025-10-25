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
    baseUrl: process.env.STRAPI_URL || 'http://103.90.225.225:1337',
    token: process.env.STRAPI_TOKEN || '',
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

    const response = await fetch(buildApiUrl(API_ENDPOINTS.categories), {
      method: 'GET',
      headers: getApiHeaders(),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

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
    const params = new URLSearchParams();

    // Set default populate if not provided
    if (!filters?.populate) {
      params.append('populate', '*');
    }

    // Add all filters
    Object.entries(filters || {}).forEach(([key, value]) => {
      params.append(key, value);
    });

    const response = await fetch(
      `${buildApiUrl(API_ENDPOINTS.articles)}?${params}`,
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
}
