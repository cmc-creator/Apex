import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variant === 'default' && 'bg-indigo-600 text-white',
        variant === 'secondary' && 'bg-gray-100 text-gray-900',
        variant === 'destructive' && 'bg-red-500 text-white',
        variant === 'outline' && 'border border-gray-200 text-gray-900',
        className
      )}
      {...props}
    />
  );
}
