'use client';

import React, { ReactNode } from 'react';
import {
  Autoplay,
  EffectCoverflow,
  EffectFade,
  Navigation,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '../../utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface SliderV2Props {
  children: ReactNode[];
  className?: string;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean | { delay: number; disableOnInteraction?: boolean };
  navigation?: boolean;
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
  // V2 specific props
  showProgressBar?: boolean;
  customNavigation?: boolean;
  navigationPosition?: 'inside' | 'outside';
  navigationStyle?: 'default' | 'minimal' | 'modern';
  autoHeight?: boolean;
  freeMode?: boolean;
  freeModeSticky?: boolean;
  mousewheel?: boolean;
  keyboard?: boolean;
  parallax?: boolean;
}

export function SliderV2({
  children,
  className,
  slidesPerView = 1,
  spaceBetween = 30,
  loop = false,
  autoplay = false,
  navigation = true,
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
  // V2 specific props
  showProgressBar = false,
  customNavigation = false,
  autoHeight = false,
  freeMode = false,
  freeModeSticky = false,
  mousewheel = false,
  keyboard = true,
  parallax = false,
}: SliderV2Props) {
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null);
  const [, setForceUpdate] = React.useState(0);
  const [, setActiveIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

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
    autoHeight,
    freeMode,
    freeModeSticky,
    mousewheel,
    keyboard: keyboard ? { enabled: true } : false,
    parallax,
    onSlideChange: (swiper: any) => {
      setActiveIndex(swiper.activeIndex);
      setForceUpdate(prev => prev + 1); // Force re-render

      // Calculate progress
      if (showProgressBar && swiper.slides.length > 0) {
        const progressValue =
          (swiper.activeIndex / (swiper.slides.length - 1)) * 100;
        setProgress(progressValue);
      }

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
      {/* Progress Bar */}
      {showProgressBar && (
        <div className='w-full bg-gray-200 rounded-full h-1 mb-4'>
          <div
            className='bg-blue-600 h-1 rounded-full transition-all duration-300 ease-out'
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

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
      {navigation && customNavigation && (
        <div className='flex justify-center items-center mt-6 space-x-3'>
          <button
            className={cn(
              'slider-button-prev flex items-center justify-start pl-2 w-12 h-8 rounded-full transition-all duration-200',
              swiperInstance?.isBeginning
                ? 'bg-gray-100 border border-gray-300 cursor-not-allowed'
                : 'bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer'
            )}
            aria-label='Previous slide'
            onClick={goToPrev}
            disabled={swiperInstance?.isBeginning}
          >
            <svg
              className={cn(
                'w-4 h-4',
                swiperInstance?.isBeginning ? 'text-gray-400' : 'text-gray-600'
              )}
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
            className={cn(
              'slider-button-next flex items-center justify-end pr-2 w-12 h-8 rounded-full transition-all duration-200',
              swiperInstance?.isEnd
                ? 'bg-gray-100 border border-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            )}
            aria-label='Next slide'
            onClick={goToNext}
            disabled={swiperInstance?.isEnd}
          >
            <svg
              className={cn(
                'w-4 h-4',
                swiperInstance?.isEnd ? 'text-gray-400' : 'text-white'
              )}
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
        </div>
      )}
    </div>
  );
}

// V2 Preset configurations for common use cases
export const SliderV2Presets = {
  // Hero banner slider with progress bar
  hero: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    autoplay: false,
    navigation: true,
    effect: 'slide' as const,
    grabCursor: true,
    allowTouchMove: true,
    showProgressBar: true,
    customNavigation: true,
    navigationStyle: 'modern' as const,
  },

  // Enhanced product carousel
  productCarousel: {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    navigation: true,
    grabCursor: true,
    allowTouchMove: true,
    customNavigation: true,
    navigationStyle: 'modern' as const,
    navigationPosition: 'outside' as const,
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 15 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
      1280: { slidesPerView: 4, spaceBetween: 20 },
    },
  },

  // Enhanced testimonial slider
  testimonial: {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 4000 },
    navigation: true,
    centeredSlides: true,
    grabCursor: true,
    allowTouchMove: true,
    customNavigation: true,
    navigationStyle: 'minimal' as const,
    autoHeight: true,
  },

  // Enhanced image gallery
  gallery: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: true,
    effect: 'coverflow' as const,
    centeredSlides: true,
    grabCursor: true,
    allowTouchMove: true,
    customNavigation: true,
    navigationStyle: 'modern' as const,
    keyboard: true,
    mousewheel: true,
  },

  // Enhanced fade effect slider
  fade: {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    navigation: true,
    effect: 'fade' as const,
    grabCursor: true,
    allowTouchMove: true,
    customNavigation: true,
    navigationStyle: 'minimal' as const,
    showProgressBar: true,
  },

  // Enhanced partners carousel
  partners: {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: true,
    grabCursor: true,
    allowTouchMove: true,
    customNavigation: true,
    navigationStyle: 'modern' as const,
    navigationPosition: 'inside' as const,
    freeMode: true,
    freeModeSticky: true,
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 15 },
      640: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 25 },
      1280: { slidesPerView: 5, spaceBetween: 30 },
    },
  },

  // Free mode carousel
  freeMode: {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: false,
    navigation: false,
    grabCursor: true,
    allowTouchMove: true,
    freeMode: true,
    freeModeSticky: true,
    mousewheel: true,
    keyboard: true,
  },
};

export default SliderV2;
