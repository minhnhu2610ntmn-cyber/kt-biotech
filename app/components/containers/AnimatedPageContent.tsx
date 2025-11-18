'use client';

import { useEffect, useState } from 'react';

type AnimatedPageContentProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedPageContent({
  children,
  className = '',
  delay = 0,
}: AnimatedPageContentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}
