import { Heading, Text } from '@ktbiotech/system-design';
import type { CompanyMessage as CompanyMessageType } from '../../../types';

export interface CompanyMessageProps extends CompanyMessageType {
  className?: string;
}

export default function CompanyMessage({
  title,
  description,
  image,
  href,
  className,
}: CompanyMessageProps) {
  return (
    <div
      className={`bg-kt-blue-50 p-6 rounded-lg border border-kt-blue-200 ${className}`}
    >
      <div className='relative h-48 mb-4 rounded-lg overflow-hidden'>
        <img src={image} alt={title} className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
      </div>
      <Heading level={4} className='text-kt-blue-800 font-semibold mb-2'>
        {title}
      </Heading>
      <Text className='text-kt-gray-600 text-sm mb-4'>{description}</Text>
      {href && (
        <a
          href={href}
          className='text-kt-blue-600 hover:text-kt-blue-700 text-sm font-medium'
        >
          Tìm hiểu thêm →
        </a>
      )}
    </div>
  );
}
