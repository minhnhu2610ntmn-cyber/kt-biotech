'use client';

import { usePathname, useRouter as useNextRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { cn } from '../../utils';
import { UnitedKingdomCircleFlagIcon, VietnamCircleFlagIcon } from '../Icons';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

// Cookie name used by next-intl middleware
const NEXT_INTL_COOKIE_NAME = 'NEXT_LOCALE';

export function LanguageSwitcher({
  className,
  variant = 'default',
}: LanguageSwitcherProps) {
  const router = useNextRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);

  // Default locale (vi) doesn't have prefix
  const defaultLocale = 'vi';

  const options = [
    { value: 'vi', label: 'Tiếng Việt', flag: VietnamCircleFlagIcon },
    { value: 'en', label: 'English', flag: UnitedKingdomCircleFlagIcon },
  ];

  // Update current locale when locale changes
  useEffect(() => {
    setCurrentLocale(locale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // Set locale cookie for next-intl middleware
  const setLocaleCookie = (newLocale: string) => {
    if (typeof document === 'undefined') return;
    const maxAge = 365 * 24 * 60 * 60; // 1 year
    document.cookie = `${NEXT_INTL_COOKIE_NAME}=${newLocale}; path=/; max-age=${maxAge}; SameSite=Lax`;
  };

  const switchLanguage = (newLocale: string) => {
    // Supported locales
    const supportedLocales = ['vi', 'en'];

    // Get actual pathname from window.location if available, otherwise use hook
    const actualPathname =
      typeof window !== 'undefined' ? window.location.pathname : pathname;

    // Get current locale from pathname (first segment)
    const pathSegments = actualPathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0] || '';
    const isCurrentLocaleInPath = supportedLocales.includes(firstSegment);

    // Remove current locale from pathname if it exists
    let pathnameWithoutLocale = actualPathname;
    if (isCurrentLocaleInPath) {
      // Remove locale prefix - handle both /en and /en/... cases
      pathnameWithoutLocale =
        actualPathname.replace(`/${firstSegment}`, '') || '/';
    }

    // Ensure pathnameWithoutLocale starts with /
    if (!pathnameWithoutLocale || pathnameWithoutLocale === '') {
      pathnameWithoutLocale = '/';
    }
    if (!pathnameWithoutLocale.startsWith('/')) {
      pathnameWithoutLocale = `/${pathnameWithoutLocale}`;
    }

    // Build new path with locale prefix
    // Default locale (vi) doesn't have prefix
    let newPath: string;
    if (newLocale === defaultLocale) {
      // For default locale, no prefix - just use pathnameWithoutLocale
      // If pathnameWithoutLocale is empty or just '/', use '/'
      newPath = pathnameWithoutLocale === '/' ? '/' : pathnameWithoutLocale;
    } else {
      // For non-default locale, add prefix
      // If pathnameWithoutLocale is '/', just use /en
      // Otherwise use /en/path
      newPath =
        pathnameWithoutLocale === '/'
          ? `/${newLocale}`
          : `/${newLocale}${pathnameWithoutLocale}`;
    }

    // Debug logging
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.log('Language switch:', {
        currentLocale: locale,
        newLocale,
        actualPathname,
        pathnameWithoutLocale,
        newPath,
      });
    }

    // Set locale cookie BEFORE navigation to ensure middleware respects the new locale
    setLocaleCookie(newLocale);

    // Use window.location.href for navigation (not replace to allow back button)
    if (typeof window !== 'undefined') {
      window.location.href = newPath;
    } else {
      // Fallback to router
      router.push(newPath);
      router.refresh();
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {options.map(option => {
          const FlagIcon = option.flag;
          const isActive = currentLocale === option.value;

          return (
            <button
              key={option.value}
              onClick={() => switchLanguage(option.value)}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer',
                isActive
                  ? 'border-2 border-[#245575] bg-white shadow-sm'
                  : 'bg-white hover:shadow-sm'
              )}
              title={option.label}
            >
              <FlagIcon width={20} height={20} />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {options.map(option => {
        const FlagIcon = option.flag;
        const isActive = currentLocale === option.value;

        return (
          <button
            key={option.value}
            onClick={() => switchLanguage(option.value)}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer',
              isActive
                ? 'border-2 border-[#245575] bg-white shadow-sm'
                : 'bg-white hover:shadow-sm'
            )}
            title={option.label}
          >
            <FlagIcon width={24} height={24} />
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
