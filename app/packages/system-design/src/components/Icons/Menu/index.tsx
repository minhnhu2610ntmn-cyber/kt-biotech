import type { SVGProps } from 'react';

export interface MenuIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function MenuIcon({
  width = 24,
  height = 24,
  stroke = '#1B1C1D',
  title = 'Menu',
  ...props
}: MenuIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <path
        d='M18 10H6'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21 6H3'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21 14H3'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 18H6'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
