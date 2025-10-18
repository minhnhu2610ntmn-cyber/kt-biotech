'use client';

import { Button, Heading } from '@ktbiotech/system-design';
import {
  Bookmark,
  Copy,
  Facebook,
  Heart,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  author?: string;
  className?: string;
}

export default function SocialShare({
  title,
  url,
  author,
  className = '',
}: SocialShareProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedAuthor = author ? encodeURIComponent(author) : '';

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${author ? `&via=${encodedAuthor}` : ''}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
    >
      <Heading level={3} className='text-sm font-semibold text-gray-900 mb-3'>
        Share this article
      </Heading>

      {/* Action buttons */}
      <div className='flex items-center gap-2 mb-4'>
        <Button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
            isLiked
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <Heart className='w-4 h-4' fill={isLiked ? 'currentColor' : 'none'} />
          {isLiked ? 'Liked' : 'Like'}
        </Button>

        <Button
          onClick={handleBookmark}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
            isBookmarked
              ? 'bg-blue-50 text-blue-600 border border-blue-200'
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Bookmark
            className='w-4 h-4'
            fill={isBookmarked ? 'currentColor' : 'none'}
          />
          {isBookmarked ? 'Saved' : 'Save'}
        </Button>
      </div>

      {/* Social share buttons */}
      <div className='space-y-2'>
        <a
          href={shareLinks.twitter}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
        >
          <Twitter className='w-4 h-4 text-blue-400' />
          Share on Twitter
        </a>

        <a
          href={shareLinks.facebook}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
        >
          <Facebook className='w-4 h-4 text-blue-600' />
          Share on Facebook
        </a>

        <a
          href={shareLinks.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
        >
          <Linkedin className='w-4 h-4 text-blue-700' />
          Share on LinkedIn
        </a>

        <Button
          onClick={handleCopyLink}
          className='flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
        >
          <Copy className='w-4 h-4' />
          {showCopied ? 'Copied!' : 'Copy link'}
        </Button>
      </div>
    </div>
  );
}
