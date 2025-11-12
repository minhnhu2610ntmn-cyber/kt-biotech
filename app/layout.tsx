import { Geist, Geist_Mono } from 'next/font/google';
import { MasterLayout, MessagesProvider } from './components';
import {
  getCategoriesProducts,
  getProductCategoriesCached,
  StrapiApi,
} from './config/api';
import './globals.css';
import { QueryProvider } from './providers';
import type { ProductCategory } from './types/strapi';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'KTBioTech - Công nghệ sinh học hàng đầu',
  description:
    'KTBioTech cung cấp các giải pháp công nghệ sinh học tiên tiến, thiết bị y tế và dịch vụ tư vấn chuyên nghiệp.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let productCategories: ProductCategory[] = [];
  let categoriesProducts: any = null;
  let globalData: any = null;
  try {
    const api = new StrapiApi();
    const [categories, productsTree, globalRes] = await Promise.all([
      getProductCategoriesCached(),
      getCategoriesProducts(1),
      api.getGlobal(),
    ]);
    // Cast to ProductCategory type
    productCategories = categories as ProductCategory[];
    categoriesProducts = productsTree;
    globalData = globalRes;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch product categories:', error);
  }

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white flex flex-col`}
      >
        <QueryProvider>
          <MessagesProvider>
            <MasterLayout
              productCategories={productCategories}
              products={categoriesProducts}
              global={globalData}
            >
              {children}
            </MasterLayout>
          </MessagesProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
