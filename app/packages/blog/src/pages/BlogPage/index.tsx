'use client';

import { Container, Heading } from '@ktbiotech/system-design';
import BlogList from '../../components/BlogList';
import { BlogPost } from '../../types';

interface BlogPageProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

export default function BlogPage({ onPostClick }: BlogPageProps) {
  // Filter posts based on search and category

  const handlePostClick = (post: BlogPost) => {
    if (onPostClick) {
      onPostClick(post);
    } else {
      // Default behavior: navigate to blog detail
      window.location.href = `/blogs/${post.slug}`;
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
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
        <Container>
          <BlogList posts={[]} onPostClick={handlePostClick} gridCols={3} />
        </Container>
      </div>
    </div>
  );
}
