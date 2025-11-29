'use client';

import {
  Button,
  Container,
  Heading,
  Text,
  Timeline,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function TechnologySection() {
  const t = useTranslations('homepage.technology');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const timelineItems = [
    {
      id: 1,
      title: 'Tiêu đề công nghệ 1',
      description:
        'Tiêu đề công nghệ - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/02/2025',
    },
    {
      id: 2,
      title: 'Tiêu đề công nghệ 2',
      description:
        'fake 1 text - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/03/2025',
    },
    {
      id: 3,
      title: 'Tiêu đề công nghệ 3',
      description:
        'fake 2 text - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/04/2025',
    },
    {
      id: 4,
      title: 'Tiêu đề công nghệ 4',
      description:
        'fake 3 text - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/05/2025',
    },
  ];

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

  return (
    <Container className='max-w-screen'>
      <section ref={sectionRef} className='py-8 px-4 xl:px-0 xl:py-16 '>
        <div className=' px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
            {/* Left Column - Timeline */}
            <div
              className={`flex flex-col order-2 lg:order-1 transition-all duration-800 ease-out delay-200 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
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
                  <div className='flex items-center justify-center gap-4'>
                    <Button
                      variant='outline'
                      size='lg'
                      onClick={handlePrev}
                      disabled={isFirstItem}
                      className={`rounded-lg border-gray-300 ${
                        isFirstItem
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-50'
                      }`}
                      aria-label='Previous milestone'
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M10 12L6 8L10 4'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Button>
                    <Button
                      variant='default'
                      size='lg'
                      onClick={handleNext}
                      disabled={isLastItem}
                      className={`rounded-lg bg-[#86BDDF] hover:bg-[#6BA3C7] ${
                        isLastItem ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label='Next milestone'
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M6 4L10 8L6 12'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              ) : (
                /* Desktop View: List of all timeline items */
                <div className='relative space-y-4'>
                  {timelineItems.map((item, index) => (
                    <div
                      key={item.id}
                      ref={el => {
                        itemRefs.current[index] = el;
                      }}
                      data-index={index}
                      className={`transition-all duration-600 ease-out ${
                        visibleItems.has(index)
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <Timeline items={[item]} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Content */}
            <div
              className={`flex flex-col gap-10 order-1 lg:order-2 transition-all duration-800 ease-out delay-400 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <Heading
                level={2}
                color='#215778'
                className={`font-bold !text-2xl text-center xl:text-left underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {t('title')}
              </Heading>

              {/* Large Placeholder Box */}
              <div
                className={`w-full h-64 bg-[#DDEBF7] rounded-lg transition-all duration-600 ease-out delay-600 hover:scale-105 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              ></div>

              {/* Description Text */}
              <Text
                color='#333333'
                className={`text-base leading-relaxed transition-all duration-600 ease-out delay-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {t('description')}
              </Text>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
