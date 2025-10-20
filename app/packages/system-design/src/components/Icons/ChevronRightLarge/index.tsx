import type { SVGProps } from 'react';

export interface ChevronRightLargeIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function ChevronRightLargeIcon({
  width = 25,
  height = 24,
  stroke = '#FAFAFA',
  title = 'Chevron Right Large',
  ...props
}: ChevronRightLargeIconProps) {
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
        d='M9.67212 18L15.6721 12L9.67212 6'
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
