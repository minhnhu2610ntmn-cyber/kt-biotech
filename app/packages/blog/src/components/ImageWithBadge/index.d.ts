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
export default function ImageWithBadge({ src, alt, width, height, className, imageClassName, badgeText, badgeBackgroundColor, badgeTextColor, badgeArrowColor, badgeClassName, }: ImageWithBadgeProps): import("react/jsx-runtime").JSX.Element;
