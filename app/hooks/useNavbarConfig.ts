/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useTranslations } from 'next-intl';
import type { ProductCategory } from '../types/strapi';

export interface NavbarItem {
  label: string;
  href: string;
  children?: NavbarItem[];
}

export interface NavbarConfig {
  items?: NavbarItem[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  hotlineNumber?: string;
  hotlineLabel?: string;
  address?: string;
  productCategories?: ProductCategory[];
}

export function useNavbarConfig(customConfig?: NavbarConfig): NavbarConfig {
  const tNavbar = useTranslations('navbar');

  // Generate product menu items from categories
  const productCategories = customConfig?.productCategories || [];
  const productMenuItems = [
    { label: 'Tất cả', href: '/products' },
    ...productCategories.map(category => ({
      label: category.name,
      href: `/products/${category.slug || category.id}`,
    })),
  ];

  const defaultConfig: NavbarConfig = {
    items: [
      { label: 'Trang chủ', href: '/', children: [] },
      { label: 'Giới thiệu', href: '/gioi-thieu', children: [] },
      {
        label: 'Sản phẩm',
        href: '/products',
        children: productMenuItems,
      },
      {
        label: 'Dịch vụ',
        href: '/services',
        children: [
          { label: 'Dịch vụ 1', href: '/services/service-1' },
          { label: 'Dịch vụ 2', href: '/services/service-2' },
          { label: 'Dịch vụ 3', href: '/services/service-3' },
          { label: 'Tư vấn', href: '/services/consultation' },
        ],
      },
      { label: 'Tin tức', href: '/blogs', children: [] },
      { label: 'Liên hệ', href: '/lien-he', children: [] },
    ],
    showSearch: true,
    searchPlaceholder: tNavbar('searchPlaceholder'),
    onSearch: (value: string) => {
      // Handle search functionality
    },
    hotlineNumber: '(+84) 28.3761.2606',
    hotlineLabel: tNavbar('hotline'),
    address:
      'Số 10-12, đường số 3, KDC Gia Hòa, Phường Phong Phú, tp Hồ Chí Minh',
  };

  // Merge custom config with default config
  return {
    ...defaultConfig,
    ...customConfig,
    // Ensure items are always defined
    items: customConfig?.items || defaultConfig.items,
  };
}
