/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useTranslations } from 'next-intl';

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
}

export function useNavbarConfig(customConfig?: NavbarConfig): NavbarConfig {
  const tNavbar = useTranslations('navbar');

  const defaultConfig: NavbarConfig = {
    items: [
      { label: tNavbar('home'), href: '/' },
      { label: tNavbar('about'), href: '/about' },
      { label: tNavbar('products'), href: '/products' },
      { label: tNavbar('services'), href: '/services' },
      { label: tNavbar('news'), href: '/blogs' },
      { label: tNavbar('contact'), href: '/contact' },
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
