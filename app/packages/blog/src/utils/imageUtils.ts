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
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://103.90.225.225:1337';
  if (!imagePath) return '/images/hero.png';
  return `${baseUrl}${imagePath}`;
};
