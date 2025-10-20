'use client';

import { Heading, Input, Select, Text } from '@ktbiotech/system-design';
import { Search } from 'lucide-react';
import { useState } from 'react';
import BlogList from '../../components/BlogList';
import { BlogCategory, BlogPost } from '../../types';

interface BlogPageProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  onPostClick?: (post: BlogPost) => void;
}

export default function BlogPage({
  posts,
  categories,
  onPostClick,
}: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      !selectedCategory || post.tags.includes(selectedCategory.value);

    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (post: BlogPost) => {
    if (onPostClick) {
      onPostClick(post);
    } else {
      // Default behavior: navigate to blog detail
      window.location.href = `/blogs/${post.slug}`;
    }
  };

  // const categoryOptions = categories.map(category => ({
  //   value: category.name,
  //   label: category.name,
  // }));

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <Heading level={1} className='text-4xl font-bold text-gray-900 mb-4'>
            KTBioTech Blog
          </Heading>
          <Text className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Stay updated with the latest insights, research, and innovations in
            biotechnology
          </Text>
        </div>

        {/* Filters */}
        <div className='mb-8 flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                type='text'
                placeholder='Search posts...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
          <div className='w-full sm:w-64'>
            <Select
              value={selectedCategory}
              onChange={newValue =>
                setSelectedCategory(
                  newValue as { value: string; label: string } | null
                )
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              options={[
                { value: '', label: 'All Categories' },
                ...categories.map(category => ({
                  value: category.name,
                  label: category.name,
                })),
              ]}
            />
          </div>
        </div>

        {/* Results count */}
        <div className='mb-6'>
          <Text className='text-gray-600'>
            Showing {filteredPosts.length} of {posts.length} posts
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && ` in "${selectedCategory.label}"`}
          </Text>
        </div>

        {/* Blog List */}
        <BlogList
          posts={filteredPosts}
          onPostClick={handlePostClick}
          gridCols={3}
        />
      </div>
    </div>
  );
}
