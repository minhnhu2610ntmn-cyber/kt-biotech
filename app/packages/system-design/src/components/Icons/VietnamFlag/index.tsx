import type { SVGProps } from 'react';

export interface VietnamFlagIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function VietnamFlagIcon({
  width = 22,
  height = 18,
  title = 'Vietnam Flag',
  ...props
}: VietnamFlagIconProps) {
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
      <mask
        id='mask0_292_6383'
        style={{ maskType: 'luminance' } as any}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='22'
        height='18'
      >
        <path d='M0.00109863 0.5H21.999V17.5H0.00109863V0.5Z' fill='white' />
      </mask>
      <g mask='url(#mask0_292_6383)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M-1.375 0.5H23.375V17.5H-1.375V0.5Z'
          fill='#DA251D'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.0164 13.1508L11.1289 10.9361L8.26074 13.1707L9.32422 9.53164L6.45605 7.28379L10.0042 7.25059L11.1063 3.61816L12.2246 7.24062L15.7728 7.24395L12.9207 9.51504L14.0132 13.1541L14.0164 13.1508Z'
          fill='#FED56B'
        />
      </g>
    </svg>
  );
}
