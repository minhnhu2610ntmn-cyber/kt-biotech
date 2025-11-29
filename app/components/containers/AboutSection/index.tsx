'use client';

import {
  ChevronRightIcon,
  Container,
  Heading,
  Link,
  Text,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface AboutItem {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
}

interface AboutSectionProps {
  items?: AboutItem[];
  title?: string;
}

export default function AboutSection({ items = [], title }: AboutSectionProps) {
  const t = useTranslations('common');
  const tBreadcrumb = useTranslations('breadcrumb');
  const router = useRouter();
  const pageTitle = title || tBreadcrumb('gioithieuchung');
  const displayItems = items.length > 0 ? items : [];
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

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
              {pageTitle.toUpperCase()}
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
              className={`transition-all duration-700 ease-out ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {isMobile ? (
                /* Mobile Card Design - Horizontal Layout */
                <article
                  className='lg:hidden flex gap-3 cursor-pointer group rounded-lg overflow-hidden'
                  onClick={() => item.link && router.push(item.link)}
                >
                  {/* Image - Left (1/3) */}
                  <div className='flex-shrink-0 w-1/3 relative'>
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={120}
                        height={120}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-300 rounded-lg flex items-center justify-center'>
                        <Text variant='caption' color='muted' className='text-xs'>
                          Image
                        </Text>
                      </div>
                    )}
                  </div>

                  {/* Content - Right (2/3) */}
                  <div className='flex-1 flex flex-col justify-between py-1'>
                    {/* Title */}
                    <Heading
                      level={4}
                      color='#1B1C1D'
                      className='!text-base !font-[700] mb-2 line-clamp-2'
                    >
                      {item.title}
                    </Heading>

                    {/* Description - Truncated */}
                    <Text
                      variant='caption'
                      color='#7C8388'
                      className='text-xs mb-2 line-clamp-2'
                    >
                      {item.description}
                    </Text>

                    {/* View All Link */}
                    {item.link && (
                      <Link
                        href={item.link}
                        className='inline-flex items-center gap-1 !text-[#3691C9] hover:!text-[#3691C9] font-medium text-xs !underline-none !no-underline whitespace-nowrap'
                      >
                        <div className='flex items-center gap-1'>
                          <span>{t('viewAll')}</span>
                          <ChevronRightIcon
                            fill='#3691C9'
                            className='w-3 h-3 flex-shrink-0'
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                </article>
              ) : (
                /* Desktop Layout - Original Design */
                <div className='hidden lg:flex flex-row gap-8 items-center'>
                  {/* Image */}
                  <div className='w-1/2'>
                    {item.imageUrl ? (
                      <div
                        className={`relative rounded-lg h-80 overflow-hidden transition-all duration-500 ease-out ${
                          visibleItems.has(index)
                            ? 'scale-100 opacity-100'
                            : 'scale-95 opacity-70'
                        }`}
                        style={{
                          transitionDelay: `${index * 150 + 200}ms`,
                        }}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className='object-cover'
                          sizes='(max-width: 1024px) 100vw, 50vw'
                        />
                      </div>
                    ) : (
                      <div
                        className={`bg-gray-300 rounded-lg h-80 flex items-center justify-center transition-all duration-500 ease-out ${
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
                  <div className='w-1/2'>
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
                        className='inline-flex items-center text-[#1092e3] hover:text-[#1092e3] font-medium transition-colors'
                      >
                        {t('viewAll')}
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
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
