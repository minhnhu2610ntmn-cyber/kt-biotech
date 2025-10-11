'use client';

import React from 'react';

export default function SimpleLoading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Simple animated DNA */}
        <div className="mb-6">
          <div className="relative w-12 h-16 mx-auto">
            <div className="absolute left-2 top-0 w-1 h-full bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute right-2 top-0 w-1 h-full bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute left-2 top-3 w-8 h-1 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute right-2 top-6 w-8 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute left-2 top-9 w-8 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Loading...
        </h3>
        
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
