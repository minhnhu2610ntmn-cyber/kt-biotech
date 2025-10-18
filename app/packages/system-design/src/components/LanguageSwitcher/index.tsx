'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils';
import { useRouter } from 'next/navigation';

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
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'vi', label: '🇻🇳 Tiếng Việt' },
    { value: 'en', label: '🇺🇸 English' },
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
    setIsOpen(false);

    // Use router refresh to update the page with new locale
    router.refresh();
  };

  const currentOption = options.find(option => option.value === currentLocale);

  if (variant === 'compact') {
    return (
      <div className={cn('relative', className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer w-32'
        >
          <span className='truncate'>{currentOption?.label}</span>
          <ChevronDown className='h-4 w-4 flex-shrink-0' />
        </button>

        {isOpen && (
          <div className='absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-200 z-50'>
            <div className='py-1'>
              {options.map(option => (
                <button
                  key={option.value}
                  onClick={() => switchLanguage(option.value)}
                  className={cn(
                    'w-full text-left px-4 py-2 text-sm transition-colors duration-200',
                    currentLocale === option.value
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors duration-200 cursor-pointer w-40'
      >
        <span className='truncate'>{currentOption?.label}</span>
        <ChevronDown className='h-4 w-4 flex-shrink-0' />
      </button>

      {isOpen && (
        <div className='absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50'>
          <div className='py-1'>
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => switchLanguage(option.value)}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm transition-colors duration-200',
                  currentLocale === option.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
