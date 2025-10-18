import { Heading, Text } from '@ktbiotech/system-design';

export default function Loading() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <div className='text-center'>
        {/* Cute animated DNA helix */}
        <div className='mb-8'>
          <div className='relative w-20 h-32 mx-auto'>
            {/* DNA helix animation */}
            <div className='absolute inset-0'>
              {/* Helix strand 1 */}
              <div className='absolute left-3 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-green-500 rounded-full animate-pulse'></div>
              {/* Helix strand 2 */}
              <div
                className='absolute right-3 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full animate-pulse'
                style={{ animationDelay: '0.5s' }}
              ></div>

              {/* Connecting bonds */}
              <div className='absolute left-3 top-6 w-14 h-1 bg-blue-400 rounded-full animate-bounce'></div>
              <div
                className='absolute right-3 top-12 w-14 h-1 bg-green-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.3s' }}
              ></div>
              <div
                className='absolute left-3 top-18 w-14 h-1 bg-blue-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.6s' }}
              ></div>
              <div
                className='absolute right-3 top-24 w-14 h-1 bg-green-400 rounded-full animate-bounce'
                style={{ animationDelay: '0.9s' }}
              ></div>
              <div
                className='absolute left-3 top-30 w-14 h-1 bg-blue-400 rounded-full animate-bounce'
                style={{ animationDelay: '1.2s' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className='space-y-2'>
          <Heading level={3} className='text-2xl font-semibold text-gray-900'>
            Preparing your biotech experience...
          </Heading>
          <Text className='text-gray-600'>Loading amazing content for you</Text>
        </div>

        {/* Animated dots */}
        <div className='flex justify-center space-x-1 mt-6'>
          <div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'></div>
          <div
            className='w-3 h-3 bg-green-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Fun fact */}
        <div className='mt-8 max-w-lg mx-auto'>
          <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
            <Text className='text-base text-gray-600 italic'>
              🧬 Did you know? The human genome contains about 3 billion base
              pairs, but only about 1-2% of it codes for proteins!
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
