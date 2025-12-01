'use client';

import { useLocale, useTranslations } from 'next-intl';
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
  const locale = useLocale();
  const t = useTranslations('breadcrumb');
  const tNavbar = useTranslations('navbar');
  const { items: contextItems } = useBreadcrumb();

  // Default locale (vi) doesn't have prefix
  const defaultLocale = 'vi';

  // Helper function to build href with locale prefix
  const buildHref = (href: string) => {
    if (locale === defaultLocale) {
      return href;
    }
    return `/${locale}${href}`;
  };

  // Auto-generate breadcrumb from pathname if items not provided
  const breadcrumbItems = React.useMemo(() => {
    // Remove locale prefix from pathname for breadcrumb generation
    // Default locale (vi) does not use a prefix, so we only strip
    // the locale segment when it's a non-default locale.
    const pathnameWithoutLocale =
      locale === defaultLocale
        ? pathname || '/'
        : pathname.replace(`/${locale}`, '') || '/';

    // Hide breadcrumb on home page
    if (pathnameWithoutLocale === '/') {
      return [];
    }

    // Priority: props items > context items > auto-generated
    // Always prefer context items (from API via SetBreadcrumb) over auto-generation
    if (items) return items;
    if (contextItems && contextItems.length > 0) return contextItems;

    // List of known static routes that have translations
    // Only auto-generate for these routes
    const knownStaticRoutes = [
      'gioi-thieu',
      'dich-vu',
      'lien-he',
      'blogs',
      'recruitment',
      'danh-muc-san-pham',
      've-chung-toi',
      'tam-nhin-su-menh',
      'co-cau-to-chuc',
      'giai-thuong',
      'quan-he-hop-tac',
      'nghien-cuu-khoa-hoc',
      'giai-trinh-tu-gen',
    ];

    const paths = pathnameWithoutLocale.split('/').filter(Boolean);

    // Check if all path segments are known static routes
    const allSegmentsAreStatic = paths.every(path =>
      knownStaticRoutes.includes(path)
    );

    // Only auto-generate if all segments are known static routes
    // Otherwise, wait for API data via SetBreadcrumb
    if (!allSegmentsAreStatic) {
      return [];
    }

    // Helper function to safely get translation without throwing errors
    const safeTranslate = (
      translator: (key: string) => string,
      key: string
    ): string | null => {
      try {
        const translated = translator(key);
        // Check if translation exists (not the same as key and not empty)
        if (translated && translated !== key && translated.trim() !== '') {
          return translated;
        }
        return null;
      } catch {
        // Translation key doesn't exist - next-intl throws error for missing keys
        // Silently catch and return null to use fallback formatting
        return null;
      }
    };

    // Auto-generate breadcrumb for known static routes only
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

      // Try breadcrumb translations first
      const translationKey = path.replace(/-/g, '');
      const breadcrumbTranslation = safeTranslate(t, translationKey);

      if (breadcrumbTranslation) {
        label = breadcrumbTranslation;
      } else {
        // If breadcrumb translation fails, try navbar translations
        const navbarTranslation = safeTranslate(tNavbar, path);
        if (navbarTranslation) {
          label = navbarTranslation;
        } else {
          // If all translations fail, format path as label
          // (capitalize first letter, replace hyphens with spaces)
          label = path
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }

      result.push({
        label,
        href: currentPath,
      });
    });

    return result;
  }, [pathname, items, contextItems, t, tNavbar, locale]);

  // Hide breadcrumb on home page or if no items
  if (pathname === '/' || breadcrumbItems.length === 0) {
    return null;
  }

  const defaultSeparator = <span className='text-[#215778] mx-1'>/</span>;

  return (
    <nav aria-label='Breadcrumb' className={cn('bg-[#EBF4F9] py-3', className)}>
      <Container className=' mx-auto px-2 md:px-4'>
        <ol className='flex items-center space-x-1 text-sm overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide'>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <li
                key={item.href}
                className='flex items-center min-w-0 flex-shrink whitespace-nowrap'
              >
                {index > 0 && (
                  <span className='flex-shrink-0'>
                    {separator || defaultSeparator}
                  </span>
                )}
                {isLast ? (
                  <Text
                    variant='body'
                    className='text-[#215778] font-medium truncate whitespace-nowrap'
                    aria-current='page'
                    size='sm'
                  >
                    {item.label}
                  </Text>
                ) : (
                  <Link
                    href={buildHref(item.href)}
                    className='text-[#215778] hover:text-[#3691C9] transition-colors truncate min-w-0 whitespace-nowrap'
                  >
                    <Text
                      variant='body'
                      size='sm'
                      className='text-[#215778] truncate whitespace-nowrap'
                    >
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
