import type { SVGProps } from 'react';

export interface AboutIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function AboutIcon({
  width = 33,
  height = 32,
  fill = '#86BDDF',
  title = 'About',
  ...props
}: AboutIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 33 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <path
        d='M14.9 3.2002C13.1326 3.2002 11.7 4.63288 11.7 6.4002V19.2002C11.7 20.9676 13.1326 22.4002 14.9 22.4002H24.5C26.2673 22.4002 27.7 20.9676 27.7 19.2002V10.2629C27.7 9.41424 27.3628 8.60031 26.7627 8.0002L22.9 4.13746C22.2998 3.53733 21.4859 3.2002 20.6372 3.2002H14.9Z'
        fill={fill}
      />
      <path
        d='M5.30005 12.7996C5.30005 11.0323 6.00024 9.59961 10.0002 9.59961V20.9996C10.0002 22.6565 11.3434 23.9996 13.0002 23.9996L21.3 23.9996C21.3 28.7996 19.8674 28.7996 18.1 28.7996H8.50005C6.73274 28.7996 5.30005 27.367 5.30005 25.5996V12.7996Z'
        fill={fill}
      />
    </svg>
  );
}
