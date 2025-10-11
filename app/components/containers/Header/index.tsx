'use client';

import React from 'react';
import { Button } from '@ktbiotech/system-design';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  showSubscribeButton?: boolean;
  onBackClick?: () => void;
  onSubscribeClick?: () => void;
}

export default function Header({ 
  title = "KTBioTech",
  subtitle = "Leading innovation in biotechnology for a sustainable future",
  showBackButton = false,
  showSubscribeButton = true,
  onBackClick,
  onSubscribeClick
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button 
                onClick={onBackClick || (() => window.history.back())}
                variant="outline"
                size="sm"
              >
                ← Back
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-gray-600 text-sm">
                      {subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/blogs" className="text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="/research" className="text-gray-600 hover:text-gray-900 transition-colors">
                Research
              </Link>
              <Link href="/solutions" className="text-gray-600 hover:text-gray-900 transition-colors">
                Solutions
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </nav>
            
            {showSubscribeButton && (
              <Button 
                onClick={onSubscribeClick || (() => console.log('Subscribe clicked'))}
                size="sm"
              >
                Subscribe
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
