import React from 'react';

interface AddressIconProps {
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

const AddressIcon: React.FC<AddressIconProps> = ({
  width = 32,
  height = 32,
  className = '',
  stroke = '#E7E8E9',
  strokeWidth = 2,
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
      <g clipPath='url(#clip0_302_6083)'>
        <path
          d='M16 18.668C18.2091 18.668 20 16.8771 20 14.668C20 12.4588 18.2091 10.668 16 10.668C13.7909 10.668 12 12.4588 12 14.668C12 16.8771 13.7909 18.668 16 18.668Z'
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M23.5428 22.2089L17.8855 27.8663C17.3855 28.3658 16.7076 28.6464 16.0008 28.6464C15.2941 28.6464 14.6162 28.3658 14.1162 27.8663L8.4575 22.2089C6.9658 20.7172 5.94995 18.8165 5.53842 16.7474C5.12689 14.6783 5.33815 12.5336 6.14551 10.5846C6.95286 8.63554 8.32003 6.96966 10.0741 5.79762C11.8283 4.62558 13.8905 4 16.0002 4C18.1098 4 20.1721 4.62558 21.9262 5.79762C23.6803 6.96966 25.0475 8.63554 25.8548 10.5846C26.6622 12.5336 26.8734 14.6783 26.4619 16.7474C26.0504 18.8165 25.0345 20.7172 23.5428 22.2089V22.2089Z'
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_302_6083'>
          <rect width='32' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AddressIcon;
