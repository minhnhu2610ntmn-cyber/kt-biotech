import { Badge, cn } from '@ktbiotech/system-design';
import Image from 'next/image';

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

  // Convert width and height to numbers for Next.js Image
  const imageWidth =
    typeof width === 'string' ? parseInt(width, 10) || 400 : width || 400;
  const imageHeight =
    typeof height === 'string' ? parseInt(height, 10) || 300 : height || 300;

  return (
    <div className={cn('relative w-full rounded-xl', className)}>
      <div className='relative w-full h-full min-h-70 sm:min-h-auto max-h-70 md:max-h-auto rounded-xl overflow-hidden'>
        <Image
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className={cn('w-full h-full object-cover', imageClassName)}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

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
