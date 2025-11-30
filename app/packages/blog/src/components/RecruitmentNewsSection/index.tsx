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
import { mockRecruitmentPosts } from '../../data/mockData';
import RecruitmentCard from '../RecruitmentCard';

// Define RecruitmentPost type locally
interface RecruitmentPost {
  id: number;
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
  href: string;
}

interface RecruitmentNewsSectionProps {
  posts: RecruitmentPost[];
}

export default function RecruitmentNewsSection({
  posts,
}: RecruitmentNewsSectionProps) {
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

  // Use API data or fallback to mock data
  const recruitmentPosts = posts.length > 0 ? posts : mockRecruitmentPosts;

  return (
    <section ref={sectionRef}>
      <Container>
        {/* Section Title */}
        <Heading
          level={2}
          color='#215778'
          className={`font-bold !text-2xl mb-10 px-4 xl:px-0 underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {t('recruitment')}
        </Heading>

        {/* Mobile: Horizontal Card Layout */}
        <div className='lg:hidden px-3 space-y-3'>
          {recruitmentPosts.slice(0, 6).map(post => (
            <article
              key={post.id}
              onClick={() => router.push(post.href)}
              className='flex gap-3 cursor-pointer group rounded-lg overflow-hidden'
            >
              {/* Image - Left (1/3) */}
              <div className='flex-shrink-0 w-1/3 relative'>
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  width={120}
                  height={120}
                  className='object-cover rounded-lg w-full h-full'
                />
              </div>

              {/* Content - Right (2/3) */}
              <div className='flex-1 flex flex-col py-1'>
                {/* Date */}
                <Text
                  variant='caption'
                  color='#7C8388'
                  className='text-xs mb-0'
                >
                  {post.date}
                </Text>

                {/* Title */}
                <Text
                  color='#1B1C1D'
                  className='!text-base !font-[700] mb-2 line-clamp-2'
                >
                  {post.title}
                </Text>

                {/* View All Link */}
                <div
                  onClick={e => e.stopPropagation()}
                  className='inline-flex items-center gap-1'
                >
                  <Link
                    href={post.href}
                    className='inline-flex items-center gap-1 !text-[#3691C9] hover:!text-[#3691C9] font-medium text-xs !underline-none !no-underline whitespace-nowrap'
                  >
                    <div className='flex items-center gap-1'>
                      {tCommon('viewAll')}
                      <ChevronRightIcon
                        fill='#3691C9'
                        className='w-3 h-3 flex-shrink-0'
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: Recruitment Cards Grid - 3 columns */}
        <div className='hidden lg:grid grid-cols-3 gap-6'>
          {recruitmentPosts.slice(0, 6).map((post, index) => (
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
              <RecruitmentCard
                imageSrc={post.imageSrc}
                imageAlt={post.imageAlt}
                date={post.date}
                title={post.title}
                description={post.description}
                href={post.href}
                className='h-full'
                priority={index < 3} // Prioritize first 3 images
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
