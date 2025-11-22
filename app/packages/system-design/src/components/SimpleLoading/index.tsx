'use client';

import Image from 'next/image';

export interface SimpleLoadingProps {
  text?: string;
  showDots?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
  backgroundColor?: string;
}

export default function SimpleLoading({
  text = 'Loading...',
  showDots = true,
  size = 'md',
  className = '',
  fullScreen = true,
  backgroundColor = 'bg-white',
}: SimpleLoadingProps) {
  const sizeConfig = {
    sm: { logoSize: 48, spinnerSize: 'w-16 h-16' },
    md: { logoSize: 64, spinnerSize: 'w-20 h-20' },
    lg: { logoSize: 80, spinnerSize: 'w-24 h-24' },
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const containerClasses = fullScreen
    ? `fixed inset-0 ${backgroundColor} z-50 flex items-center justify-center`
    : `flex items-center justify-center ${backgroundColor}`;

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className='text-center'>
        {/* Logo with spinning ring */}
        <div className='mb-6'>
          <div className='relative mx-auto' style={{ width: 'fit-content' }}>
            {/* Outer spinning ring */}
            <div
              className={`${sizeConfig[size].spinnerSize} border-4 border-gray-200 rounded-full animate-spin`}
            >
              <div className='absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-green-500 rounded-full'></div>
            </div>

            {/* Logo in center */}
            <div className='absolute inset-0 flex items-center justify-center p-3'>
              <div className='relative animate-pulse'>
                <Image
                  src='/logo.png'
                  alt='Loading'
                  width={sizeConfig[size].logoSize}
                  height={sizeConfig[size].logoSize}
                  className='object-contain'
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        {text && (
          <h3
            className={`${textSizeClasses[size]} font-semibold text-gray-900 mb-2`}
          >
            {text}
          </h3>
        )}

        {/* Animated dots */}
        {showDots && (
          <div className='flex justify-center space-x-1'>
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
        )}
      </div>
    </div>
  );
}
