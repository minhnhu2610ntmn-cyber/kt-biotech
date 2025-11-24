'use client';

import { Container, Heading, Text, Timeline } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function MilestonesSection() {
  const t = useTranslations('homepage.milestones');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 2,
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 3,
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 4,
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
  ];

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

              {/* Large Placeholder Box */}
              <div
                className={`w-full h-64 bg-[#DDEBF7] rounded-lg transition-all duration-600 ease-out delay-400 hover:scale-105 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              ></div>

              {/* Description Text */}
              <Text
                color='#333333'
                className={`text-base leading-relaxed transition-all duration-600 ease-out delay-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {t('description')}
              </Text>
            </div>

            {/* Right Column - Timeline */}
            <div
              className={`flex flex-col transition-all duration-800 ease-out delay-600 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
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
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
