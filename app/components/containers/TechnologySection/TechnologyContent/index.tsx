import { Heading, Text } from '@ktbiotech/system-design';
import { useState } from 'react';
import type { TechnologyFootprint } from '../../../types';

export interface TechnologyContentProps {
  footprints: TechnologyFootprint[];
  className?: string;
}

export default function TechnologyContent({
  footprints,
  className,
}: TechnologyContentProps) {
  const [activeFootprint, setActiveFootprint] = useState(
    footprints.find((f) => f.isActive) || footprints[0]
  );

  return (
    <div className={`bg-white rounded-lg p-6 border border-kt-gray-200 ${className}`}>
      <div className='relative h-64 rounded-lg overflow-hidden mb-4'>
        <img
          src={activeFootprint.image}
          alt={activeFootprint.title}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
        <div className='absolute bottom-4 left-4 text-white'>
          <span className='bg-kt-blue-600 px-3 py-1 rounded-full text-sm font-medium'>
            {activeFootprint.year}
          </span>
        </div>
      </div>
      
      <Heading level={4} className='text-kt-gray-800 font-semibold mb-2'>
        {activeFootprint.title}
      </Heading>
      
      <Text className='text-kt-gray-600 mb-4'>
        {activeFootprint.description}
      </Text>
      
      {activeFootprint.details && (
        <Text className='text-kt-gray-500 text-sm'>
          {activeFootprint.details}
        </Text>
      )}
      
      {/* Technology Navigation */}
      <div className='mt-6 flex gap-2 flex-wrap'>
        {footprints.map((footprint) => (
          <button
            key={footprint.id}
            onClick={() => setActiveFootprint(footprint)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeFootprint.id === footprint.id
                ? 'bg-kt-blue-600 text-white'
                : 'bg-kt-gray-100 text-kt-gray-600 hover:bg-kt-gray-200'
            }`}
          >
            {footprint.year}
          </button>
        ))}
      </div>
    </div>
  );
}
