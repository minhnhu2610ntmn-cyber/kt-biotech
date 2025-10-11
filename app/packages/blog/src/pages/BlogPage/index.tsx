'use client';

import React, { useState } from 'react';
import { BlogPost, BlogCategory } from '../../types';
import BlogList from '../../components/BlogList';
import { Input, Select } from '@ktbiotech/system-design';
import { Search } from 'lucide-react';

interface BlogPageProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  onPostClick?: (post: BlogPost) => void;
}

export default function BlogPage({ posts, categories, onPostClick }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || 
                           post.tags.includes(selectedCategory);
    
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

  const categoryOptions = categories.map(category => ({
    value: category.name,
    label: category.name
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            KTBioTech Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, research, and innovations in biotechnology
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="w-full sm:w-64">
            <Select
              options={[
                { value: '', label: 'All Categories' },
                ...categoryOptions
              ]}
              value={selectedCategory ? { value: selectedCategory, label: selectedCategory } : null}
              onChange={(option) => setSelectedCategory((option as { value: string } | null)?.value || '')}
              placeholder="Filter by category"
              isClearable
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPosts.length} of {posts.length} posts
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && ` in "${selectedCategory}"`}
          </p>
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
