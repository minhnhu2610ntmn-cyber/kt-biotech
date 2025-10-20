import type { SVGProps } from 'react';

export interface UnitedStatesFlagIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function UnitedStatesFlagIcon({
  width = 140,
  height = 105,
  title = 'United States Flag',
  ...props
}: UnitedStatesFlagIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 140 105'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <g clipPath='url(#clip0_292_4960)'>
        <path d='M0 0H140V105H0' fill='#BD3D44' />
        <path
          d='M0 12.0977H140H0ZM0 28.2195H140H0ZM0 44.407H140H0ZM0 60.5945H140H0ZM0 76.782H140H0ZM0 92.9695H140H0Z'
          fill='#1B1C1D'
        />
        <path
          d='M0 12.0977H140M0 28.2195H140M0 44.407H140M0 60.5945H140M0 76.782H140M0 92.9695H140'
          stroke='#FAFAFA'
          strokeWidth='4.625'
        />
        <path d='M0 0H79.8V56.5469H0' fill='#192F5D' />
      </g>
      <defs>
        <clipPath id='clip0_292_4960'>
          <rect width='140' height='105' rx='8' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
