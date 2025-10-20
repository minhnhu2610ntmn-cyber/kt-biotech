import type { SVGProps } from 'react';

export interface JapanFlagIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function JapanFlagIcon({
  width = 140,
  height = 105,
  title = 'Japan Flag',
  ...props
}: JapanFlagIconProps) {
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
      <mask
        id='mask0_292_4952'
        style={{ maskType: 'luminance' } as any}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='140'
        height='105'
      >
        <path
          d='M0 8C0 3.58172 3.58172 0 8 0H132C136.418 0 140 3.58172 140 8V97C140 101.418 136.418 105 132 105H8C3.58172 105 0 101.418 0 97V8Z'
          fill='white'
        />
      </mask>
      <g mask='url(#mask0_292_4952)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M-8.75 8C-8.75 3.58172 -5.16828 0 -0.75 0H140.75C145.168 0 148.75 3.58172 148.75 8V97C148.75 101.418 145.168 105 140.75 105H-0.75C-5.16828 105 -8.75 101.418 -8.75 97V8Z'
          fill='#FAFAFA'
        />
        <path
          d='M70.0118 85.1438C88.0374 85.1438 102.65 70.5312 102.65 52.5055C102.65 34.4799 88.0374 19.8672 70.0118 19.8672C51.9861 19.8672 37.3735 34.4799 37.3735 52.5055C37.3735 70.5312 51.9861 85.1438 70.0118 85.1438Z'
          fill='#BC002D'
        />
      </g>
    </svg>
  );
}
