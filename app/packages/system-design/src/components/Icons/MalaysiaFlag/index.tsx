import type { SVGProps } from 'react';

export interface MalaysiaFlagIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function MalaysiaFlagIcon({
  width = 115,
  height = 105,
  title = 'Malaysia Flag',
  ...props
}: MalaysiaFlagIconProps) {
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
      <g clipPath='url(#clip0_292_4967)'>
        <mask
          id='mask0_292_4967'
          style={{ maskType: 'luminance' } as any}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='140'
          height='105'
        >
          <path d='M0 0H140V105H0V0Z' fill='white' />
        </mask>
        <g mask='url(#mask0_292_4967)'>
          <path d='M0 0H140V105H0V0Z' fill='#CC0000' />
          <path d='M0 0H140V7.50312H0V0Z' fill='#CC0000' />
          <path d='M0 7.50391H140V15.007H0V7.50391Z' fill='#FAFAFA' />
          <path d='M0 15.0059H140V22.509H0V15.0059Z' fill='#CC0000' />
          <path d='M0 22.5098H140V29.9691H0V22.5098Z' fill='#FAFAFA' />
          <path d='M0 29.9902H140V37.4934H0V29.9902Z' fill='#CC0000' />
          <path d='M0 37.4941H140V44.9973H0V37.4941Z' fill='#FAFAFA' />
          <path d='M0 44.9961H140V52.4992H0V44.9961Z' fill='#CC0000' />
          <path d='M0 52.5H140V60.0031H0V52.5Z' fill='#FAFAFA' />
          <path d='M0 60.0039H140V67.507H0V60.0039Z' fill='#CC0000' />
          <path d='M0 67.5059H140V75.009H0V67.5059Z' fill='#FAFAFA' />
          <path d='M0 75.0098H140V82.4691H0V75.0098Z' fill='#CC0000' />
          <path d='M0 82.4902H140V89.9934H0V82.4902Z' fill='#FAFAFA' />
          <path d='M0 89.9941H140V97.4973H0V89.9941Z' fill='#CC0000' />
          <path d='M0 97.4961H140V104.999H0V97.4961Z' fill='#FAFAFA' />
          <path d='M0 0.109375H70V60.1125H0V0.109375Z' fill='#000066' />
          <path
            d='M45.3906 16.1438L46.7031 25.047L51.7344 17.6095L49.0219 26.1845L56.7875 21.6345L50.6406 28.197L59.6094 27.497L51.2312 30.7345L59.6094 33.972L50.6406 33.272L56.7875 39.8345L49.0219 35.2845L51.7125 43.8813L46.6812 36.422L45.3687 45.3251L44.0781 36.422L39.0469 43.8595L41.7594 35.2845L33.9937 39.8345L40.1187 33.272L31.15 33.972L39.55 30.7345L31.1719 27.497L40.1406 28.197L33.9937 21.6345L41.7594 26.1845L39.0469 17.5876L44.0781 25.047L45.3906 16.1438ZM38.1062 16.5157C35.738 15.4559 33.1419 15.0064 30.5552 15.208C27.9685 15.4097 25.4735 16.2562 23.2981 17.6702C21.1227 19.0842 19.3362 21.0207 18.1017 23.3028C16.8673 25.5849 16.2242 28.1399 16.2312 30.7345C16.2242 33.329 16.8673 35.884 18.1017 38.1661C19.3362 40.4482 21.1227 42.3847 23.2981 43.7987C25.4735 45.2127 27.9685 46.0592 30.5552 46.2609C33.1419 46.4625 35.738 46.013 38.1062 44.9532C35.491 46.8318 32.4081 47.9524 29.197 48.1917C25.9859 48.431 22.771 47.7797 19.9062 46.3095C17.0447 44.8372 14.6446 42.6045 12.9697 39.8567C11.2948 37.1089 10.4099 33.9525 10.4125 30.7345C10.4135 27.5172 11.3015 24.3626 12.9787 21.6171C14.6559 18.8717 17.0574 16.6417 19.9195 15.1723C22.7815 13.7028 25.9932 13.0508 29.2017 13.2878C32.4101 13.5248 35.4912 14.6417 38.1062 16.5157Z'
            fill='#FFCC00'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_292_4967'>
          <rect width='140' height='105' rx='8' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
