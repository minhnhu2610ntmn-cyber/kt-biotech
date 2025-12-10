import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { MasterLayout, ScriptInjector } from '../components';
import ScrollToTop from '../components/ScrollToTop';
import {
  getCategoriesProducts,
  getProductCategoriesCached,
  StrapiApi,
  type CatalogueEntry,
} from '../config/api';
import { roboto } from '../config/fonts';
import { getHomeMetadata, type SupportedLocale } from '../config/metadata';
import '../globals.css';
import { QueryProvider } from '../providers';
import type { ProductCategory } from '../types/strapi';

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  let productCategories: ProductCategory[] = [];
  let categoriesProducts: any = null;
  let globalData: any = null;
  let catalogue: CatalogueEntry | null = null;
  let scriptCodes: { codes?: { body: string }[] | null }[] | null = null;
  try {
    const api = new StrapiApi(locale);
    const [categories, productsTree, globalRes, catalogueRes, scriptCodesRes] =
      await Promise.all([
        getProductCategoriesCached(locale),
        getCategoriesProducts(1, locale),
        api.getGlobal(),
        api.getCatalogue(),
        api.getScriptCodes(),
      ]);
    // Cast to ProductCategory type
    productCategories = categories as ProductCategory[];
    categoriesProducts = productsTree;
    globalData = globalRes;
    catalogue = catalogueRes;
    scriptCodes = scriptCodesRes;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch product categories:', error);
  }

  return (
    <html lang={locale}>
      <body
        className={`${roboto.variable} font-sans antialiased min-h-screen bg-white flex flex-col`}
      >
        {/* Script codes from API - Head section (rendered early) */}
        <ScriptInjector
          scripts={scriptCodes?.[0]?.codes || null}
          target='head'
        />
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ScrollToTop />
            <MasterLayout
              productCategories={productCategories}
              products={categoriesProducts}
              global={globalData}
              catalogue={catalogue}
            >
              {children}
            </MasterLayout>
          </NextIntlClientProvider>
        </QueryProvider>
        <SpeedInsights />
        {/* Script codes from API - Body section (rendered at end) */}
        <ScriptInjector
          scripts={scriptCodes?.[1]?.codes || null}
          target='body'
        />
      </body>
    </html>
  );
}
