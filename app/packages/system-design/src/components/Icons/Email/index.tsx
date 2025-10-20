import type { SVGProps } from 'react';

export interface EmailIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function EmailIcon({
  width = 24,
  height = 24,
  stroke = '#FAFAFA',
  title = 'Email',
  ...props
}: EmailIconProps) {
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
        d='M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22 6L12 13L2 6'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
