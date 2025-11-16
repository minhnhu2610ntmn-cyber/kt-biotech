'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Container } from '..';
import { cn } from '../../utils';
import { Text } from '../Typography';
import { useBreadcrumb } from './BreadcrumbContext';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

export function Breadcrumb({ items, className, separator }: BreadcrumbProps) {
  const pathname = usePathname();
  const t = useTranslations('breadcrumb');
  const tNavbar = useTranslations('navbar');
  const { items: contextItems } = useBreadcrumb();

  // Auto-generate breadcrumb from pathname if items not provided
  const breadcrumbItems = React.useMemo(() => {
    // Priority: props items > context items > auto-generated
    if (items) return items;
    if (contextItems) return contextItems;

    const paths = pathname.split('/').filter(Boolean);
    const result: BreadcrumbItem[] = [
      {
        label: t('home'),
        href: '/',
      },
    ];

    let currentPath = '';
    paths.forEach(path => {
      currentPath += `/${path}`;

      // Try to get translation for this path
      let label = path;
      try {
        // Try breadcrumb translations first
        const translationKey = path.replace(/-/g, '');
        const translated = t(translationKey);
        if (translated && translated !== translationKey) {
          label = translated;
        } else {
          // Try navbar translations
          try {
            const navbarLabel = tNavbar(path as any);
            if (navbarLabel && navbarLabel !== path) {
              label = navbarLabel;
            } else {
              // Format path as label (capitalize first letter, replace hyphens with spaces)
              label = path
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            }
          } catch {
            // Format path as label
            label = path
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          }
        }
      } catch {
        // If translation fails, format path as label
        label = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      result.push({
        label,
        href: currentPath,
      });
    });

    return result;
  }, [pathname, items, contextItems, t, tNavbar]);

  const defaultSeparator = <span className='text-[#215778] mx-1'>/</span>;

  return (
    <nav aria-label='Breadcrumb' className={cn('bg-[#EBF4F9] py-3', className)}>
      <Container className=' mx-auto px-2'>
        <ol className='flex items-center space-x-1 text-sm'>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <li key={item.href} className='flex items-center'>
                {index > 0 && <span>{separator || defaultSeparator}</span>}
                {isLast ? (
                  <Text
                    variant='body'
                    className='text-[#215778] font-medium'
                    aria-current='page'
                    size='sm'
                  >
                    {item.label}
                  </Text>
                ) : (
                  <Link
                    href={item.href}
                    className='text-[#215778] hover:text-[#3691C9] transition-colors'
                  >
                    <Text variant='body' size='sm' className='text-[#215778]'>
                      {item.label}
                    </Text>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}

export { BreadcrumbProvider, useBreadcrumb } from './BreadcrumbContext';

export default Breadcrumb;
