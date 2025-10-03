import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
  {
    variants: {
      variant: {
        default: 'bg-[var(--primary)] text-[var(--primary-contrast)] hover:brightness-110',
        gradient: 'bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-white hover:brightness-110',
        ghost: 'bg-transparent border border-base text-[var(--fg)] hover:bg-white/5',
        outline: 'bg-transparent border border-base text-[var(--fg)]',
      },
      size: {
        sm: 'text-xs px-3 py-2',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-base px-6 py-3',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
