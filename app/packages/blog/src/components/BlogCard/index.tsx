'use client';

import { ChevronRightIcon, cn, Link, Text } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ImageWithBadge from '../ImageWithBadge';

export interface BlogCardProps {
  title: string;
  author: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badgeText: string;
  badgeBackgroundColor?: string;
  badgeTextColor?: string;
  badgeArrowColor?: string;
  href?: string;
  slug?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  direction?: 'row' | 'column';
}

export default function BlogCard({
  title,
  author,
  date,
  description,
  imageSrc,
  imageAlt,
  badgeText,
  badgeBackgroundColor = '#FFD9BD',
  badgeTextColor = '#1B1C1D',
  badgeArrowColor = '#FE7B1B',
  href = '#',
  slug,
  className,
  imageClassName,
  priority: _priority = false,
  direction = 'row',
}: BlogCardProps) {
  const router = useRouter();
  const t = useTranslations('common');

  const handleCardClick = () => {
    const targetUrl = slug ? `/blogs/${slug}` : href;
    router.push(targetUrl);
  };
  return (
    <article
      className={cn(
        'duration-300 cursor-pointer hover:shadow-xl transition-shadow group rounded-xl',
        className,
        direction === 'column' && 'px-0 lg:px-0'
      )}
      onClick={handleCardClick}
    >
      <div
        className={cn(
          'flex gap-3 sm:gap-4',
          direction === 'row' && 'flex-col sm:flex-row',
          direction === 'column' && 'flex-col'
        )}
      >
        {/* Image with Badge - Left side */}
        <div className='flex-shrink-0'>
          <ImageWithBadge
            src={imageSrc}
            alt={imageAlt}
            width={direction === 'column' ? '100%' : 200}
            height={direction === 'column' ? '100%' : 150}
            badgeText={badgeText}
            badgeBackgroundColor={badgeBackgroundColor}
            badgeTextColor={badgeTextColor}
            badgeArrowColor={badgeArrowColor}
            imageClassName={cn(
              direction === 'column'
                ? 'w-full h-full group-hover:rounded-b-none'
                : 'w-full sm:w-48  ',
              imageClassName
            )}
            priority={_priority}
          />
        </div>

        {/* Content - Right side */}
        <div
          className={cn(
            'flex-1 ',
            direction === 'column'
              ? 'group-hover:px-4 transition-all duration-300 ease-out'
              : ''
          )}
        >
          {/* Title */}
          <Text
            color='#1B1C1D'
            className='!text-xl font-semibold mb-1 line-clamp-2'
            lineClamp={2}
          >
            {title}
          </Text>

          {/* Author and Date */}
          <Text color='#7C8388' className='text-xs sm:text-sm mb-2 sm:mb-3'>
            {t('by')}{' '}
            <span className=' text-[#7C8388] font-bold'>{author}</span>{' '}
            {t('on')} <span className=' text-[#7C8388]'>{date}</span>
          </Text>

          {/* Description */}
          <Text
            color='#636A6E'
            className='text-xs sm:text-sm mb-3 sm:mb-4 pr-0 sm:pr-4'
            lineClamp={3}
          >
            {description}
          </Text>

          {/* Read More Link */}
          <Link
            href={href}
            className='inline-flex !underline-none !no-underline hover:!underline items-center !text-[#3691C9] hover:!text-[#3691C9] font-medium text-xs sm:text-sm'
          >
            <div className='flex items-center gap-1'>
              <span className='text-[#3691C9]'>{t('viewAll')}</span>
              <ChevronRightIcon
                fill='#1092e3'
                className='w-3 h-3 sm:w-[14px] sm:h-[14px] text-[#3691C9]'
              />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
