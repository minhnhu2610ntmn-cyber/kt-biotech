import type { SVGProps } from 'react';

export interface TimelineItemIconProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

export default function TimelineItemIcon({
  width = 18,
  height = 18,
  title = 'Timeline Item',
  ...props
}: TimelineItemIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label={title}
      role='img'
      {...props}
    >
      <circle
        cx='9'
        cy='9'
        r='7.5'
        transform='rotate(90 9 9)'
        fill='#5FA7D3'
        stroke='#AFD3E9'
        strokeWidth='3'
      />
    </svg>
  );
}
