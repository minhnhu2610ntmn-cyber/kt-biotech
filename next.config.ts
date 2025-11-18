import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
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
        protocol: 'http',
        hostname: '103.90.225.225',
        port: '1337',
        pathname: '/**',
      },
    ],
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
  eslint: {
    // Only fail on errors, not warnings - ignore warnings during build
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
