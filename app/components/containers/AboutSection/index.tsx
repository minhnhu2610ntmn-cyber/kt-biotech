'use client';

import { Container, Heading, Text } from '@ktbiotech/system-design';
import { useEffect, useRef, useState } from 'react';

interface AboutItem {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
}

interface AboutSectionProps {
  items?: AboutItem[];
}

export default function AboutSection({ items = [] }: AboutSectionProps) {
  const displayItems = items.length > 0 ? items : [];
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Header observer
    const headerObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Items observers
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set([...prev, index]));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      headerObserver.disconnect();
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, [displayItems.length]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Container>
        {/* Header */}
        <div
          ref={el => {
            headerRef.current = el;
          }}
          className='pt-16 pb-8 px-4'
        >
          <div
            className={`transition-all duration-800 ease-out ${
              isHeaderVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            <Heading
              level={2}
              color='#215778'
              className='font-bold !text-2xl underline decoration-[#2C3E50] decoration-1 underline-offset-4'
            >
              GIỚI THIỆU CHUNG
            </Heading>
          </div>
        </div>

        {/* Items */}
        <div className='space-y-12 pb-16 px-4'>
          {displayItems.map((item, index) => (
            <div
              key={index}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className={`flex flex-col lg:flex-row gap-8 items-center transition-all duration-700 ease-out ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Image */}
              <div className='w-full lg:w-1/2'>
                {item.imageUrl ? (
                  <div
                    className={`rounded-lg h-64 lg:h-80 overflow-hidden transition-all duration-500 ease-out ${
                      visibleItems.has(index)
                        ? 'scale-100 opacity-100'
                        : 'scale-95 opacity-70'
                    }`}
                    style={{
                      transitionDelay: `${index * 150 + 200}ms`,
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ) : (
                  <div
                    className={`bg-gray-300 rounded-lg h-64 lg:h-80 flex items-center justify-center transition-all duration-500 ease-out ${
                      visibleItems.has(index)
                        ? 'scale-100 opacity-100'
                        : 'scale-95 opacity-70'
                    }`}
                    style={{
                      transitionDelay: `${index * 150 + 200}ms`,
                    }}
                  >
                    <Text variant='caption' color='muted' className='text-lg'>
                      Image Placeholder
                    </Text>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='w-full lg:w-1/2'>
                <div
                  className={`transition-all duration-500 ease-out ${
                    visibleItems.has(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 150 + 300}ms`,
                  }}
                >
                  <Heading level={3} color='#215778' className='mb-4 !text-2xl'>
                    {item.title}
                  </Heading>
                </div>
                <div
                  className={`transition-all duration-500 ease-out ${
                    visibleItems.has(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 150 + 400}ms`,
                  }}
                >
                  <Text variant='body' className='mb-6 leading-relaxed'>
                    {item.description}
                  </Text>
                </div>
                <div
                  className={`transition-all duration-500 ease-out ${
                    visibleItems.has(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 150 + 500}ms`,
                  }}
                >
                  <a
                    href={item.link}
                    className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors'
                  >
                    Xem tất cả
                    <svg
                      className='w-4 h-4 ml-1'
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
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
