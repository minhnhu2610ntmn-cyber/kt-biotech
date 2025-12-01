'use client';

import { cn, Heading } from '@ktbiotech/system-design';
import Image from 'next/image';

interface BlogHeroProps {
  title: string;
  imageUrl: string;
  imageAlt?: string;
  className?: string;
  isAboutPage?: boolean;
}

export default function BlogHero({
  title,
  imageUrl,
  imageAlt,
  className,
  isAboutPage = false,
}: BlogHeroProps) {
  return (
    <section className={cn('w-full mb-8', className)}>
      <div className=' mx-auto px-6 md:px-8'>
        {/* Large light gray container */}
        <div className=' overflow-hidden'>
          {/* Title at top */}
          <div
            className={cn(
              'py-6 md:py-8 px-6 md:px-8',
              isAboutPage && 'px-0 md:px-8'
            )}
          >
            <Heading
              level={1}
              className={cn(
                '!text-2xl md:!text-3xl lg:!text-4xl !font-bold',
                isAboutPage
                  ? '!text-left md:text-center underline underline-offset-4'
                  : 'text-center !text-gray-900'
              )}
              color={isAboutPage ? '#215778' : 'gray-900'}
              style={isAboutPage ? { color: '#215778' } : undefined}
            >
              {title}
            </Heading>
          </div>

          {/* Hero Image - full width inside gray container */}
          <div className='w-full h-[500px] md:h-[400px] overflow-hidden rounded-xl lg:h-[500px] relative'>
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className='object-cover rounded-xl'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
