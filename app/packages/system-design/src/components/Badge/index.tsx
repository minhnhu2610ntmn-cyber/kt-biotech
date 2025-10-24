import React from 'react';
import { cn } from '../../utils';

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  arrowColor?: string;
}

export default function Badge({
  children,
  className,
  backgroundColor = '#FFD9BD',
  textColor = '#1B1C1D',
  arrowColor = '#FE7B1B',
}: BadgeProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <svg
        width='129'
        height='48'
        viewBox='0 0 129 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-auto h-auto'
      >
        {/* Arrow */}
        <path
          d='M-5.02257e-07 10L12 0.47372L12 19.5263L-5.02257e-07 10Z'
          fill={arrowColor}
        />
        {/* Main badge background */}
        <path
          d='M0 10H125C127.209 10 129 11.7909 129 14V44C129 46.2091 127.209 48 125 48H4C1.79086 48 0 46.2091 0 44V10Z'
          fill={backgroundColor}
        />
        {/* Text content */}
        <text
          x='65'
          y='32'
          textAnchor='middle'
          dominantBaseline='middle'
          fill={textColor}
          fontSize='12'
          fontWeight='500'
          className='font-medium'
        >
          {children}
        </text>
      </svg>
    </div>
  );
}
