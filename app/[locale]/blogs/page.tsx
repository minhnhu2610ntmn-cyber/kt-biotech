import { BlogPage } from '@ktbiotech/blog';
import { StrapiApi } from '../../config/api';
import type { Article } from '../../types/strapi';

// Disable static generation - fetch data at request time
export const dynamic = 'force-dynamic';

// Fetch latest articles from Strapi API
async function getLatestArticles(locale: string): Promise<Article[]> {
  try {
    const api = new StrapiApi(locale);
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
async function getMostViewedArticles(locale: string): Promise<Article[]> {
  try {
    const api = new StrapiApi(locale);

    // First try to fetch with views:desc sort
    let articles = await api.getArticles({
      sort: 'views:desc',
      'pagination[limit]': '10', // Fetch more to have options after filtering
      populate: '*',
      'filters[category][type][$eq]': 'blog',
    });

    // Check if we have articles with valid views (> 0)
    if (articles && articles.length > 0) {
      const articlesWithViews = articles;
      console.log(articlesWithViews);
      if (articlesWithViews.length > 0) {
        return articlesWithViews.slice(0, 6) as Article[];
      }
    }

    // Fallback: if no articles with views, use createdAt:desc
    articles = await api.getArticles({
      sort: 'createdAt:desc',
      'pagination[limit]': '10',
      populate: '*',
      'filters[category][type][$eq]': 'blog',
    });
    console.log(articles);
    return (articles || []).slice(0, 6) as Article[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching most viewed articles:', error);
    // Final fallback to createdAt:desc
    try {
      const api = new StrapiApi(locale);
      const fallbackArticles = await api.getArticles({
        sort: 'createdAt:desc',
        'pagination[limit]': '6',
        populate: '*',
        'filters[category][type][$eq]': 'blog',
      });
      return (fallbackArticles || []) as Article[];
    } catch (fallbackError) {
      // eslint-disable-next-line no-console
      console.error('Fallback fetch also failed:', fallbackError);
      return [];
    }
  }
}

// Fetch important articles from Strapi API (randomized)
async function getImportantArticles(locale: string): Promise<Article[]> {
  try {
    const api = new StrapiApi(locale);
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
async function getRecruitmentPosts(locale: string): Promise<
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
    const api = new StrapiApi(locale);
    const articles = await api.getArticles({
      sort: 'createdAt:desc', // For now, using createdAt as proxy for recruitment posts
      'pagination[limit]': '6',
      populate: '*',
      'filters[type][$eq]': 'recruitment',
    });

    // Transform articles to recruitment post format
    const baseHref = locale === 'vi' ? '' : `/${locale}`;
    return articles.map((article: Article) => ({
      id: article.id,
      imageSrc:
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop',
      imageAlt: article.title,
      date: new Date(article.createdAt).toLocaleDateString(locale),
      title: article.title,
      description: article.description,
      href: `${baseHref}/recruitment/${article.slug}`,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching recruitment posts:', error);
    // Return empty array as fallback
    return [];
  }
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const [
    latestArticles,
    mostViewedArticlesRaw,
    importantArticles,
    recruitmentPosts,
  ] = await Promise.all([
    getLatestArticles(locale),
    getMostViewedArticles(locale),
    getImportantArticles(locale),
    getRecruitmentPosts(locale),
  ]);

  // Remove duplicates from mostViewedArticles
  // First, exclude articles already in latestArticles
  const latestArticleIds = new Set(
    latestArticles.map(article => article.id || (article as any).documentId)
  );

  // Then, remove duplicates within mostViewedArticles itself
  const seenIds = new Set<string | number>();
  let mostViewedArticles = mostViewedArticlesRaw
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

  // If after filtering we have no articles, use the raw data (even if duplicates)
  // This ensures we always show something in most viewed section
  if (mostViewedArticles.length === 0 && mostViewedArticlesRaw.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      'All most viewed articles were filtered out. Using raw data instead.'
    );
    mostViewedArticles = mostViewedArticlesRaw.slice(0, 4);
  }

  return (
    <BlogPage
      latestArticles={latestArticles}
      mostViewedArticles={mostViewedArticles}
      importantArticles={importantArticles}
      recruitmentPosts={recruitmentPosts}
    />
  );
}
