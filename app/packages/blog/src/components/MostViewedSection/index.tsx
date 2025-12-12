'use client';

import { Container, Heading, SliderV2 } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
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
  } | null;
  cover?: {
    url: string;
  };
  category: {
    name: string;
    color: string | null;
  };
}

interface MostViewedSectionProps {
  articles: Article[];
}

export default function MostViewedSection({
  articles,
}: MostViewedSectionProps) {
  const t = useTranslations('blog');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect mobile viewport
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
      author: article.author?.name || 'Unknown Author',
      date: formatDate(article.createdAt),
      description: article.description,
      imageSrc: buildImageUrl(article.cover?.url),
      imageAlt: article.title,
      badgeText: article.category.name,
      badgeBackgroundColor: lightenColor(article.category.color, 60),
      badgeTextColor: `#1B1C1D`,
      badgeArrowColor: article.category.color || '#3691C9',
      href: `/blogs/${article.slug}`,
      slug: article.slug,
    };
  };

  // Use API data or fallback to mock data
  const blogPosts =
    articles && articles.length > 0
      ? articles.map(transformArticleToBlogCard)
      : mockBlogPosts;

  return (
    <section ref={sectionRef}>
      <Container>
        {/* Section Title */}
        <Heading
          level={2}
          color='#215778'
          className={`font-bold !text-2xl px-4 xl:px-0 mb-10  underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {t('mostViewed')}
        </Heading>

        {/* Mobile: SliderV2 with 1.2 slides per view and custom navigation */}
        {isMobile ? (
          <div className='lg:hidden px-3'>
            <SliderV2
              slidesPerView={1.2}
              spaceBetween={16}
              navigation={true}
              customNavigation={true}
              grabCursor={true}
              allowTouchMove={true}
            >
              {blogPosts.map(post => (
                <div key={post.id}>
                  <BlogCard
                    direction='column'
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
                    slug={post.slug}
                    className='h-full'
                  />
                </div>
              ))}
            </SliderV2>
          </div>
        ) : (
          /* Desktop: Blog Cards Grid - 4 columns */
          <div className='hidden lg:grid grid-cols-4 gap-6'>
            {blogPosts.slice(0, 4).map((post, index) => (
              <div
                key={post.id}
                ref={el => {
                  cardRefs.current[index] = el;
                }}
                data-index={index}
                className={`transition-all duration-600 ease-out delay-${400 + index * 200} ${
                  visibleCards.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <BlogCard
                  direction='column'
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
                  slug={post.slug}
                  className='h-full'
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
