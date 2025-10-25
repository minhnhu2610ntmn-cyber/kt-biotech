'use client';

import { cn, Link, Text } from '@ktbiotech/system-design';
import Image from 'next/image';

export interface RecruitmentCardProps {
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export default function RecruitmentCard({
  imageSrc,
  imageAlt,
  date,
  title,
  description,
  href = '#',
  className,
  imageClassName,
  priority = false,
}: RecruitmentCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block rounded-xl bg-white  hover:shadow-sm transition-shadow duration-300 overflow-hidden',
        className
      )}
    >
      <div className='relative w-full h-48 bg-gray-300'>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={cn('object-cover', imageClassName)}
          priority={priority}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        {/* Optional: Badge overlay if needed, similar to BlogCard */}
        {/* <div className='absolute top-4 right-4'>
          <div className='w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold'>
            TD
          </div>
        </div> */}
      </div>
      <div className='p-4'>
        <Text color='#7C8388' className='text-xs mb-1'>
          {date}
        </Text>
        <Text
          color='#1B1C1D'
          className='!text-lg font-semibold mb-2 line-clamp-2'
        >
          {title}
        </Text>
        <Text color='#636A6E' className='text-sm line-clamp-3'>
          {description}
        </Text>
      </div>
    </Link>
  );
}
