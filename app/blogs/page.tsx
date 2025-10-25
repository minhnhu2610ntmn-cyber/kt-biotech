import { BlogPage } from '@ktbiotech/blog';
import type { Article } from '../types/strapi';
import { StrapiApi } from '../config/api';

// Fetch latest articles from Strapi API
async function getLatestArticles(): Promise<Article[]> {
  try {
    const api = new StrapiApi();
    const articles = await api.getArticles({
      sort: 'createdAt:desc',
      'pagination[limit]': '10',
      populate: '*',
      'filters[category][type][$eq]': 'blog',
    });
    return articles as Article[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching latest articles:', error);
    // Return empty array as fallback
    return [];
  }
}

// Fetch most viewed articles from Strapi API
async function getMostViewedArticles(): Promise<Article[]> {
  try {
    const api = new StrapiApi();
    const articles = await api.getArticles({
      sort: 'createdAt:desc', // For now, using createdAt as proxy for most viewed
      'pagination[limit]': '4',
      populate: '*',
      'filters[category][type][$eq]': 'blog',
    });
    return articles as Article[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching most viewed articles:', error);
    // Return empty array as fallback
    return [];
  }
}

// Fetch important articles from Strapi API
async function getImportantArticles(): Promise<Article[]> {
  try {
    const api = new StrapiApi();
    const articles = await api.getArticles({
      sort: 'createdAt:desc', // For now, using createdAt as proxy for important articles
      'pagination[limit]': '6',
      populate: '*',
      'filters[category][type][$eq]': 'blog',
    });
    return articles as Article[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching important articles:', error);
    // Return empty array as fallback
    return [];
  }
}

export default async function BlogsPage() {
  const [latestArticles, mostViewedArticles, importantArticles] =
    await Promise.all([
      getLatestArticles(),
      getMostViewedArticles(),
      getImportantArticles(),
    ]);

  return (
    <BlogPage
      latestArticles={latestArticles}
      mostViewedArticles={mostViewedArticles}
      importantArticles={importantArticles}
    />
  );
}
