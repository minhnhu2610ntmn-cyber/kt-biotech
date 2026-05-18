/**
 * Image utility functions
 */

/**
 * Build full image URL from Strapi image path
 * @param imagePath - The image path from Strapi
 * @returns Full image URL or fallback image
 */
export const buildImageUrl = (imagePath?: string): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || 'https://strapi.kt-biotech.com';
  if (!imagePath) return '/images/hero.png';

  // If imagePath is already an absolute URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  return `${baseUrl}${imagePath}`;
};
