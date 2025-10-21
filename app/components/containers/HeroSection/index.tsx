'use client';

import {
  Button,
  ChevronRightLargeIcon,
  cn,
  Container,
  Heading,
  SidebarMenu,
  Text,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundImage?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  buttonLabel,
  buttonHref,
  backgroundImage = '/images/hero.png',
  className,
}) => {
  const t = useTranslations('hero');

  // Default content from translations
  const defaultTitle = title || t('title');
  const defaultSubtitle = subtitle || t('subtitle');
  const defaultDescription = description || t('description');
  const defaultButtonLabel = buttonLabel || t('buttonLabel');
  const defaultButtonHref = buttonHref || t('buttonHref');

  return (
    <Container>
      <section className='grid grid-cols-[250px_1fr] mt-5 gap-4'>
        <SidebarMenu activeItem='category' />
        <div
          className={cn(
            'relative w-full max-w-full h-[505px] overflow-hidden rounded-2xl',
            className
          )}
        >
          {/* Background Image */}
          <div className='absolute inset-0'>
            <div className='relative w-full h-full'>
              <Image
                src={backgroundImage}
                alt='Laboratory background'
                fill
                className='object-cover'
                priority
              />
              {/* Bottom Gradient */}
              <div
                className='absolute bottom-0 left-0 right-0 h-full'
                style={{
                  background:
                    'linear-gradient(to top, #F7FBFD 0%, #F7FBFD00 100%)',
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className='relative z-10 h-full flex items-end'>
            <div className='max-w-[70%] px-12 py-8'>
              {/* Company Name */}
              <Heading
                level={2}
                className=' !text-[28px] font-normal mb-2'
                color='#4B5053'
              >
                {defaultTitle}
              </Heading>

              {/* Brand Name */}
              <Heading
                level={1}
                className=' text-3xl md:text-4xl lg:!text-5xl font-bold mb-6 leading-tight'
                color='#215778'
              >
                {defaultSubtitle}
              </Heading>

              {/* Description */}
              <Text
                className='text-white text-lg leading-relaxed mb-4'
                lineClamp={3}
                color='#4B5053'
              >
                {defaultDescription}
              </Text>

              {/* CTA Button */}
              <Link href={defaultButtonHref}>
                <Button
                  variant='default'
                  size='lg'
                  className='bg-[#3691C9] hover:bg-[#2a7ba3] text-white px-8 py-3 text-lg font-medium'
                >
                  {defaultButtonLabel}{' '}
                  <ChevronRightLargeIcon className='w-6 h-6' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HeroSection;
