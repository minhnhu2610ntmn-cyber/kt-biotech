import type { Metadata } from 'next';
import { routing } from '../../i18n/routing';
import { HomePage } from '../components';
import { StrapiApi } from '../config/api';
import { getHomeMetadata, type SupportedLocale } from '../config/metadata';
import type { Article } from '../types/strapi';

// Fetch latest 4 articles with specific fields
async function getLatestArticles(locale: string) {
  try {
    const api = new StrapiApi(locale);
    const articles = await api.getArticles({
      sort: 'createdAt:desc',
      'pagination[limit]': '4',
      populate: '*',
      'filters[category][$notNull]': 'true',
    });
    return articles as Article[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching latest articles:', error);
    // Return empty array as fallback
    return [];
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  // Fetch latest articles on server-side
  // Product categories are now fetched in layout.tsx
  const latestArticles = await getLatestArticles(resolvedParams.locale);

  return <HomePage latestArticles={latestArticles} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const requestedLocale = resolvedParams?.locale;

  const normalizedLocale = routing.locales.includes(
    requestedLocale as SupportedLocale
  )
    ? (requestedLocale as SupportedLocale)
    : (routing.defaultLocale as SupportedLocale);

  return getHomeMetadata(normalizedLocale);
}
