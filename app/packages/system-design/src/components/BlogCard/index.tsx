import { cn } from '../../utils';
import { ChevronRightLargeIcon } from '../Icons';
import ImageWithBadge from '../ImageWithBadge';
import { Heading, Link, Text } from '../Typography';

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
        ' hover:shadow-sm transition-shadow duration-300',
        className,
        direction === 'column' && 'px-4'
      )}
    >
      <div
        className={cn(
          'flex gap-4',
          direction === 'row' && 'flex-row',
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
              direction === 'column' ? 'w-full h-full' : 'w-48 h-36',
              imageClassName
            )}
            priority={_priority}
          />
        </div>

        {/* Content - Right side */}
        <div className='flex-1 '>
          {/* Title */}
          <Heading
            level={3}
            color='#1B1C1D'
            className='!text-lg font-semibold mb-1 line-clamp-2'
          >
            {title}
          </Heading>

          {/* Author and Date */}
          <Text color='#7C8388' className='!text-sm mb-3'>
            by<span className=' text-[#4B5053]'> {author}</span> on{' '}
            <span className=' text-[#4B5053]'>{date}</span>
          </Text>

          {/* Description */}
          <Text color='#636A6E' className='!text-sm mb-4 pr-4' lineClamp={3}>
            {description}
          </Text>

          {/* Read More Link */}
          <Link
            href={href}
            className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm'
          >
            See All
            <ChevronRightLargeIcon className='w-4 h-4 ml-1' />
          </Link>
        </div>
      </div>
    </article>
  );
}
