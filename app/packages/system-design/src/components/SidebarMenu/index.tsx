'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { cn } from '../../utils';
import { ChevronRightIcon, MenuIcon } from '../Icons';

export interface SidebarMenuItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface SidebarMenuProps {
  items?: SidebarMenuItem[];
  activeItem?: string;
  className?: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items = [],
  activeItem,
  className,
}) => {
  const t = useTranslations('sidebar');

  // Default menu items based on the design
  const defaultItems: SidebarMenuItem[] = [
    { id: 'category', label: t('category'), href: '/category' },
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

  const menuItems = items.length > 0 ? items : defaultItems;

  return (
    <div className={cn(' h-full w-64 bg-white  z-40', className)}>
      <div className='space-y-2'>
        {menuItems.map(item => {
          const isActive = activeItem === item.id || item.isActive;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200',
                'hover:bg-gray-50',
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:text-gray-900'
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMenu;
