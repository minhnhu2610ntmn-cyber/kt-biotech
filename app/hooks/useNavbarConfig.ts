/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useTranslations } from 'next-intl';
import type { ProductCategory } from '../types/strapi';

export interface NavbarItem {
  label: string;
  href: string;
  i18nKey?: string;
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
    ...productCategories.map(category => ({
      label: category.name,
      href: `/danh-muc-san-pham/${category.slug || category.id}`,
      // map sub categories (children) if provided by API
      children: Array.isArray((category as any).sub)
        ? (category as any).sub.map((sc: any) => ({
            label: sc.name,
            href: `/danh-muc-san-pham/${sc.slug || sc.id}`,
          }))
        : [],
    })),
  ];

  const defaultConfig: NavbarConfig = {
    items: [
      {
        label: tNavbar('home'),
        href: '/',
        i18nKey: 'home',
        children: [],
      },
      {
        label: tNavbar('introduction'),
        href: '/gioi-thieu',
        i18nKey: 'introduction',
        children: [],
      },
      {
        label: tNavbar('products'),
        href: '/danh-muc-san-pham',
        i18nKey: 'products',
        children: productMenuItems,
      },
      {
        label: tNavbar('services'),
        href: '/services',
        i18nKey: 'services',
        children: [
          {
            label: tNavbar('serviceResearch'),
            href: '/dich-vu/nghien-cuu-khoa-hoc',
            i18nKey: 'serviceResearch',
          },
          {
            label: tNavbar('serviceSequencing'),
            href: '/dich-vu/giai-trinh-tu-gen',
            i18nKey: 'serviceSequencing',
          },
          {
            label: tNavbar('oem'),
            href: '/dich-vu/oem',
            i18nKey: 'oem',
          },
        ],
      },
      {
        label: tNavbar('news'),
        href: '/blogs',
        i18nKey: 'news',
        children: [],
      },
      {
        label: tNavbar('contact'),
        href: '/lien-he',
        i18nKey: 'contact',
        children: [],
      },
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
