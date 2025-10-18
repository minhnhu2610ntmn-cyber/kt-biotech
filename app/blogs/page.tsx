'use client';

import { BlogCategory, BlogPage, BlogPost } from '@ktbiotech/blog';
import { useRouter } from 'next/navigation';

// Mock data for testing
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in CRISPR Technology',
    content: 'Full article content...',
    excerpt:
      'Recent breakthroughs in CRISPR gene editing technology are revolutionizing biotechnology and opening new possibilities for treating genetic diseases.',
    slug: 'advances-in-crispr-technology',
    author: 'Dr. Sarah Johnson',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    tags: ['CRISPR', 'Gene Editing', 'Biotechnology'],
  },
  {
    id: '2',
    title: 'The Future of Personalized Medicine',
    content: 'Full article content...',
    excerpt:
      'How personalized medicine is transforming healthcare through tailored treatments based on individual genetic profiles.',
    slug: 'future-personalized-medicine',
    author: 'Dr. Michael Chen',
    publishedAt: new Date('2024-01-10T14:30:00Z'),
    tags: ['Personalized Medicine', 'Genomics', 'Healthcare'],
  },
  {
    id: '3',
    title: 'Biotech Startup Funding Trends 2024',
    content: 'Full article content...',
    excerpt:
      'An analysis of investment patterns and funding trends in the biotechnology startup ecosystem.',
    slug: 'biotech-startup-funding-trends-2024',
    author: 'Alex Rodriguez',
    publishedAt: new Date('2024-01-05T09:15:00Z'),
    tags: ['Startups', 'Funding', 'Investment'],
  },
];

const mockCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Research',
    slug: 'research',
    description: 'Scientific research and discoveries',
  },
  {
    id: '2',
    name: 'Medicine',
    slug: 'medicine',
    description: 'Medical advances and treatments',
  },
  {
    id: '3',
    name: 'Business',
    slug: 'business',
    description: 'Business and commercial aspects',
  },
  {
    id: '4',
    name: 'Technology',
    slug: 'technology',
    description: 'Technological innovations',
  },
  {
    id: '5',
    name: 'Industry News',
    slug: 'industry-news',
    description: 'Latest industry developments',
  },
  {
    id: '6',
    name: 'Regulatory',
    slug: 'regulatory',
    description: 'Regulatory updates and compliance',
  },
  {
    id: '7',
    name: 'Clinical Trials',
    slug: 'clinical-trials',
    description: 'Clinical research and trials',
  },
  {
    id: '8',
    name: 'Drug Discovery',
    slug: 'drug-discovery',
    description: 'Pharmaceutical research',
  },
  {
    id: '9',
    name: 'Diagnostics',
    slug: 'diagnostics',
    description: 'Diagnostic technologies',
  },
  {
    id: '10',
    name: 'Therapeutics',
    slug: 'therapeutics',
    description: 'Therapeutic developments',
  },
  {
    id: '11',
    name: 'Biomarkers',
    slug: 'biomarkers',
    description: 'Biomarker research',
  },
  {
    id: '12',
    name: 'Genomics',
    slug: 'genomics',
    description: 'Genomic research and applications',
  },
  {
    id: '13',
    name: 'Startups',
    slug: 'startups',
    description: 'Biotech startup ecosystem',
  },
  {
    id: '14',
    name: 'Business',
    slug: 'business',
    description: 'Business and commercial aspects',
  },
];

export default function BlogsPage() {
  const router = useRouter();

  const handlePostClick = (post: BlogPost) => {
    // Navigate to the blog detail page using Next.js router
    router.push(`/blogs/${post.slug}`);
  };

  return (
    <div className='bg-gray-50'>
      {/* Blog Page Component */}
      <BlogPage
        posts={mockPosts}
        categories={mockCategories}
        onPostClick={handlePostClick}
      />
    </div>
  );
}
