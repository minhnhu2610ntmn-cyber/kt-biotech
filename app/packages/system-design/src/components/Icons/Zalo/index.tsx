import type { SVGProps } from 'react';

export interface ZaloIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
  fill?: string;
}

export default function ZaloIcon({
  width = 32,
  height = 32,
  fill = 'white',
  ...props
}: ZaloIconProps) {
  return (
    <svg
      className='scale-[1.5]'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      {...props}
    >
      <rect width='24' height='24' rx='4' fill='url(#pattern0_351_11935)' />
      <defs>
        <pattern
          id='pattern0_351_11935'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use xlinkHref='#image0_351_11935' transform='scale(0.00444444)' />
        </pattern>
        <image
          id='image0_351_11935'
          width='225'
          height='225'
          preserveAspectRatio='none'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
}
