import type { SVGProps } from 'react';

export interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function ChevronDownIcon({
  width = 8,
  height = 5,
  stroke = '#1B1C1D',
  title = 'Chevron Down',
  ...props
}: ChevronDownIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 8 5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <path
        d='M1 1L4 4L7 1'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
