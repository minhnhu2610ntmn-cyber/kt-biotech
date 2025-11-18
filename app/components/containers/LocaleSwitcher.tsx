'use client';

import { usePathname, useRouter } from '../../utils/link';
import { useLocale } from 'next-intl';
import {
  UnitedKingdomCircleFlagIcon,
  VietnamCircleFlagIcon,
} from '@ktbiotech/system-design';
import { cn } from '@ktbiotech/system-design';

interface LocaleSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function LocaleSwitcher({
  className,
  variant = 'default',
}: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const options = [
    { value: 'vi', label: 'Tiếng Việt', flag: VietnamCircleFlagIcon },
    { value: 'en', label: 'English', flag: UnitedKingdomCircleFlagIcon },
  ];

  const switchLanguage = (newLocale: string) => {
    // Use next-intl router to switch locale
    // This will automatically handle locale prefix
    router.push(pathname, { locale: newLocale });
  };

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {options.map(option => {
          const FlagIcon = option.flag;
          const isActive = locale === option.value;

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
        const isActive = locale === option.value;

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
