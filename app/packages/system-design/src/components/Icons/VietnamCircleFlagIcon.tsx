import React from 'react';

interface VietnamCircleFlagIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const VietnamCircleFlagIcon: React.FC<VietnamCircleFlagIconProps> = ({
  width = 28,
  height = 28,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect width='28' height='28' rx='14' fill='#F23131' />
      <path
        d='M14 4L16.2451 10.9098H23.5106L17.6327 15.1803L19.8779 22.0902L14 17.8197L8.12215 22.0902L10.3673 15.1803L4.48944 10.9098H11.7549L14 4Z'
        fill='#FFC14E'
      />
    </svg>
  );
};
