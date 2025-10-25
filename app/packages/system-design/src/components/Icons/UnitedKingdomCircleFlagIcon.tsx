import React from 'react';

interface UnitedKingdomCircleFlagIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const UnitedKingdomCircleFlagIcon: React.FC<
  UnitedKingdomCircleFlagIconProps
> = ({ width = 28, height = 28, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <mask
        id='mask0_635_3108'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='28'
        height='28'
      >
        <circle cx='14' cy='14' r='14' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_635_3108)'>
        <path d='M-5.25 -1.75H33.25V28H-5.25V-1.75Z' fill='#012169' />
        <path
          d='M-0.738281 -1.75L13.9398 9.46823L28.5578 -1.75H33.25V2.09271L18.8125 13.187L33.25 24.2193V28H28.4375L14 16.9057L-0.377344 28H-5.25V24.2812L9.12734 13.249L-5.25 2.21667V-1.75H-0.738281Z'
          fill='white'
        />
        <path
          d='M20.2563 15.6661L33.25 25.5208V28L16.9477 15.6661H20.2563ZM9.1875 16.9057L9.54844 19.075L-2.00156 28H-5.25L9.1875 16.9057ZM33.25 -1.75V-1.56406L18.2711 10.088L18.3914 7.36094L30.2422 -1.75H33.25ZM-5.25 -1.75L9.12734 9.15833H5.51797L-5.25 0.853125V-1.75Z'
          fill='#C8102E'
        />
        <path
          d='M9.24766 -1.75V28H18.8727V-1.75H9.24766ZM-5.25 8.16667V18.0833H33.25V8.16667H-5.25Z'
          fill='white'
        />
        <path
          d='M-5.25 10.212V16.162H33.25V10.212H-5.25ZM11.1727 -1.75V28H16.9477V-1.75H11.1727Z'
          fill='#C8102E'
        />
      </g>
    </svg>
  );
};
