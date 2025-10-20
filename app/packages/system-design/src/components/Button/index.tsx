import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary - KTBioTech brand blue
        default:
          'bg-primary text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-kt-primary',
        // Secondary - Gray variant
        secondary:
          'bg-secondary text-white hover:bg-secondary-600 focus-visible:ring-secondary-500',
        // Outline - Border with hover
        outline:
          'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus-visible:ring-primary-500',
        // Destructive - Error/Delete actions
        destructive:
          'bg-error text-white hover:bg-error-dark focus-visible:ring-error-500 shadow-kt-success',
        // Success - Success actions
        success:
          'bg-success text-white hover:bg-success-dark focus-visible:ring-success-500 shadow-kt-success',
        // Warning - Warning actions
        warning:
          'bg-warning text-white hover:bg-warning-dark focus-visible:ring-warning-500',
        // Info - Information actions
        info: 'bg-info text-white hover:bg-info-dark focus-visible:ring-info-500',
        // Ghost - Transparent with hover
        ghost:
          'text-primary hover:bg-primary-50 hover:text-primary-700 focus-visible:ring-primary-500',
        // Link - Text link style
        link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-primary-500',
        // Accent - Purple accent color
        accent:
          'bg-accent-purple text-white hover:bg-accent-purple/90 focus-visible:ring-accent-purple/50 shadow-kt-accent',
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
