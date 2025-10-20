import React from 'react';

interface OClockIconProps {
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

const OClockIcon: React.FC<OClockIconProps> = ({
  width = 32,
  height = 33,
  className = '',
  stroke = '#CCCFD1',
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M16 29.8327C23.3638 29.8327 29.3333 23.8631 29.3333 16.4993C29.3333 9.13555 23.3638 3.16602 16 3.16602C8.63616 3.16602 2.66663 9.13555 2.66663 16.4993C2.66663 23.8631 8.63616 29.8327 16 29.8327Z'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 8.5V16.5L21.3333 19.1667'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default OClockIcon;
