'use client';

import React from 'react';
import { BlogPage, BlogPost, BlogCategory } from '@ktbiotech/blog';
import { Button } from '@ktbiotech/system-design';

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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                KTBioTech Blog
              </h1>
              <p className="text-gray-600">
                Stay updated with the latest insights, research, and innovations in biotechnology
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => window.history.back()}
                variant="outline"
              >
                ← Back
              </Button>
              <Button 
                onClick={() => console.log('Subscribe clicked')}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Page Component */}
      <BlogPage
        posts={mockPosts}
        categories={mockCategories}
        onPostClick={handlePostClick}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">KTBioTech</h3>
              <p className="text-gray-300">
                Leading innovation in biotechnology for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Research</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Gene Editing</li>
                <li>Synthetic Biology</li>
                <li>AI in Biotech</li>
                <li>Drug Discovery</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Sustainable Biotech</li>
                <li>Personalized Medicine</li>
                <li>Environmental Solutions</li>
                <li>Healthcare Innovation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 KTBioTech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
