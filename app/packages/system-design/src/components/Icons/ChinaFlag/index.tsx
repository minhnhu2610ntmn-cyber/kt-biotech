import type { SVGProps } from 'react';

export interface ChinaFlagIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function ChinaFlagIcon({
  width = 140,
  height = 105,
  title = 'China Flag',
  ...props
}: ChinaFlagIconProps) {
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
      <g clipPath='url(#clip0_292_4868)'>
        <path d='M0 0H140V105H0V0Z' fill='#EE1C25' />
        <path
          d='M16.8001 38.85L26.25 10.5L35.6999 38.85L10.5002 21.525H41.9998L16.8001 38.85Z'
          fill='#FFFF00'
        />
        <path
          d='M57.7874 11.0426L48.0623 13.1977L54.5493 5.63848L53.913 15.8123L48.5162 6.8054L57.7874 11.0426Z'
          fill='#FFFF00'
        />
        <path
          d='M67.6023 23.4824L57.8026 21.697L66.7136 17.2454L62.1814 26.3761L60.7001 15.9811L67.6023 23.4824Z'
          fill='#FFFF00'
        />
        <path
          d='M66.1719 40.9329L57.9524 35.3059L67.9042 34.8757L60.0422 41.364L62.9293 31.2687L66.1719 40.9329Z'
          fill='#FFFF00'
        />
        <path
          d='M53.81 52.333L48.4016 43.968L57.7473 47.4149L47.9894 50.3632L54.5515 42.1664L53.81 52.333Z'
          fill='#FFFF00'
        />
      </g>
      <defs>
        <clipPath id='clip0_292_4868'>
          <rect width='140' height='105' rx='8' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
