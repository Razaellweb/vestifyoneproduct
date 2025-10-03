import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-base bg-[var(--card)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--ring)]',
        className
      )}
      {...props}
    />
  );
});
