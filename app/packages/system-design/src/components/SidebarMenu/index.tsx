'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import type { ProductCategory, SidebarMenuItem } from '../../types';
import { cn } from '../../utils';
import { ChevronRightIcon, MenuIcon } from '../Icons';

export interface SidebarMenuProps {
  items?: SidebarMenuItem[];
  activeItem?: string;
  className?: string;
  productCategories?: ProductCategory[];
  hrefPrefix?: string; // base path for category links
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  activeItem,
  className,
  productCategories = [],
  hrefPrefix = '/danh-muc-san-pham',
}) => {
  const t = useTranslations('category');

  // Convert product categories to menu items
  const categoryItems: SidebarMenuItem[] = productCategories.map(category => ({
    id: category.slug || category.id.toString(),
    label: category.name,
    href: `${hrefPrefix}/${category.slug || category.id}`,
  }));

  // Default menu items based on the design (fallback)
  const defaultItems: SidebarMenuItem[] = [
    { id: 'imported-kit', label: t('importedKit'), href: '/imported-kit' },
    { id: 'human-kit', label: t('humanKit'), href: '/human-kit' },
    { id: 'animal-kit', label: t('animalKit'), href: '/animal-kit' },
    { id: 'aquatic-kit', label: t('aquaticKit'), href: '/aquatic-kit' },
    { id: 'food-kit', label: t('foodKit'), href: '/food-kit' },
    {
      id: 'extraction-kit',
      label: t('extractionKit'),
      href: '/extraction-kit',
    },
    {
      id: 'other-products',
      label: t('otherProducts'),
      href: '/other-products',
    },
  ];

  // Create final menu items with "Danh Mục" as first item
  const finalMenuItems: SidebarMenuItem[] = [
    {
      id: 'danh-muc',
      label: t('category'),
      href: '/danh-muc-san-pham',
      isActive: true, // Always highlight the first item
    },
    ...(categoryItems.length > 0 ? categoryItems : defaultItems),
  ];

  return (
    <div className={cn(' w-64  z-40', className)}>
      <div className='space-y-1'>
        {finalMenuItems.map(item => {
          const isActive = activeItem === item.id || item.isActive;
          const isDanhMuc = item.id === 'danh-muc';

          // Render "Danh Mục" as non-clickable div
          if (isDanhMuc) {
            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200',
                  'cursor-default', // Disable cursor for "Danh Mục"
                  isActive ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
                )}
              >
                <div className='flex items-center gap-3'>
                  <MenuIcon
                    width={16}
                    height={16}
                    className={cn('text-gray-600', isActive && 'text-blue-700')}
                  />
                  <span className='text-sm font-medium'>{item.label}</span>
                </div>
                <ChevronRightIcon
                  width={12}
                  height={12}
                  className={cn('text-gray-400', isActive && 'text-blue-600')}
                />
              </div>
            );
          }

          // Render other items as clickable links
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-4 py-3 group rounded-lg transition-colors duration-200',
                'hover:bg-blue-50',
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:text-gray-900'
              )}
            >
              <div className='flex items-center gap-3'>
                <MenuIcon
                  width={16}
                  height={16}
                  className={cn('text-gray-600 ', isActive && 'text-blue-700')}
                />
                <span className='text-sm font-medium'>{item.label}</span>
              </div>
              <ChevronRightIcon
                width={12}
                height={12}
                className={cn(
                  'text-gray-400 group-hover:translate-x-1 transition-transform duration-200',
                  isActive && 'text-blue-600'
                )}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMenu;
