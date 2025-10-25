import { BlogPage } from '@ktbiotech/blog';
import { StrapiApi } from '../config/api';
import type { Article } from '../types/strapi';

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

// Fetch recruitment posts from Strapi API
async function getRecruitmentPosts(): Promise<
  Array<{
    id: number;
    imageSrc: string;
    imageAlt: string;
    date: string;
    title: string;
    description: string;
    href: string;
  }>
> {
  try {
    const api = new StrapiApi();
    const articles = await api.getArticles({
      sort: 'createdAt:desc', // For now, using createdAt as proxy for recruitment posts
      'pagination[limit]': '6',
      populate: '*',
      'filters[category][type][$eq]': 'blog', // You might want to create a specific recruitment category
    });

    // Transform articles to recruitment post format
    return articles.map((article: Article) => ({
      id: article.id,
      imageSrc:
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop',
      imageAlt: article.title,
      date: new Date(article.createdAt).toLocaleDateString('vi-VN'),
      title: article.title,
      description: article.description,
      href: `/recruitment/${article.slug}`,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching recruitment posts:', error);
    // Return empty array as fallback
    return [];
  }
}

export default async function BlogsPage() {
  const [
    latestArticles,
    mostViewedArticles,
    importantArticles,
    recruitmentPosts,
  ] = await Promise.all([
    getLatestArticles(),
    getMostViewedArticles(),
    getImportantArticles(),
    getRecruitmentPosts(),
  ]);

  return (
    <BlogPage
      latestArticles={latestArticles}
      mostViewedArticles={mostViewedArticles}
      importantArticles={importantArticles}
      recruitmentPosts={recruitmentPosts}
    />
  );
}
