'use client';

import { Button, Heading, Text } from '@ktbiotech/system-design';
import { Award, BookOpen, Calendar } from 'lucide-react';

interface AuthorCardProps {
  author: string;
  publishedAt: Date;
  readingTime: string;
  bio?: string;
  className?: string;
}

export default function AuthorCard({
  author,
  publishedAt,
  readingTime,
  bio = 'Leading researcher in biotechnology with over 15 years of experience in gene editing and sustainable biotech solutions. Published author of numerous peer-reviewed papers and recipient of multiple research awards.',
  className = '',
}: AuthorCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const initials = author
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    >
      {/* Author header */}
      <div className='flex items-start gap-4 mb-4'>
        <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
          <span className='text-white font-bold text-xl'>{initials}</span>
        </div>

        <div className='flex-1 min-w-0'>
          <Heading
            level={3}
            className='text-lg font-semibold text-gray-900 mb-1'
          >
            {author}
          </Heading>

          <div className='flex items-center gap-4 text-sm text-gray-600 mb-3'>
            <div className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' />
              {formatDate(publishedAt)}
            </div>
            <div className='flex items-center gap-1'>
              <BookOpen className='w-4 h-4' />
              {readingTime}
            </div>
          </div>

          <Button className='bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors'>
            Follow
          </Button>
        </div>
      </div>

      {/* Bio */}
      <div className='border-t border-gray-100 pt-4'>
        <Text className='text-gray-700 leading-relaxed'>{bio}</Text>

        <div className='flex items-center gap-4 mt-4 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <Award className='w-4 h-4' />
            <span>15+ years experience</span>
          </div>
          <div className='flex items-center gap-1'>
            <BookOpen className='w-4 h-4' />
            <span>50+ publications</span>
          </div>
        </div>
      </div>
    </div>
  );
}
