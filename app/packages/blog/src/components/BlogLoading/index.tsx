'use client';

import { Heading, Text } from '@ktbiotech/system-design';

export default function BlogLoading() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <div className='text-center'>
        {/* Cute animated DNA helix */}
        <div className='mb-8'>
          <div className='relative w-16 h-24 mx-auto'>
            {/* DNA helix animation */}
            <div className='absolute inset-0'>
              {/* Helix strand 1 */}
              <div className='absolute left-2 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-green-500 rounded-full animate-pulse'></div>
              {/* Helix strand 2 */}
              <div
                className='absolute right-2 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full animate-pulse'
                style={{ animationDelay: '0.5s' }}
              ></div>

              {/* Connecting bonds */}
              <div className='absolute left-2 top-4 w-12 h-1 bg-blue-400 rounded-full animate-bounce'></div>
              <div
                className='absolute right-2 top-8 w-12 h-1 bg-green-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.3s' }}
              ></div>
              <div
                className='absolute left-2 top-12 w-12 h-1 bg-blue-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.6s' }}
              ></div>
              <div
                className='absolute right-2 top-16 w-12 h-1 bg-green-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.9s' }}
              ></div>
              <div
                className='absolute left-2 top-20 w-12 h-1 bg-blue-400 rounded-full animate-bounce'
                style={{ animationDelay: '1.2s' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className='space-y-2'>
          <Heading level={3} className='text-xl font-semibold text-gray-900'>
            Loading amazing content...
          </Heading>
          <Text className='text-gray-600'>
            Preparing your biotech reading experience
          </Text>
        </div>

        {/* Animated dots */}
        <div className='flex justify-center space-x-1 mt-6'>
          <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
          <div
            className='w-2 h-2 bg-green-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Fun fact */}
        <div className='mt-8 max-w-md mx-auto'>
          <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
            <Text className='text-sm text-gray-600 italic'>
              💡 Did you know? DNA in a single human cell, if stretched out,
              would be about 2 meters long!
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
