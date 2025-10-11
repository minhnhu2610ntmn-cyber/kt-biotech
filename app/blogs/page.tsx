'use client';

import React from 'react';
import { BlogPage, BlogPost, BlogCategory } from '@ktbiotech/blog';
import { Header, Footer } from '../components/containers';

// Mock data for testing
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in CRISPR Technology',
    content: 'Full article content...',
    excerpt: 'Recent breakthroughs in CRISPR gene editing technology are revolutionizing biotechnology and opening new possibilities for treating genetic diseases.',
    author: 'Dr. Sarah Chen',
    publishedAt: new Date('2024-01-15'),
    tags: ['Biotechnology', 'Gene Editing', 'Research'],
    slug: 'advances-crispr-technology'
  },
  {
    id: '2',
    title: 'Sustainable Biotech Solutions for Climate Change',
    content: 'Full article content...',
    excerpt: 'How biotechnology is leading the way in sustainable solutions for environmental challenges and climate change mitigation.',
    author: 'Dr. Michael Rodriguez',
    publishedAt: new Date('2024-01-10'),
    tags: ['Sustainability', 'Biotechnology', 'Environment'],
    slug: 'sustainable-biotech-solutions'
  },
  {
    id: '3',
    title: 'AI-Powered Drug Discovery Revolution',
    content: 'Full article content...',
    excerpt: 'Exploring how artificial intelligence is accelerating drug discovery processes and reducing development timelines.',
    author: 'Dr. Emily Watson',
    publishedAt: new Date('2024-01-05'),
    tags: ['AI', 'Drug Discovery', 'Innovation'],
    slug: 'ai-drug-discovery'
  },
  {
    id: '4',
    title: 'Synthetic Biology: Building Life from Scratch',
    content: 'Full article content...',
    excerpt: 'The fascinating world of synthetic biology and how scientists are creating artificial biological systems for various applications.',
    author: 'Dr. James Park',
    publishedAt: new Date('2024-01-01'),
    tags: ['Synthetic Biology', 'Innovation', 'Research'],
    slug: 'synthetic-biology-building-life'
  },
  {
    id: '5',
    title: 'Personalized Medicine: The Future of Healthcare',
    content: 'Full article content...',
    excerpt: 'How personalized medicine is transforming healthcare by tailoring treatments to individual genetic profiles.',
    author: 'Dr. Lisa Thompson',
    publishedAt: new Date('2023-12-28'),
    tags: ['Personalized Medicine', 'Healthcare', 'Genomics'],
    slug: 'personalized-medicine-future'
  },
  {
    id: '6',
    title: 'Biotech Startups: Driving Innovation Forward',
    content: 'Full article content...',
    excerpt: 'The role of biotech startups in driving innovation and bringing cutting-edge technologies to market.',
    author: 'Dr. Alex Kumar',
    publishedAt: new Date('2023-12-20'),
    tags: ['Startups', 'Innovation', 'Business'],
    slug: 'biotech-startups-innovation'
  }
];

const mockCategories: BlogCategory[] = [
  { id: '1', name: 'Biotechnology', slug: 'biotechnology', description: 'Latest developments in biotechnology' },
  { id: '2', name: 'Gene Editing', slug: 'gene-editing', description: 'CRISPR and gene editing technologies' },
  { id: '3', name: 'Research', slug: 'research', description: 'Scientific research and discoveries' },
  { id: '4', name: 'Sustainability', slug: 'sustainability', description: 'Sustainable biotech solutions' },
  { id: '5', name: 'Environment', slug: 'environment', description: 'Environmental biotechnology' },
  { id: '6', name: 'AI', slug: 'ai', description: 'Artificial intelligence in biotech' },
  { id: '7', name: 'Drug Discovery', slug: 'drug-discovery', description: 'Pharmaceutical research' },
  { id: '8', name: 'Innovation', slug: 'innovation', description: 'Innovative biotech solutions' },
  { id: '9', name: 'Synthetic Biology', slug: 'synthetic-biology', description: 'Synthetic biology applications' },
  { id: '10', name: 'Personalized Medicine', slug: 'personalized-medicine', description: 'Personalized healthcare' },
  { id: '11', name: 'Healthcare', slug: 'healthcare', description: 'Healthcare biotechnology' },
  { id: '12', name: 'Genomics', slug: 'genomics', description: 'Genomic research and applications' },
  { id: '13', name: 'Startups', slug: 'startups', description: 'Biotech startup ecosystem' },
  { id: '14', name: 'Business', slug: 'business', description: 'Business and commercial aspects' }
];

export default function BlogsPage() {
  const handlePostClick = (post: BlogPost) => {
    console.log('Post clicked:', post.title);
    // In a real app, you would navigate to the post detail page
    // router.push(`/blogs/${post.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="KTBioTech Blog"
        subtitle="Stay updated with the latest insights, research, and innovations in biotechnology"
        showBackButton={true}
        showSubscribeButton={true}
      />

      {/* Blog Page Component */}
      <BlogPage
        posts={mockPosts}
        categories={mockCategories}
        onPostClick={handlePostClick}
      />

      <Footer showNewsletter={true} />
    </div>
  );
}
