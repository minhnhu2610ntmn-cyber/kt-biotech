import type { ImgHTMLAttributes } from 'react';
import { cn } from '../../../utils';

export interface QatarFlagIconProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  title?: string;
}

export default function QatarFlagIcon({
  width,
  height,
  title = 'Qatar Flag',
  className,
  style,
  ...props
}: QatarFlagIconProps) {
  // Apply width/height as inline styles if provided, but className should take precedence for responsive sizing
  const combinedStyle =
    width || height
      ? {
          ...(width && {
            width: typeof width === 'number' ? `${width}px` : width,
          }),
          ...(height && {
            height: typeof height === 'number' ? `${height}px` : height,
          }),
          ...style,
        }
      : style;

  return (
    <img
      src='/qatar.png'
      alt={title}
      className={cn('rounded-lg object-cover', className)}
      style={combinedStyle}
      aria-label={title}
      role='img'
      {...props}
    />
  );
}
