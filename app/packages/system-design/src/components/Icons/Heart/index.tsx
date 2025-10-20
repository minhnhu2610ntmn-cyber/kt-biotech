import type { SVGProps } from 'react';

export interface HeartIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function HeartIcon({
  width = 32,
  height = 32,
  fill = '#86BDDF',
  title = 'Heart',
  ...props
}: HeartIconProps) {
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
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.07446 8.2749C7.57382 5.77555 11.6261 5.77555 14.1254 8.2749L15.9999 10.1494L17.8745 8.2749C20.3739 5.77555 24.426 5.77555 26.9254 8.2749C29.4247 10.7743 29.4247 14.8265 26.9254 17.3258L15.9999 28.2514L5.07446 17.3258C2.57512 14.8265 2.57512 10.7743 5.07446 8.2749Z'
        fill={fill}
      />
    </svg>
  );
}
