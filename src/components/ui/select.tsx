import * as React from 'react';
import { cn } from '@/lib/utils';
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { placeholder?: string; }
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn('flex h-10 w-full rounded-xl border border-white/[.12] bg-[#08090d] px-3 py-2 text-sm text-[#f6f3ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff5a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131a] disabled:cursor-not-allowed disabled:opacity-50', className)} {...props}>{children}</select>
));
Select.displayName = 'Select';
