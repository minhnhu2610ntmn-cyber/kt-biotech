'use client';

import React from 'react';
import { cn } from '../../utils';

export interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'white';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  decoration?: 'underline' | 'line-through' | 'no-underline';
  italic?: boolean;
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TextProps extends TypographyProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  variant?: 'body' | 'caption' | 'overline' | 'subtitle';
}

export interface LinkProps extends TypographyProps {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  underline?: boolean;
  external?: boolean;
}

// Base Typography component
export const Typography: React.FC<TypographyProps> = ({
  children,
  className = '',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  transform = 'normal-case',
  decoration = 'no-underline',
  italic = false,
  truncate = false,
  lineClamp,
}) => {
  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    muted: 'text-gray-500',
    white: 'text-white',
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const transformClasses = {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    'normal-case': 'normal-case',
  };

  const decorationClasses = {
    underline: 'underline',
    'line-through': 'line-through',
    'no-underline': 'no-underline',
  };

  const lineClampClasses = {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6',
  };

  const classes = cn(
    colorClasses[color],
    weightClasses[weight],
    alignClasses[align],
    transformClasses[transform],
    decorationClasses[decoration],
    italic && 'italic',
    truncate && 'truncate',
    lineClamp && lineClampClasses[lineClamp],
    className
  );

  return <span className={classes}>{children || ''}</span>;
};

// Heading component
export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className = '',
  color = 'primary',
  weight = 'bold',
  align = 'left',
  transform = 'normal-case',
  decoration = 'no-underline',
  italic = false,
  truncate = false,
  lineClamp,
}) => {
  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl',
  };

  const defaultWeight = {
    1: 'font-extrabold',
    2: 'font-bold',
    3: 'font-bold',
    4: 'font-semibold',
    5: 'font-semibold',
    6: 'font-medium',
  };

  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return React.createElement(
    HeadingTag,
    { className: cn(sizeClasses[level], defaultWeight[level], className) },
    React.createElement(
      Typography,
      {
        color,
        weight,
        align,
        transform,
        decoration,
        italic,
        truncate,
        lineClamp,
      },
      children
    )
  );
};

// Text component
export const Text: React.FC<TextProps> = ({
  size = 'base',
  variant = 'body',
  children,
  className = '',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  transform = 'normal-case',
  decoration = 'no-underline',
  italic = false,
  truncate = false,
  lineClamp,
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  const variantClasses = {
    body: '',
    caption: 'text-sm text-gray-500',
    overline: 'text-xs uppercase tracking-wider font-medium text-gray-500',
    subtitle: 'text-lg font-medium text-gray-700',
  };

  const defaultWeight = {
    body: 'font-normal',
    caption: 'font-normal',
    overline: 'font-medium',
    subtitle: 'font-medium',
  };

  return (
    <p className={cn(sizeClasses[size], variantClasses[variant], defaultWeight[variant], className)}>
      <Typography
        color={color}
        weight={weight}
        align={align}
        transform={transform}
        decoration={decoration}
        italic={italic}
        truncate={truncate}
        lineClamp={lineClamp}
      >
        {children}
      </Typography>
    </p>
  );
};

// Link component
export const Link: React.FC<LinkProps> = ({
  href,
  target = '_self',
  rel,
  underline = true,
  external = false,
  children,
  className = '',
  color = 'info',
  weight = 'normal',
  align = 'left',
  transform = 'normal-case',
  decoration = 'no-underline',
  italic = false,
  truncate = false,
  lineClamp,
}) => {
  const linkClasses = cn(
    'transition-colors duration-200',
    underline && 'underline',
    external && 'inline-flex items-center gap-1',
    className
  );

  const linkProps = href ? {
    href,
    target,
    rel: external ? 'noopener noreferrer' : rel,
  } : {};

  return (
    <a className={linkClasses} {...linkProps}>
      <Typography
        color={color}
        weight={weight}
        align={align}
        transform={transform}
        decoration={decoration}
        italic={italic}
        truncate={truncate}
        lineClamp={lineClamp}
      >
        {children}
      </Typography>
      {external && (
        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </a>
  );
};

// Code component
export const Code: React.FC<TypographyProps> = ({
  children,
  className = '',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  transform = 'normal-case',
  decoration = 'no-underline',
  italic = false,
  truncate = false,
  lineClamp,
}) => {
  return (
    <code className={cn(
      'bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono',
      className
    )}>
      <Typography
        color={color}
        weight={weight}
        align={align}
        transform={transform}
        decoration={decoration}
        italic={italic}
        truncate={truncate}
        lineClamp={lineClamp}
      >
        {children}
      </Typography>
    </code>
  );
};

// Blockquote component
export const Blockquote: React.FC<TypographyProps> = ({
  children,
  className = '',
  color = 'secondary',
  weight = 'normal',
  align = 'left',
  transform = 'normal-case',
  decoration = 'no-underline',
  italic = true,
  truncate = false,
  lineClamp,
}) => {
  return (
    <blockquote className={cn(
      'border-l-4 border-gray-300 pl-4 py-2 bg-gray-50',
      className
    )}>
      <Typography
        color={color}
        weight={weight}
        align={align}
        transform={transform}
        decoration={decoration}
        italic={italic}
        truncate={truncate}
        lineClamp={lineClamp}
      >
        {children}
      </Typography>
    </blockquote>
  );
};

// List components
export const List: React.FC<TypographyProps & { ordered?: boolean }> = ({
  children,
  className = '',
  ordered = false,
}) => {
  const Component = ordered ? 'ol' : 'ul';
  
  return (
    <Component className={cn(
      'space-y-1',
      ordered ? 'list-decimal list-inside' : 'list-disc list-inside',
      className
    )}>
      {children}
    </Component>
  );
};

export const ListItem: React.FC<TypographyProps> = ({
  children,
  className = '',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  transform = 'normal-case',
  decoration = 'no-underline',
  italic = false,
  truncate = false,
  lineClamp,
}) => {
  return (
    <li className={className}>
      <Typography
        color={color}
        weight={weight}
        align={align}
        transform={transform}
        decoration={decoration}
        italic={italic}
        truncate={truncate}
        lineClamp={lineClamp}
      >
        {children}
      </Typography>
    </li>
  );
};