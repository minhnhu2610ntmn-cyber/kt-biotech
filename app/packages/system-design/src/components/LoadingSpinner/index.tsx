'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Cute animated spinner with biotech theme */}
      <div className="relative mb-4">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-green-500 rounded-full"></div>
        </div>
        
        {/* Inner DNA helix */}
        <div className="absolute inset-2 flex items-center justify-center">
          <div className="w-4 h-4 relative">
            <div className="absolute left-0 top-0 w-0.5 h-4 bg-gradient-to-b from-blue-500 to-green-500 rounded-full animate-pulse"></div>
            <div className="absolute right-0 top-0 w-0.5 h-4 bg-gradient-to-b from-green-500 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute left-0 top-2 w-3 h-0.5 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute right-0 top-3 w-3 h-0.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      {text && (
        <p className={`text-gray-600 ${textSizeClasses[size]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
}
