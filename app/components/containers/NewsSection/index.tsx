'use client';

import { BlogCard, Container, Heading } from '@ktbiotech/system-design';
import { useEffect, useRef, useState } from 'react';

export default function NewsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    const cardObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            );
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) {
        cardObserver.observe(ref);
      }
    });

    return () => cardObserver.disconnect();
  }, []);

  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'Where does it come from?',
      author: 'Geogle Brown',
      date: 'Mar 8, 2022',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      imageSrc:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      imageAlt: 'Research blog image',
      badgeText: 'Blog nghiên cứu',
      badgeBackgroundColor: '#F0F0F0',
      badgeTextColor: '#1B1C1D',
      badgeArrowColor: '#808080',
      href: '/blog/research-1',
    },
    {
      id: 2,
      title: 'Where does it come from?',
      author: 'Geogle Brown',
      date: 'Mar 8, 2022',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      imageSrc:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      imageAlt: 'Company news image',
      badgeText: 'Tin Công Ty',
      badgeBackgroundColor: '#FFE4B5',
      badgeTextColor: '#1B1C1D',
      badgeArrowColor: '#FFA500',
      href: '/blog/company-news-1',
    },
    {
      id: 3,
      title: 'Where does it come from?',
      author: 'Geogle Brown',
      date: 'Mar 8, 2022',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      imageSrc:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      imageAlt: 'Knowledge image',
      badgeText: 'Kiến thức',
      badgeBackgroundColor: '#E6F3FF',
      badgeTextColor: '#1B1C1D',
      badgeArrowColor: '#4A90E2',
      href: '/blog/knowledge-1',
    },
  ];

  return (
    <section ref={sectionRef} className='py-8 sm:py-16 bg-gray-50'>
      <Container>
        {/* Section Title */}
        <Heading
          level={2}
          color='#215778'
          className={`text-center mb-6 sm:mb-12 font-bold text-xl sm:text-2xl lg:text-3xl underline decoration-[#215778] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          TIN TỨC
        </Heading>

        {/* Blog Cards Grid - Mobile: Single Column, Desktop: Two Columns */}
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 pl-3 pr-2 lg:pr-0 lg:pl-0'>
          {/* Featured Article (Mobile: First, Desktop: Left) */}
          <div
            ref={el => (cardRefs.current[0] = el)}
            data-index={0}
            className={`w-full lg:flex-1 transition-all duration-600 ease-out delay-400 ${
              visibleCards.has(0)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <BlogCard
              direction='column'
              title={blogPosts[0].title}
              author={blogPosts[0].author}
              date={blogPosts[0].date}
              description={blogPosts[0].description}
              imageSrc={blogPosts[0].imageSrc}
              imageAlt={blogPosts[0].imageAlt}
              badgeText={blogPosts[0].badgeText}
              badgeBackgroundColor={blogPosts[0].badgeBackgroundColor}
              badgeTextColor={blogPosts[0].badgeTextColor}
              badgeArrowColor={blogPosts[0].badgeArrowColor}
              href={blogPosts[0].href}
            />
          </div>

          {/* Side Articles (Mobile: Below Featured, Desktop: Right Column) */}
          <div className='w-full lg:flex-1 flex flex-col gap-4 sm:gap-6'>
            <div
              ref={el => (cardRefs.current[1] = el)}
              data-index={1}
              className={`transition-all duration-600 ease-out delay-600 ${
                visibleCards.has(1)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <BlogCard
                title={blogPosts[1].title}
                author={blogPosts[1].author}
                date={blogPosts[1].date}
                description={blogPosts[1].description}
                imageSrc={blogPosts[1].imageSrc}
                imageAlt={blogPosts[1].imageAlt}
                badgeText={blogPosts[1].badgeText}
                badgeBackgroundColor={blogPosts[1].badgeBackgroundColor}
                badgeTextColor={blogPosts[1].badgeTextColor}
                badgeArrowColor={blogPosts[1].badgeArrowColor}
                href={blogPosts[1].href}
              />
            </div>

            <div
              ref={el => (cardRefs.current[2] = el)}
              data-index={2}
              className={`transition-all duration-600 ease-out delay-800 ${
                visibleCards.has(2)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <BlogCard
                title={blogPosts[2].title}
                author={blogPosts[2].author}
                date={blogPosts[2].date}
                description={blogPosts[2].description}
                imageSrc={blogPosts[2].imageSrc}
                imageAlt={blogPosts[2].imageAlt}
                badgeText={blogPosts[2].badgeText}
                badgeBackgroundColor={blogPosts[2].badgeBackgroundColor}
                badgeTextColor={blogPosts[2].badgeTextColor}
                badgeArrowColor={blogPosts[2].badgeArrowColor}
                href={blogPosts[2].href}
              />
            </div>

            <div
              ref={el => (cardRefs.current[3] = el)}
              data-index={3}
              className={`transition-all duration-600 ease-out delay-1000 ${
                visibleCards.has(3)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <BlogCard
                title={blogPosts[2].title}
                author={blogPosts[2].author}
                date={blogPosts[2].date}
                description={blogPosts[2].description}
                imageSrc={blogPosts[2].imageSrc}
                imageAlt={blogPosts[2].imageAlt}
                badgeText={blogPosts[2].badgeText}
                badgeBackgroundColor={blogPosts[2].badgeBackgroundColor}
                badgeTextColor={blogPosts[2].badgeTextColor}
                badgeArrowColor={blogPosts[2].badgeArrowColor}
                href={blogPosts[2].href}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
