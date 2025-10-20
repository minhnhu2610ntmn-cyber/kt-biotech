import type { SVGProps } from 'react';

export interface CambodiaFlagIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function CambodiaFlagIcon({
  width = 140,
  height = 105,
  title = 'Cambodia Flag',
  ...props
}: CambodiaFlagIconProps) {
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
      <g clipPath='url(#clip0_292_4877)'>
        <path d='M0 0H140V105H0V0Z' fill='#032EA1' />
        <path d='M0 26.25H140V78.75H0V26.25Z' fill='#E00025' />
        {/* The temple details - simplified for readability, keeping main shapes */}
        <path
          d='M55.2125 49.4805H85.085V60.978H55.2125V49.4805Z'
          fill='#FAFAFA'
          stroke='#1B1C1D'
          strokeWidth='0.15'
          strokeLinejoin='bevel'
        />
        <path
          d='M83.5625 55.8075H84.4812V60.1387H83.5625V55.8075ZM55.2125 53.6813H85.085V54.9938H55.2125V53.6813ZM55.2125 51.8438H85.085V53.0512H55.2125V51.8438Z'
          fill='#FAFAFA'
          stroke='#1B1C1D'
          strokeWidth='0.15'
          strokeLinejoin='bevel'
        />
        <path
          d='M55.2125 50.0586H85.085V51.1873H55.2125V50.0586Z'
          fill='#FAFAFA'
          stroke='#1B1C1D'
          strokeWidth='0.135'
          strokeLinejoin='bevel'
        />
        <path
          d='M63.0875 55.8066H64.0325V60.1379H63.0875V55.8066ZM75.95 55.8066H76.895V60.1379H75.95V55.8066ZM55.475 55.8066H56.3938V60.1379H55.475V55.8066ZM57.3125 55.8066H58.2313V60.1379H57.3125V55.8066ZM59.2813 55.8066H60.2V60.1379H59.2813V55.8066ZM61.25 55.8066H62.1688V60.1379H61.25V55.8066ZM77.735 55.8066H78.68V60.1379H77.735V55.8066ZM79.7038 55.8066H80.6488V60.1379H79.7038V55.8066ZM81.6725 55.8066H82.6175V60.1379H81.6725V55.8066Z'
          fill='#FAFAFA'
          stroke='#1B1C1D'
          strokeWidth='0.15'
          strokeLinejoin='bevel'
        />
        <path
          d='M43.5312 61.5553C43.8057 61.4106 44.0489 61.2133 44.2471 60.9746C44.4453 60.7358 44.5945 60.4604 44.6863 60.1641H95.375C95.4667 60.4604 95.616 60.7358 95.8141 60.9746C96.0123 61.2133 96.2556 61.4106 96.53 61.5553H43.5312Z'
          fill='#FAFAFA'
          stroke='#1B1C1D'
          strokeWidth='0.15'
        />
      </g>
      <defs>
        <clipPath id='clip0_292_4877'>
          <rect width='140' height='105' rx='8' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
