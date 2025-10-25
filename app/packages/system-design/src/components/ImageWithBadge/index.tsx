/* eslint-disable @next/next/no-img-element */
import { cn } from '../../utils';
import Badge from '../Badge';

export interface ImageWithBadgeProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  imageClassName?: string;
  badgeText: string;
  badgeBackgroundColor?: string;
  badgeTextColor?: string;
  badgeArrowColor?: string;
  badgeClassName?: string;
  priority?: boolean;
}

export default function ImageWithBadge({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  imageClassName,
  badgeText,
  badgeBackgroundColor = '#FFD9BD',
  badgeTextColor = '#1B1C1D',
  badgeArrowColor = '#FE7B1B',
  badgeClassName,
}: ImageWithBadgeProps) {
  const getBadgePositionClasses = () => {
    return 'absolute bottom-4 -left-[12px]';
  };

  return (
    <div className={cn('relative w-full rounded-xl', className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'w-full h-full min-h-70 sm:min-h-auto max-h-70 md:max-h-auto rounded-xl object-cover',
          imageClassName
        )}
      />

      <div className={cn(getBadgePositionClasses(), badgeClassName)}>
        <Badge
          backgroundColor={badgeBackgroundColor}
          textColor={badgeTextColor}
          arrowColor={badgeArrowColor}
        >
          {badgeText}
        </Badge>
      </div>
    </div>
  );
}
