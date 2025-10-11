'use client';

import React from 'react';
import { BlogPost } from '../../types';
import { formatDate, truncateText } from '../../utils';

interface BlogCardProps {
  post: BlogPost;
  onClick?: (post: BlogPost) => void;
  className?: string;
}

export default function BlogCard({ post, onClick, className = '' }: BlogCardProps) {
  const handleClick = () => {
    onClick?.(post);
  };

  return (
    <article 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <time className="text-sm text-gray-500">
            {formatDate(post.publishedAt)}
          </time>
          <span className="text-sm text-blue-600 font-medium">
            by {post.author}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateText(post.excerpt, 150)}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
