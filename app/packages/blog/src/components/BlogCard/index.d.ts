export interface BlogCardProps {
    title: string;
    author: string;
    date: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    badgeText: string;
    badgeBackgroundColor?: string;
    badgeTextColor?: string;
    badgeArrowColor?: string;
    href?: string;
    slug?: string;
    className?: string;
    imageClassName?: string;
    priority?: boolean;
    direction?: 'row' | 'column';
}
export default function BlogCard({ title, author, date, description, imageSrc, imageAlt, badgeText, badgeBackgroundColor, badgeTextColor, badgeArrowColor, href, slug, className, imageClassName, priority: _priority, direction, }: BlogCardProps): import("react/jsx-runtime").JSX.Element;
