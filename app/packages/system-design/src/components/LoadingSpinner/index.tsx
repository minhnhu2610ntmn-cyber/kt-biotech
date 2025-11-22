'use client';

import Image from 'next/image';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
  variant?: 'logo' | 'spinner' | 'dots';
  showFunFact?: boolean;
  funFact?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const defaultFunFacts = [
  '🧬 Did you know? DNA in a single human cell, if stretched out, would be about 2 meters long!',
  '💡 The human genome contains about 3 billion base pairs, but only 1-2% codes for proteins!',
  '🔬 Your DNA is 99.9% identical to every other human on Earth!',
  '⚡ Every cell in your body contains the same DNA, but different genes are turned on or off!',
  '🌟 If you could type 60 words per minute for 8 hours a day, it would take about 50 years to type the human genome!',
];

export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  className = '',
  variant = 'logo',
  showFunFact = false,
  funFact,
  color = 'blue',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: { size: 32, container: 'w-8 h-8' },
    md: { size: 48, container: 'w-12 h-12' },
    lg: { size: 64, container: 'w-16 h-16' },
    xl: { size: 80, container: 'w-20 h-20' },
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const colorClasses = {
    blue: {
      primary: 'border-t-blue-500 border-r-blue-400',
      gradient1: 'from-blue-500 to-blue-400',
      gradient2: 'from-blue-400 to-blue-500',
      accent1: 'bg-blue-400',
      accent2: 'bg-blue-500',
      dot: 'bg-blue-500',
    },
    green: {
      primary: 'border-t-green-500 border-r-green-400',
      gradient1: 'from-green-500 to-green-400',
      gradient2: 'from-green-400 to-green-500',
      accent1: 'bg-green-400',
      accent2: 'bg-green-500',
      dot: 'bg-green-500',
    },
    purple: {
      primary: 'border-t-purple-500 border-r-purple-400',
      gradient1: 'from-purple-500 to-purple-400',
      gradient2: 'from-purple-400 to-purple-500',
      accent1: 'bg-purple-400',
      accent2: 'bg-purple-500',
      dot: 'bg-purple-500',
    },
    orange: {
      primary: 'border-t-orange-500 border-r-orange-400',
      gradient1: 'from-orange-500 to-orange-400',
      gradient2: 'from-orange-400 to-orange-500',
      accent1: 'bg-orange-400',
      accent2: 'bg-orange-500',
      dot: 'bg-orange-500',
    },
  };

  const selectedFunFact =
    funFact ||
    defaultFunFacts[Math.floor(Math.random() * defaultFunFacts.length)];

  const renderVariant = () => {
    switch (variant) {
      case 'logo':
        return (
          <div className='relative mb-4'>
            {/* Outer ring */}
            <div
              className={`${sizeClasses[size].container} border-4 border-gray-200 rounded-full animate-spin`}
            >
              <div
                className={`absolute inset-0 border-4 border-transparent ${colorClasses[color].primary} rounded-full`}
              ></div>
            </div>

            {/* Logo in center */}
            <div className='absolute inset-0 flex items-center justify-center p-2'>
              <div className='relative animate-pulse'>
                <Image
                  src='/logo.png'
                  alt='Loading'
                  width={sizeClasses[size].size * 0.6}
                  height={sizeClasses[size].size * 0.6}
                  className='object-contain'
                  priority
                />
              </div>
            </div>
          </div>
        );

      case 'spinner':
        return (
          <div className='relative mb-4'>
            <div
              className={`${sizeClasses[size].container} border-4 border-gray-200 rounded-full animate-spin`}
            >
              <div
                className={`absolute inset-0 border-4 border-transparent ${colorClasses[color].primary} rounded-full`}
              ></div>
            </div>
          </div>
        );

      case 'dots':
        return (
          <div className='flex justify-center space-x-2 mb-4'>
            <div
              className={`w-3 h-3 ${colorClasses[color].dot} rounded-full animate-bounce`}
            ></div>
            <div
              className={`w-3 h-3 ${colorClasses[color].dot} rounded-full animate-bounce`}
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className={`w-3 h-3 ${colorClasses[color].dot} rounded-full animate-bounce`}
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderVariant()}

      {/* Loading text */}
      {text && (
        <p
          className={`text-gray-600 ${textSizeClasses[size]} font-medium mb-2`}
        >
          {text}
        </p>
      )}

      {/* Fun fact */}
      {showFunFact && (
        <div className='mt-4 max-w-md mx-auto'>
          <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
            <p className='text-sm text-gray-600 italic'>{selectedFunFact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
