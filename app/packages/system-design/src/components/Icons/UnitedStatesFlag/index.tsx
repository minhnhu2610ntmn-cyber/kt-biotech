import type { ImgHTMLAttributes } from 'react';

export interface UnitedStatesFlagIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  title?: string;
}

export default function UnitedStatesFlagIcon({
  title = 'United States Flag',
  className = '',
  ...props
}: UnitedStatesFlagIconProps) {
  return (
    <img
      src="/images/4ddd9472a853ad10ecfbf1cbfff915f9.jpg"
      alt={title}
      className={className}
      {...props}
    />
  );
}
