import { Heading, Text } from '@ktbiotech/system-design';
import type { NewsItem } from '../../../types';

export interface NewsGridProps {
  news: NewsItem[];
  className?: string;
}

export default function NewsGrid({ news, className }: NewsGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
    >
      {news.map(item => (
        <div
          key={item.id}
          className='bg-white border border-kt-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow'
        >
          <div className='relative h-48'>
            <img
              src={item.image}
              alt={item.title}
              className='w-full h-full object-cover'
            />
            <div className='absolute top-4 left-4'>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.category === 'news'
                    ? 'bg-kt-blue-600 text-white'
                    : item.category === 'about'
                      ? 'bg-kt-success text-white'
                      : 'bg-kt-warning text-white'
                }`}
              >
                {item.category === 'news'
                  ? 'Tin tức'
                  : item.category === 'about'
                    ? 'Giới thiệu'
                    : 'Tuyển dụng'}
              </span>
            </div>
          </div>
          <div className='p-6'>
            <Heading level={4} className='text-kt-gray-800 font-semibold mb-2'>
              {item.title}
            </Heading>
            <Text className='text-kt-gray-600 text-sm mb-4'>
              {item.description}
            </Text>
            <div className='flex items-center justify-between'>
              <Text className='text-kt-gray-500 text-xs'>
                {item.publishedAt.toLocaleDateString('vi-VN')}
              </Text>
              <a
                href={item.href}
                className='text-kt-blue-600 hover:text-kt-blue-700 text-sm font-medium'
              >
                Đọc thêm →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
