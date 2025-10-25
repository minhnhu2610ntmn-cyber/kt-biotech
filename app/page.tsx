import { HomePage } from './components';
import { StrapiApi } from './config/api';
import type { Article, ProductCategory } from './types/strapi';

// Fetch product categories from Strapi using StrapiApi
async function getProductCategories() {
  try {
    const api = new StrapiApi();
    const categories = await api.getCategories('product');
    return categories as ProductCategory[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching product categories:', error);
    // Return empty array as fallback
    return [];
  }
}

// Fetch latest 4 articles with specific fields
async function getLatestArticles() {
  try {
    const api = new StrapiApi();
    const articles = await api.getArticles({
      sort: 'createdAt:desc',
      'pagination[limit]': '4',
      populate: '*',
    });
    return articles as Article[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching latest articles:', error);
    // Return empty array as fallback
    return [];
  }
}

export default async function Home() {
  // Fetch both product categories and latest articles on server-side
  const [productCategories, latestArticles] = await Promise.all([
    getProductCategories(),
    getLatestArticles(),
  ]);

  return (
    <HomePage
      productCategories={productCategories}
      latestArticles={latestArticles}
    />
  );
}
