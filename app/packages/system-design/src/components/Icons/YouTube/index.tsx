import type { SVGProps } from 'react';

export interface YouTubeIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function YouTubeIcon({
  width = 32,
  height = 32,
  title = 'YouTube',
  ...props
}: YouTubeIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <g clipPath='url(#clip0_302_6047)'>
        <path
          d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z'
          fill='#FF0000'
        />
        <path
          d='M24.5653 13.7209C24.5653 12.7014 24.1603 11.7237 23.4394 11.0028C22.7185 10.282 21.7408 9.87695 20.7213 9.87695H10.8988C9.87932 9.87695 8.9016 10.282 8.18071 11.0028C7.45983 11.7237 7.05482 12.7014 7.05482 13.7209V18.2885C7.05482 19.308 7.45983 20.2857 8.18071 21.0066C8.9016 21.7275 9.87932 22.1325 10.8988 22.1325H20.7213C21.7408 22.1325 22.7185 21.7275 23.4394 21.0066C24.1603 20.2857 24.5653 19.308 24.5653 18.2885V13.7209ZM18.7857 16.3439L14.381 18.5237C14.2092 18.6232 13.6213 18.5237 13.6213 18.2976V13.8204C13.6213 13.6215 14.2182 13.5039 14.3901 13.6034L18.6049 15.8917C18.7767 15.9912 18.9666 16.2535 18.7857 16.3439Z'
          fill='#FAFAFA'
        />
      </g>
      <defs>
        <clipPath id='clip0_302_6047'>
          <rect width='32' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
