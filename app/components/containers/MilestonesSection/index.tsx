'use client';

import { Container, Heading, Timeline } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { companyData, Milestone } from '../../../data/BeDayLichSuData';
import { sanitizeHtmlContent } from '../../../config/api';

export default function MilestonesSection() {
  const t = useTranslations('homepage.milestones');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto play for milestones
  useEffect(() => {
    if (!isVisible || isMobile || isPaused) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % companyData.beDayLichSu.milestones.length);
    }, 5000); // Change every 5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isVisible, isMobile, isPaused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const itemObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            );
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach(ref => {
      if (ref) {
        itemObserver.observe(ref);
      }
    });

    return () => itemObserver.disconnect();
  }, []);

  // Transform milestones data to timeline format with translations
  const timelineItems = companyData.beDayLichSu.milestones.map(
    (milestone: Milestone, index: number) => ({
      id: index + 1,
      title: t(`items.${milestone.id}.title`),
      description: t(`items.${milestone.id}.description`),
      details: t.raw(`items.${milestone.id}.details`),
      date: t(`items.${milestone.id}.title`),
      image: milestone.image,
      isActive: milestone.isActive,
    })
  );

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % timelineItems.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      prev => (prev - 1 + timelineItems.length) % timelineItems.length
    );
  };

  const activeItem = timelineItems[activeIndex];
  const isFirstItem = activeIndex === 0;
  const isLastItem = activeIndex === timelineItems.length - 1;

  // Debug: log activeItem details when activeIndex changes
  useEffect(() => {
    console.log('Active item changed:', activeIndex, activeItem.title);
    console.log('Details:', activeItem.details);
  }, [activeIndex, activeItem]);

  return (
    <Container>
      <section
        ref={sectionRef}
        className='py-8 px-4 xl:px-0 xl:py-16 bg-transparent'
      >
        <div className=' px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
            {/* Left Column - Content */}
            <div
              className={`flex flex-col gap-10 transition-all duration-800 ease-out delay-200 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <Heading
                level={2}
                color='#215778'
                className={`font-bold !text-2xl text-center xl:text-left underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-300 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {t('title')}
              </Heading>

              {/* Description & Placeholder - order reversed on mobile */}
              <div className='flex flex-col-reverse lg:flex-col gap-4'>
                {/* Large Placeholder Box - Show active milestone image */}
                {activeItem.image ? (
                  <div
                    className={`w-full h-64 rounded-lg transition-all duration-600 ease-out delay-400 overflow-hidden ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ) : (
                  <div
                    className={`w-full h-64 bg-[#DDEBF7] rounded-lg transition-all duration-600 ease-out delay-400 hover:scale-105 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  ></div>
                )}

                {/* Description Text - Show active milestone details */}
                <div
                  className={`text-base text-[#333333] transition-all duration-600 ease-out delay-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(activeItem.details) }}
                />
              </div>
            </div>

            {/* Right Column - Timeline */}
            <div
              className={`flex flex-col transition-all duration-800 ease-out delay-600 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              {isMobile ? (
                /* Mobile View: Progress Bar + Single Card + Navigation */
                <div className='w-full space-y-6'>
                  {/* Progress Bar */}
                  <div className='relative flex items-center justify-between px-2'>
                    {/* Progress Line */}
                    <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-[#86BDDF] -translate-y-1/2 z-0' />
                    <div
                      className='absolute top-1/2 left-0 h-0.5 bg-[#86BDDF] -translate-y-1/2 z-0 transition-all duration-300'
                      style={{
                        width: `${(activeIndex / (timelineItems.length - 1)) * 100}%`,
                      }}
                    />

                    {/* Progress Dots */}
                    {timelineItems.map((_, index) => (
                      <div
                        key={index}
                        className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          index <= activeIndex
                            ? 'bg-[#86BDDF] border-[#86BDDF]'
                            : 'bg-white border-[#86BDDF]'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Single Milestone Card */}
                  <div className='w-full'>
                    <Timeline items={[activeItem]} />
                  </div>

                  {/* Navigation Controls */}
                  <div className='flex items-center justify-center gap-3'>
                    <button
                      className={`flex items-center justify-start pl-1 w-16 h-8 rounded-full transition-all duration-200 ${
                        isFirstItem
                          ? 'bg-gray-100 border border-gray-300 cursor-not-allowed'
                          : 'bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer'
                      }`}
                      onClick={handlePrev}
                      disabled={isFirstItem}
                      aria-label='Previous milestone'
                    >
                      <svg
                        className={`w-5 h-5 scale-[1.2] ${isFirstItem ? 'text-gray-400' : 'text-gray-600'}`}
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
                      className={`flex items-center justify-end pr-1 w-16 h-8 rounded-full transition-all duration-200 ${
                        isLastItem
                          ? 'bg-gray-100 border border-gray-300 cursor-not-allowed'
                          : 'bg-[#3691C9] hover:bg-[#2a7ba3] cursor-pointer'
                      }`}
                      onClick={handleNext}
                      disabled={isLastItem}
                      aria-label='Next milestone'
                    >
                      <svg
                        className={`w-5 h-5 scale-[1.2] ${isLastItem ? 'text-gray-400' : 'text-white'}`}
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
                </div>
              ) : (
                /* Desktop View: List of all timeline items with equal width */
                <div
                  className='grid grid-cols-1 gap-4 w-full'
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {timelineItems.map((item, index) => (
                    <div
                      key={item.id}
                      ref={el => {
                        itemRefs.current[index] = el;
                      }}
                      data-index={index}
                      onClick={() => setActiveIndex(index)}
                      className={`transition-all duration-600 ease-out cursor-pointer ${
                        visibleItems.has(index)
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <Timeline items={[{ ...item, isActive: index === activeIndex }]} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
