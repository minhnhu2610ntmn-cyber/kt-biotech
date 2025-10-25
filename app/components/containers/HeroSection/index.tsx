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
import React, { useEffect, useRef, useState } from 'react';
import type { ProductCategory } from '../../../types/strapi';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundImage?: string;
  className?: string;
  productCategories?: ProductCategory[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  buttonLabel,
  buttonHref,
  backgroundImage = '/images/hero.png',
  className,
  productCategories = [],
}) => {
  const t = useTranslations('hero');
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Default content from translations
  const defaultTitle = title || t('title');
  const defaultSubtitle = subtitle || t('subtitle');
  const defaultDescription = description || t('description');
  const defaultButtonLabel = buttonLabel || t('buttonLabel');
  const defaultButtonHref = buttonHref || t('buttonHref');

  return (
    <Container className='px-4 sm:px-6'>
      <section
        ref={heroRef}
        className='grid grid-cols-1 lg:grid-cols-[250px_1fr] mt-5 gap-4'
      >
        <div
          className={`hidden lg:block transition-all duration-800 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <SidebarMenu
            activeItem='danh-muc'
            productCategories={productCategories}
          />
        </div>
        <div
          className={cn(
            'relative w-full max-w-full h-[400px] sm:h-[450px] lg:h-[505px] overflow-hidden rounded-2xl transition-all duration-800 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
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
            <div className='max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] px-4 sm:px-6 lg:px-12 py-6 sm:py-8'>
              {/* Company Name */}
              <Heading
                level={2}
                className={`text-lg sm:text-xl lg:!text-[28px] font-normal mb-2 transition-all duration-600 ease-out delay-100 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                color='#4B5053'
              >
                {defaultTitle}
              </Heading>

              {/* Brand Name */}
              <Heading
                level={1}
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:!text-5xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-600 ease-out delay-200 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                color='#215778'
              >
                {defaultSubtitle}
              </Heading>

              {/* Description */}
              <Text
                className={`text-white text-sm sm:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4 transition-all duration-600 ease-out delay-300 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
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
                  className={`bg-[#3691C9] hover:bg-[#2a7ba3] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium transition-all duration-600 ease-out delay-400 hover:scale-105 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {defaultButtonLabel}{' '}
                  <ChevronRightLargeIcon className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6' />
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
