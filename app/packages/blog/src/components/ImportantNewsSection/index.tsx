'use client';

import { Container, Heading } from '@ktbiotech/system-design';
import { useEffect, useRef, useState } from 'react';
import { mockBlogPosts } from '../../data/mockData';
import { buildImageUrl, formatDate, lightenColor } from '../../utils';
import BlogCard from '../BlogCard';

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

interface ImportantNewsSectionProps {
  articles: Article[];
}

export default function ImportantNewsSection({
  articles,
}: ImportantNewsSectionProps) {
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
    articles.length > 0
      ? articles.map(transformArticleToBlogCard)
      : mockBlogPosts;

  return (
    <section ref={sectionRef}>
      <Container>
        {/* Section Title */}
        <Heading
          level={2}
          color='#215778'
          className={`font-bold !text-2xl mb-10  underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          TIN QUAN TRỌNG
        </Heading>

        {/* Blog Cards Grid - 2 columns on desktop, 1 column on mobile */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-3 lg:px-0'>
          {blogPosts.slice(0, 6).map((post, index) => (
            <div
              key={post.id}
              ref={el => {
                cardRefs.current[index] = el;
              }}
              data-index={index}
              className={`transition-all duration-600 ease-out delay-${400 + index * 100} ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <BlogCard
                direction='row'
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
      </Container>
    </section>
  );
}
