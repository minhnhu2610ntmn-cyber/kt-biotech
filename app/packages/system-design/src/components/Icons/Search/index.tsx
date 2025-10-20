import type { SVGProps } from 'react';

export interface SearchIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function SearchIcon({
  width = 25,
  height = 24,
  stroke = '#333638',
  title = 'Search',
  ...props
}: SearchIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <path
        d='M11.5 19C15.9183 19 19.5 15.4183 19.5 11C19.5 6.58172 15.9183 3 11.5 3C7.08172 3 3.5 6.58172 3.5 11C3.5 15.4183 7.08172 19 11.5 19Z'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21.5 21.0004L17.15 16.6504'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
