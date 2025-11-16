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
      sort: 'views:desc', // For now, using createdAt as proxy for most viewed
      'pagination[limit]': '6',
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

// Fetch important articles from Strapi API (randomized)
async function getImportantArticles(): Promise<Article[]> {
  try {
    const api = new StrapiApi();
    const articles = await api.getArticles({
      sort: 'createdAt:desc', // Fetch with a base sort, then randomize
      'pagination[limit]': '20', // Fetch more to have better randomization
      populate: '*',
      'filters[category][type][$eq]': 'blog',
    });

    // Shuffle array randomly (Fisher-Yates algorithm)
    const shuffled = [...articles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return first 6 random articles
    return shuffled.slice(0, 6) as Article[];
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
      'filters[type][$eq]': 'recruitment',
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
    mostViewedArticlesRaw,
    importantArticles,
    recruitmentPosts,
  ] = await Promise.all([
    getLatestArticles(),
    getMostViewedArticles(),
    getImportantArticles(),
    getRecruitmentPosts(),
  ]);

  // Remove duplicates from mostViewedArticles
  // First, exclude articles already in latestArticles
  const latestArticleIds = new Set(
    latestArticles.map(article => article.id || (article as any).documentId)
  );

  // Then, remove duplicates within mostViewedArticles itself
  const seenIds = new Set<string | number>();
  const mostViewedArticles = mostViewedArticlesRaw
    .filter(article => {
      const articleId = article.id || (article as any).documentId;
      // Exclude if already in latestArticles or already seen in this list
      if (latestArticleIds.has(articleId) || seenIds.has(articleId)) {
        return false;
      }
      seenIds.add(articleId);
      return true;
    })
    .slice(0, 4); // Ensure we only return 4 articles

  return (
    <BlogPage
      latestArticles={latestArticles}
      mostViewedArticles={mostViewedArticles}
      importantArticles={importantArticles}
      recruitmentPosts={recruitmentPosts}
    />
  );
}
