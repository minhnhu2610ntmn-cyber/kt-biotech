import React from 'react';

interface DownloadIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

export const DownloadIcon: React.FC<DownloadIconProps> = ({
  width = 32,
  height = 32,
  className = '',
  color = '#3691C9',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M25 19V23C25 23.5304 24.7893 24.0391 24.4142 24.4142C24.0391 24.7893 23.5304 25 23 25H9C8.46957 25 7.96086 24.7893 7.58579 24.4142C7.21071 24.0391 7 23.5304 7 23V19'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11 14L16 19L21 14'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 19V7'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default DownloadIcon;
