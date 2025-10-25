'use client';

import { BlogCard, Container, Heading } from '@ktbiotech/system-design';
import { useEffect, useRef, useState } from 'react';
import { buildImageUrl, lightenColor } from '../../../config/api';
import type { Article } from '../../../types/strapi';

interface NewsSectionProps {
  latestArticles: Article[];
}

export default function NewsSection({ latestArticles }: NewsSectionProps) {
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

  // Transform API data to BlogCard format
  const transformArticleToBlogCard = (article: Article) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };

    return {
      id: article.id,
      title: article.title,
      author: article.author.name,
      date: formatDate(article.createdAt),
      description: article.description,
      imageSrc: buildImageUrl(article.cover?.url),
      imageAlt: article.title,
      badgeText: article.category.name,
      badgeBackgroundColor: lightenColor(article.category.color, 60),
      badgeTextColor: `#1B1C1D`,
      badgeArrowColor: article.category.color, // Full color
      href: `/blogs/${article.slug}`,
    };
  };

  // Use API data or fallback to mock data
  const blogPosts =
    latestArticles.length > 0
      ? latestArticles.map(transformArticleToBlogCard)
      : [
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
          {
            id: 4,
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
    <section ref={sectionRef} className='py-8 sm:py-16 bg-transparent'>
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
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 pl-3 pr-2 lg:pr-0 lg:pl-0 lg:items-stretch'>
          {/* Featured Article (Mobile: First, Desktop: Left) */}
          {blogPosts[0] && (
            <div
              ref={el => {
                cardRefs.current[0] = el;
              }}
              data-index={0}
              className={`w-full lg:flex-1 lg:h-full transition-all duration-600 ease-out delay-400 ${
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
                className='h-full'
              />
            </div>
          )}

          {/* Side Articles (Mobile: Below Featured, Desktop: Right Column) */}
          <div className='w-full lg:flex-1 flex flex-col gap-4 sm:gap-6 lg:h-full'>
            {blogPosts.slice(1, 4).map((post, index) => (
              <div
                key={post.id}
                ref={el => {
                  cardRefs.current[index + 1] = el;
                }}
                data-index={index + 1}
                className={`lg:flex-1 transition-all duration-600 ease-out delay-${600 + index * 200} ${
                  visibleCards.has(index + 1)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <BlogCard
                  title={post.title}
                  author={post.author}
                  date={post.date}
                  description={post.description}
                  imageSrc={post.imageSrc}
                  imageAlt={post.imageAlt}
                  badgeText={post.badgeText}
                  badgeBackgroundColor={post.badgeBackgroundColor}
                  badgeTextColor={post.badgeTextColor}
                  badgeArrowColor={post.badgeArrowColor}
                  href={post.href}
                  className='h-full'
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
