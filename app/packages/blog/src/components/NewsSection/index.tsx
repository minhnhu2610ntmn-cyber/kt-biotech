'use client';

import { BlogCard, Container, Heading } from '@ktbiotech/system-design';
import { useEffect, useRef, useState } from 'react';

// Define Article type locally since we can't import from app types
interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  author: {
    name: string;
  };
  cover?: {
    url: string;
  };
  category: {
    name: string;
    color: string;
  };
}

interface NewsSectionProps {
  latestArticles: Article[];
}

// Utility functions
const buildImageUrl = (imagePath?: string): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://103.90.225.225:1337';
  if (!imagePath) return '/images/hero.png';
  return `${baseUrl}${imagePath}`;
};

const lightenColor = (hex: string, percent: number): string => {
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  const newR = Math.round(r + (255 - r) * (percent / 100));
  const newG = Math.round(g + (255 - g) * (percent / 100));
  const newB = Math.round(b + (255 - b) * (percent / 100));

  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

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
      badgeArrowColor: article.category.color,
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
    <section ref={sectionRef}>
      <Container>
        {/* Section Title */}
        <Heading
          level={2}
          color='#215778'
          className={`font-bold !text-2xl mb-10 pl-4 underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Tin Tức
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
          <div className='w-full lg:flex-1 flex flex-col gap-4 sm:gap-6 px-3 lg:px-0 lg:h-full'>
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
