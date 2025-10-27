import { HomePage } from './components';
import { StrapiApi } from './config/api';
import type { Article } from './types/strapi';

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
  // Fetch latest articles on server-side
  // Product categories are now fetched in layout.tsx
  const latestArticles = await getLatestArticles();

  return <HomePage latestArticles={latestArticles} />;
}
