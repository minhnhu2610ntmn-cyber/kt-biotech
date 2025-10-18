'use client';

import { BlogCategory, BlogPage, BlogPost } from '@ktbiotech/blog';
import { Button, Heading } from '@ktbiotech/system-design';

// Mock data for testing
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in CRISPR Technology',
    content: 'Full article content...',
    excerpt:
      'Recent breakthroughs in CRISPR gene editing technology are revolutionizing biotechnology...',
    author: 'Dr. Sarah Chen',
    publishedAt: new Date('2024-01-15'),
    tags: ['Biotechnology', 'Gene Editing', 'Research'],
    slug: 'advances-crispr-technology',
  },
  {
    id: '2',
    title: 'Sustainable Biotech Solutions',
    content: 'Full article content...',
    excerpt:
      'How biotechnology is leading the way in sustainable solutions for environmental challenges...',
    author: 'Dr. Michael Rodriguez',
    publishedAt: new Date('2024-01-10'),
    tags: ['Sustainability', 'Biotechnology', 'Environment'],
    slug: 'sustainable-biotech-solutions',
  },
  {
    id: '3',
    title: 'AI in Drug Discovery',
    content: 'Full article content...',
    excerpt:
      'Exploring how artificial intelligence is accelerating drug discovery processes...',
    author: 'Dr. Emily Watson',
    publishedAt: new Date('2024-01-05'),
    tags: ['AI', 'Drug Discovery', 'Innovation'],
    slug: 'ai-drug-discovery',
  },
];

const mockCategories: BlogCategory[] = [
  { id: '1', name: 'Biotechnology', slug: 'biotechnology' },
  { id: '2', name: 'Gene Editing', slug: 'gene-editing' },
  { id: '3', name: 'Research', slug: 'research' },
  { id: '4', name: 'Sustainability', slug: 'sustainability' },
  { id: '5', name: 'Environment', slug: 'environment' },
  { id: '6', name: 'AI', slug: 'ai' },
  { id: '7', name: 'Drug Discovery', slug: 'drug-discovery' },
  { id: '8', name: 'Innovation', slug: 'innovation' },
];

export default function BlogExample() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePostClick = (post: BlogPost) => {
    // Navigate to post detail page
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Heading level={1} className='text-2xl font-bold text-gray-900'>
              KTBioTech Blog Demo
            </Heading>
            <Button
              onClick={() => {
                // Navigate back to home
              }}
              variant='outline'
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Page Component */}
      <BlogPage
        posts={mockPosts}
        categories={mockCategories}
        onPostClick={handlePostClick}
      />
    </div>
  );
}
