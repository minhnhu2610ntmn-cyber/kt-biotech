'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '../../utils';
import { UnitedKingdomCircleFlagIcon, VietnamCircleFlagIcon } from '../Icons';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageSwitcher({
  className,
  variant = 'default',
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('vi');

  const options = [
    { value: 'vi', label: 'Tiếng Việt', flag: VietnamCircleFlagIcon },
    { value: 'en', label: 'English', flag: UnitedKingdomCircleFlagIcon },
  ];

  // Get locale from cookie and set html lang attribute on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Get locale from cookie
      const getCookieValue = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };

      const locale = getCookieValue('NEXT_LOCALE') || 'vi';
      document.documentElement.lang = locale;
      setCurrentLocale(locale);
    }
  }, []);

  const switchLanguage = (newLocale: string) => {
    // Set locale cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Update html lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }

    // Update local state
    setCurrentLocale(newLocale);

    // Use router refresh to update the page with new locale
    router.refresh();
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
              <FlagIcon
                style={{ borderRadius: '100%' }}
                width={20}
                height={20}
              />
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
