import { Geist, Geist_Mono } from 'next/font/google';
import { MessagesProvider, MasterLayout } from './components';
import { QueryProvider } from './providers';
import './globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white flex flex-col`}
      >
        <QueryProvider>
          <MessagesProvider>
            <MasterLayout>{children}</MasterLayout>
          </MessagesProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
