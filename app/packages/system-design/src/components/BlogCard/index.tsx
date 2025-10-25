import { cn } from '../../utils';
import { ChevronRightLargeIcon } from '../Icons';
import ImageWithBadge from '../ImageWithBadge';
import { Link, Text } from '../Typography';

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
  className,
  imageClassName,
  priority: _priority = false,
  direction = 'row',
}: BlogCardProps) {
  return (
    <article
      className={cn(
        ' duration-300',
        className,
        direction === 'column' && 'px-4'
      )}
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
                ? 'w-full h-full'
                : 'w-full sm:w-48 h-32 sm:h-36',
              imageClassName
            )}
            priority={_priority}
          />
        </div>

        {/* Content - Right side */}
        <div className='flex-1 '>
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
            by<span className=' text-[#4B5053]'> {author}</span> on{' '}
            <span className=' text-[#4B5053]'>{date}</span>
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
            className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm'
          >
            See All
            <ChevronRightLargeIcon className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />
          </Link>
        </div>
      </div>
    </article>
  );
}
