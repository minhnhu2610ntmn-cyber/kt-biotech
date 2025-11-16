'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function ScrollAnimationWrapper({
  children,
  className = '',
  animationClass = 'animate-fade-in-up-delayed',
  delay = 0,
  style,
}: ScrollAnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
      style={style}
    >
      {children}
    </div>
  );
}

