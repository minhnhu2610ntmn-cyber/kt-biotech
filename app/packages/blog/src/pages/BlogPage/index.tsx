'use client';

import { Container, Heading } from '@ktbiotech/system-design';
import ImportantNewsSection from '../../components/ImportantNewsSection';
import MostViewedSection from '../../components/MostViewedSection';
import NewsSection from '../../components/NewsSection';
import RecruitmentNewsSection from '../../components/RecruitmentNewsSection';
import { Article, BlogPost } from '../../types';

interface BlogPageProps {
  latestArticles: Article[];
  mostViewedArticles?: Article[];
  importantArticles?: Article[];
  recruitmentPosts?: Array<{
    id: number;
    imageSrc: string;
    imageAlt: string;
    date: string;
    title: string;
    description: string;
    href: string;
  }>;
  onPostClick?: (post: BlogPost) => void;
}

export default function BlogPage({
  latestArticles,
  mostViewedArticles = [],
  importantArticles = [],
  recruitmentPosts = [],
}: BlogPageProps) {
  return (
    <div className='container mx-auto pr-4 py-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <Heading
          level={2}
          color='#215778'
          className='font-bold !text-2xl mb-[42px] underline decoration-[#2C3E50] decoration-1 underline-offset-4 transition-all duration-600 ease-out delay-300'
        >
          TIN MỚI NHẤT
        </Heading>

        {/* Blog List */}
        <Container className='flex flex-col gap-6'>
          {/* News Section */}
          <NewsSection latestArticles={latestArticles || []} gap='gap-4 ' />

          {/* Most Viewed Section */}
          <MostViewedSection articles={mostViewedArticles} />

          {/* Important News Section */}
          <ImportantNewsSection articles={importantArticles} />

          {/* Recruitment News Section */}
          <RecruitmentNewsSection posts={recruitmentPosts} />
        </Container>
      </div>
    </div>
  );
}
