'use client';

import { cn, Heading } from '@ktbiotech/system-design';
import Image from 'next/image';

interface BlogHeroProps {
  title: string;
  imageUrl: string;
  imageAlt?: string;
  className?: string;
}

export default function BlogHero({
  title,
  imageUrl,
  imageAlt,
  className,
}: BlogHeroProps) {
  return (
    <section className={cn('w-full mb-8', className)}>
      <div className='container mx-auto px-6 md:px-8'>
        {/* Large light gray container */}
        <div className=' overflow-hidden'>
          {/* Title at top - centered */}
          <div className='p-6 md:p-8'>
            <Heading
              level={1}
              className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center'
            >
              {title}
            </Heading>
          </div>

          {/* Hero Image - full width inside gray container */}
          <div className='w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl lg:h-[500px] relative'>
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
