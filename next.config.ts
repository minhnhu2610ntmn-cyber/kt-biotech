import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  // Disable image optimization for standalone deployment
  // Images will be served directly without optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'strapi.kt-biotech.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow all image domains for flexibility
    domains: ['strapi.kt-biotech.com', 'kt-biotech.com'],
  },
  webpack: (config, { dev }) => {
    // In development, use TypeScript source directly for hot reload
    if (dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@ktbiotech/system-design': path.resolve(
          __dirname,
          './app/packages/system-design/src'
        ),
        '@ktbiotech/blog': path.resolve(__dirname, './app/packages/blog/src'),
      };
    } else {
      // In production, use compiled JavaScript
      config.resolve.alias = {
        ...config.resolve.alias,
        '@ktbiotech/system-design': path.resolve(
          __dirname,
          './app/packages/system-design/dist'
        ),
        '@ktbiotech/blog': path.resolve(__dirname, './app/packages/blog/dist'),
      };
    }
    return config;
  },
  transpilePackages: ['@ktbiotech/system-design', '@ktbiotech/blog'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withNextIntl(nextConfig);
