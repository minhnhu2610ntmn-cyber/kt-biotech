'use client';

import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from 'swiper/modules';
import { cn } from '../../utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/a11y';

export interface SliderProps {
  children: ReactNode[];
  className?: string;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean | { delay: number; disableOnInteraction?: boolean };
  navigation?: boolean;
  pagination?: boolean | { clickable?: boolean; dynamicBullets?: boolean };
  effect?: 'slide' | 'fade' | 'coverflow';
  centeredSlides?: boolean;
  grabCursor?: boolean;
  touchRatio?: number;
  touchAngle?: number;
  simulateTouch?: boolean;
  allowTouchMove?: boolean;
  resistanceRatio?: number;
  loopAdditionalSlides?: number;
  loopFillGroupWithBlank?: boolean;
  breakpoints?: {
    [width: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
  onSlideChange?: (swiper: any) => void;
  onSwiper?: (swiper: any) => void;
}

export function Slider({
  children,
  className,
  slidesPerView = 1,
  spaceBetween = 30,
  loop = false,
  autoplay = false,
  navigation = true,
  pagination = true,
  effect = 'slide',
  centeredSlides = false,
  grabCursor = true,
  touchRatio = 1,
  touchAngle = 45,
  simulateTouch = true,
  allowTouchMove = true,
  resistanceRatio = 0.85,
  breakpoints,
  onSlideChange,
  onSwiper,
}: SliderProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null);
  const [, setForceUpdate] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Simple slides - no complex loop logic
  const slidesForLoop = children;

  // Navigation handlers - check swiper state directly
  const goToPrev = () => {
    if (swiperInstance && !swiperInstance.isBeginning) {
      swiperInstance.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperInstance && !swiperInstance.isEnd) {
      swiperInstance.slideNext();
    }
  };

  const goToSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  // Determine which modules to use
  const modules = [Navigation];

  if (autoplay) {
    modules.push(Autoplay);
  }

  if (effect === 'fade') {
    modules.push(EffectFade);
  }

  if (effect === 'coverflow') {
    modules.push(EffectCoverflow);
  }

  // Swiper configuration
  const swiperConfig: any = {
    modules,
    slidesPerView,
    spaceBetween,
    loop,
    centeredSlides,
    grabCursor,
    touchRatio,
    touchAngle,
    simulateTouch,
    allowTouchMove,
    resistanceRatio,
    breakpoints,
    onSlideChange: (swiper: any) => {
      setActiveIndex(swiper.activeIndex);
      setForceUpdate(prev => prev + 1); // Force re-render
      if (onSlideChange) {
        onSlideChange(swiper);
      }
    },
    onSwiper: (swiper: any) => {
      setSwiperInstance(swiper);
      if (onSwiper) {
        onSwiper(swiper);
      }
    },
  };

  // Add autoplay config if enabled
  if (autoplay) {
    swiperConfig.autoplay =
      typeof autoplay === 'boolean'
        ? { delay: 3000, disableOnInteraction: false }
        : autoplay;
  }

  // Add effect config
  if (effect === 'fade') {
    swiperConfig.effect = 'fade';
    swiperConfig.fadeEffect = {
      crossFade: true,
    };
  }

  if (effect === 'coverflow') {
    swiperConfig.effect = 'coverflow';
    swiperConfig.coverflowEffect = {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    };
  }

  return (
    <div className={cn('relative group', className)}>
      <Swiper
        {...swiperConfig}
        className='w-full h-full cursor-grab active:cursor-grabbing'
        style={{
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
      >
        {slidesForLoop.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {navigation && (
        <>
          <button
            className={`slider-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-all duration-200 ${
              swiperInstance?.isBeginning
                ? 'opacity-30 cursor-not-allowed bg-gray-300'
                : 'opacity-0 group-hover:opacity-100 cursor-pointer bg-white/80 hover:bg-white'
            }`}
            aria-label='Previous slide'
            onClick={goToPrev}
          >
            <svg
              className='w-6 h-6 text-gray-700'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            className={`slider-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-all duration-200 ${
              swiperInstance?.isEnd
                ? 'opacity-30 cursor-not-allowed bg-gray-300'
                : 'opacity-0 group-hover:opacity-100 cursor-pointer bg-white/80 hover:bg-white'
            }`}
            aria-label='Next slide'
            onClick={goToNext}
          >
            <svg
              className='w-6 h-6 text-gray-700'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </>
      )}

      {/* Custom Pagination */}
      {pagination && (
        <div className='flex justify-center mt-4 space-x-2'>
          {slidesForLoop.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-[6px] rounded-full cursor-pointer transition-all duration-300 ${
                activeIndex === index
                  ? 'w-10 bg-blue-600'
                  : 'w-4 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const SliderPresets = {
  // Hero banner slider
  hero: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    autoplay: false,
    navigation: true,
    pagination: true,
    effect: 'slide' as const,
    grabCursor: true,
    allowTouchMove: true,
  },

  // Product carousel
  productCarousel: {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    navigation: true,
    pagination: false,
    grabCursor: true,
    allowTouchMove: true,
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 15 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
      1280: { slidesPerView: 4, spaceBetween: 20 },
    },
  },

  // Testimonial slider
  testimonial: {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 4000 },
    navigation: true,
    pagination: true,
    centeredSlides: true,
    grabCursor: true,
    allowTouchMove: true,
  },

  // Image gallery
  gallery: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: true,
    pagination: { clickable: true, dynamicBullets: true },
    effect: 'coverflow' as const,
    centeredSlides: true,
    grabCursor: true,
    allowTouchMove: true,
  },

  // Fade effect slider
  fade: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    navigation: true,
    pagination: true,
    effect: 'fade' as const,
    grabCursor: true,
    allowTouchMove: true,
  },
};

export default Slider;
