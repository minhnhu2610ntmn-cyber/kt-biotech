import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary - Brand blue #3691C9
        default:
          'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-300 shadow-kt-primary',
        // Secondary - Light gray background with dark text
        secondary:
          'bg-kt-light-gray text-kt-dark-gray hover:bg-kt-border-gray active:bg-kt-light-gray focus-visible:ring-primary-200',
        // Outline - Primary border, fill on hover
        outline:
          'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:bg-primary-700 focus-visible:ring-primary-300',
        // Destructive - Error palette
        destructive:
          'bg-error text-white hover:bg-error-dark active:bg-error-dark focus-visible:ring-error-light',
        // Success
        success:
          'bg-success text-white hover:bg-success-dark active:bg-success-dark focus-visible:ring-success-light',
        // Warning
        warning:
          'bg-warning text-white hover:bg-warning-dark active:bg-warning-dark focus-visible:ring-warning-light',
        // Info
        info: 'bg-info text-white hover:bg-info-dark active:bg-info-dark focus-visible:ring-info-light',
        // Ghost - subtle primary
        ghost:
          'text-primary hover:bg-primary/10 hover:text-primary-700 active:bg-primary/20 focus-visible:ring-primary-200',
        // Link - text style
        link: 'text-primary underline-offset-4 hover:underline active:text-primary-700 focus-visible:ring-primary-200',
        // Accent - Purple accent
        accent:
          'bg-accent-purple text-white hover:bg-accent-purple/90 active:bg-accent-purple/95 focus-visible:ring-accent-purple/40 shadow-kt-accent',
      },
      size: {
        sm: 'h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        lg: 'h-10 rounded-md px-6 text-base has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
