'use client';

import { Container, Heading } from '@ktbiotech/system-design';
import { useTranslations } from 'next-intl';
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

        {/* Recruitment Cards Grid - 3 columns on desktop, 1 column on mobile */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-3 lg:px-0'>
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
