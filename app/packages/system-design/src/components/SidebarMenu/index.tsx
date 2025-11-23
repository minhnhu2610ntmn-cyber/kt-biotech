'use client';

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
  categoryLabel?: string; // Translated label for "Danh mục" / "Category"
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  activeItem,
  className,
  productCategories = [],
  hrefPrefix = '/danh-muc-san-pham',
  categoryLabel = 'Danh mục', // Default fallback
}) => {
  // Convert product categories to menu items
  const categoryItems: SidebarMenuItem[] = productCategories.map(category => ({
    id: category.slug || category.id.toString(),
    label: category.name,
    href: `${hrefPrefix}/${category.slug || category.id}`,
  }));

  // Create final menu items with translated category label as first item
  const finalMenuItems: SidebarMenuItem[] = [
    {
      id: 'danh-muc',
      label: categoryLabel,
      href: '/danh-muc-san-pham',
      isActive: true, // Always highlight the first item
    },
    ...(categoryItems.length > 0 ? categoryItems : []),
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
                  'flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-200',
                  'cursor-default', // Disable cursor for "Danh Mục"
                  isActive ? 'bg-[#86BDDF] text-[#1B1C1Dv]' : 'text-[#1B1C1D]'
                )}
              >
                <div className='flex items-center gap-3'>
                  <MenuIcon
                    width={24}
                    height={24}
                    color='#1B1C1D'
                    className={cn('text-#1B1C1D', isActive && 'text-blue-700')}
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
                'flex items-center justify-between px-4 py-2 group rounded-lg transition-colors duration-200',
                'hover:bg-[#D7E9F4]',
                isActive
                  ? 'bg-[#D7E9F4] text-[#1B1C1D]'
                  : 'text-[#1B1C1D] hover:text-[#1B1C1D]'
              )}
            >
              <div className='flex items-center gap-3'>
                <MenuIcon
                  width={24}
                  height={24}
                  color='#1B1C1D'
                  className={cn(
                    'text-[#1B1C1D] ',
                    isActive && '!text-[#3691C9]'
                  )}
                />
                <span className='text-sm font-medium'>{item.label}</span>
              </div>
              <ChevronRightIcon
                width={12}
                height={12}
                className={cn(
                  'text-[#1B1C1D] group-hover:translate-x-1 transition-transform duration-200',
                  isActive && 'text-[#3691C9]'
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
