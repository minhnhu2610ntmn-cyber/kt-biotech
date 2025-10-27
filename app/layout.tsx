import { Geist, Geist_Mono } from 'next/font/google';
import { MasterLayout, MessagesProvider } from './components';
import { StrapiApi } from './config/api';
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
  // Fetch data server-side
  const api = new StrapiApi();

  let productCategories: ProductCategory[] = [];
  try {
    const categories = await api.getCategories('product');
    // Cast to ProductCategory type
    productCategories = categories as ProductCategory[];
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
            <MasterLayout productCategories={productCategories}>
              {children}
            </MasterLayout>
          </MessagesProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
