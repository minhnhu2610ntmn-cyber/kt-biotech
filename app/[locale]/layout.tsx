import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { MasterLayout } from '../components';
import {
  getCategoriesProducts,
  getProductCategoriesCached,
  StrapiApi,
  type CatalogueEntry,
} from '../config/api';
import '../globals.css';
import { QueryProvider } from '../providers';
import type { ProductCategory } from '../types/strapi';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: 'KTBioTech - Công nghệ sinh học hàng đầu',
  description:
    'KTBioTech cung cấp các giải pháp công nghệ sinh học tiên tiến, thiết bị y tế và dịch vụ tư vấn chuyên nghiệp.',
};

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
  try {
    const api = new StrapiApi(locale);
    const [categories, productsTree, globalRes, catalogueRes] =
      await Promise.all([
        getProductCategoriesCached(locale),
        getCategoriesProducts(1, locale),
        api.getGlobal(),
        api.getCatalogue(),
      ]);
    // Cast to ProductCategory type
    productCategories = categories as ProductCategory[];
    categoriesProducts = productsTree;
    globalData = globalRes;
    catalogue = catalogueRes;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch product categories:', error);
  }
  console.log(productCategories);
  return (
    <html lang={locale}>
      <body
        className={`${roboto.variable} font-sans antialiased min-h-screen bg-white flex flex-col`}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
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
      </body>
    </html>
  );
}
