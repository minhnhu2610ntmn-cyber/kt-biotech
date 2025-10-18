'use client';

import { Text } from '@ktbiotech/system-design';
import { BlogPost } from '../../types';
import BlogCard from '../BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
  className?: string;
  gridCols?: 1 | 2 | 3 | 4;
}

export default function BlogList({
  posts,
  onPostClick,
  className = '',
  gridCols = 3,
}: BlogListProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (posts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Text className='text-gray-500 text-lg'>No blog posts found.</Text>
        <Text className='text-gray-400 mt-2'>
          Check back later for new content!
        </Text>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClass[gridCols]} gap-6 ${className}`}>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} onClick={onPostClick} />
      ))}
    </div>
  );
}
