import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'system-design': path.resolve(__dirname, './app/packages/system-design/src'),
      '@landing/system-design': path.resolve(__dirname, './app/packages/system-design/src'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
