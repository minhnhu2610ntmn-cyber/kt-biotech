import type { SVGProps } from 'react';

export interface UnitedKingdomFlagIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function UnitedKingdomFlagIcon({
  width = 22,
  height = 18,
  title = 'United Kingdom Flag',
  ...props
}: UnitedKingdomFlagIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <g clipPath='url(#clip0_292_6390)'>
        <path d='M0 0.5H22V17.5H0V0.5Z' fill='#215778' />
        <path
          d='M2.57812 0.5L10.9656 6.91042L19.3188 0.5H22V2.69583L13.75 9.03542L22 15.3396V17.5H19.25L11 11.1604L2.78437 17.5H0V15.375L8.21562 9.07083L0 2.76667V0.5H2.57812Z'
          fill='#FAFAFA'
        />
        <path
          d='M14.575 10.4521L22 16.0833V17.5L12.6844 10.4521H14.575ZM8.25 11.1604L8.45625 12.4L1.85625 17.5H0L8.25 11.1604ZM22 0.5V0.60625L13.4406 7.26458L13.5094 5.70625L20.2812 0.5H22ZM0 0.5L8.21562 6.73333H6.15313L0 1.9875V0.5Z'
          fill='#C8102E'
        />
        <path
          d='M8.28438 0.5V17.5H13.7844V0.5H8.28438ZM0 6.16667V11.8333H22V6.16667H0Z'
          fill='#FAFAFA'
        />
        <path
          d='M0 7.33542V10.7354H22V7.33542H0ZM9.38438 0.5V17.5H12.6844V0.5H9.38438Z'
          fill='#C8102E'
        />
      </g>
      <defs>
        <clipPath id='clip0_292_6390'>
          <rect
            width='22'
            height='17'
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
