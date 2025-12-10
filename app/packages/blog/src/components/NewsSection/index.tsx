'use client';

import {
  ChevronRightIcon,
  Container,
  Heading,
  Link,
  Slider,
  SliderPresets,
  Text,
} from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  author?: {
    name: string;
  } | null;
  cover?: {
    url: string;
  };
  category?: {
    name: string;
    color: string;
  } | null;
}

interface NewsSectionProps {
  latestArticles: Article[];
  title?: string;
  gap?: string;
  mobileLayout?: 'vertical' | 'horizontal';
  className?: string;
}

export default function NewsSection({
  latestArticles,
  title,
  gap = 'gap-4 sm:gap-6',
  mobileLayout = 'vertical',
  className = 'px-4 xl:px-0',
}: NewsSectionProps) {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const router = useRouter();
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
      author: article.author?.name || t('unknownAuthor'),
      date: formatDate(article.createdAt),
      description: article.description,
      imageSrc: buildImageUrl(article.cover?.url),
      imageAlt: article.title,
      badgeText: article.category?.name || t('uncategorized'),
      badgeBackgroundColor: article.category?.color
        ? lightenColor(article.category.color, 60)
        : '#E5E7EB',
      badgeTextColor: `#1B1C1D`,
      badgeArrowColor: article.category?.color || '#6B7280',
      href: `/blogs/${article.slug}`,
      slug: article.slug,
    };
  };

  // Use API data or fallback to mock data
  const blogPosts =
    latestArticles.length > 0
      ? latestArticles.map(transformArticleToBlogCard)
      : mockBlogPosts;

  return (
    <section ref={sectionRef} className={className}>
      <Container>
        {/* Section Title */}
        {title && (
          <Heading
            level={2}
            color='#215778'
            className={`font-bold !text-2xl mb-10 text-center xl:text-left pl-4 underline decoration-[#2C3E50] decoration-1 underline-offset-4  transition-all duration-600 ease-out delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className='!uppercase lg:!normal-case'> {title}</span>
          </Heading>
        )}

        {/* Blog Cards Grid - Mobile: Single Column or Horizontal Slider, Desktop: Two Columns */}
        {mobileLayout === 'horizontal' ? (
          /* Mobile Horizontal Layout with Slider */
          <div className='lg:hidden'>
            <Slider
              {...SliderPresets.productCarousel}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 1.2, spaceBetween: 20 },
              }}
              className='pl-3 pr-2'
            >
              {blogPosts.slice(0, 4).map((post, index) => (
                <div
                  key={post.id}
                  ref={el => {
                    cardRefs.current[index] = el;
                  }}
                  data-index={index}
                  className={`h-full transition-all duration-600 ease-out ${
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
            </Slider>
          </div>
        ) : null}

        {/* Desktop Layout or Mobile Vertical Layout */}
        <div
          className={`flex flex-col lg:flex-row gap-4 sm:gap-6 pl-3 pr-2 lg:pr-0 lg:pl-0 lg:items-stretch ${
            mobileLayout === 'horizontal' ? 'hidden lg:flex' : ''
          }`}
        >
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
              {/* Mobile Card Design - Horizontal Layout */}
              <article
                className='lg:hidden flex gap-3 cursor-pointer group rounded-lg overflow-hidden'
                onClick={() => router.push(blogPosts[0].href)}
              >
                {/* Image - Left (1/3) */}
                <div className='flex-shrink-0 w-1/3 relative'>
                  <Image
                    src={blogPosts[0].imageSrc || '/images/placeholder.png'}
                    alt={blogPosts[0].imageAlt}
                    width={120}
                    height={120}
                    className='w-full h-full object-cover rounded-lg'
                  />
                </div>

                {/* Content - Right (2/3) */}
                <div className='flex-1 flex flex-col py-1'>
                  {/* Category */}
                  <Text color='#7C8388' className='text-xs mb-0'>
                    {blogPosts[0].badgeText}
                  </Text>

                  {/* Title - Multi-line */}
                  <Text
                    color='#1B1C1D'
                    className='!text-base !font-[700] mb-2 line-clamp-2'
                    lineClamp={2}
                  >
                    {blogPosts[0].title}
                  </Text>

                  {/* See All Link */}
                  <Link
                    href={blogPosts[0].href}
                    className=' gap-1 !text-[#3691C9] hover:!text-[#3691C9] font-medium text-xs !underline-none !no-underline whitespace-nowrap'
                  >
                    <div className='flex items-center gap-1'>
                      <span>{tCommon('viewAll')}</span>
                      <ChevronRightIcon
                        fill='#3691C9'
                        className='w-3 h-3 flex-shrink-0'
                      />
                    </div>
                  </Link>
                </div>
              </article>

              {/* Desktop Card - Use BlogCard */}
              <div className='hidden lg:block h-full'>
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
                  slug={blogPosts[0].slug}
                  className='h-full'
                />
              </div>
            </div>
          )}

          {/* Side Articles (Mobile: Below Featured, Desktop: Right Column) */}
          <div
            className={`w-full lg:flex-1 flex flex-col ${gap} px-0 lg:px-0 lg:h-full`}
          >
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
                {/* Mobile Card Design - Horizontal Layout */}
                <article
                  className='lg:hidden flex gap-3 cursor-pointer group rounded-lg overflow-hidden'
                  onClick={() => router.push(post.href)}
                >
                  {/* Image - Left (1/3) */}
                  <div className='flex-shrink-0 w-1/3 relative'>
                    <Image
                      src={post.imageSrc || '/images/placeholder.png'}
                      alt={post.imageAlt}
                      width={120}
                      height={120}
                      className='w-full h-full object-cover rounded-lg'
                    />
                  </div>

                  {/* Content - Right (2/3) */}
                  <div className='flex-1 flex flex-col py-1'>
                    {/* Category */}
                    <Text color='#7C8388' className='text-xs mb-0'>
                      {post.badgeText}
                    </Text>

                    {/* Title - Multi-line */}
                    <Text
                      color='#1B1C1D'
                      className='!text-base !font-[700] mb-2 line-clamp-2'
                      lineClamp={2}
                    >
                      {post.title}
                    </Text>

                    {/* See All Link */}
                    <Link
                      href={post.href}
                      className='inline-flex items-center gap-1 !text-[#3691C9] hover:!text-[#3691C9] font-medium text-xs !underline-none !no-underline whitespace-nowrap'
                    >
                      <div className='flex items-center gap-1'>
                        <span>{tCommon('viewAll')}</span>
                        <ChevronRightIcon
                          fill='#3691C9'
                          className='w-3 h-3 flex-shrink-0'
                        />
                      </div>
                    </Link>
                  </div>
                </article>

                {/* Desktop Card - Use BlogCard */}
                <div className='hidden lg:block h-full'>
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
                    slug={post.slug}
                    className='h-full'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
