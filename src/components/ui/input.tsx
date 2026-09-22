import * as React from 'react';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input ref={ref} type={type} className={cn('flex h-10 w-full rounded-xl border border-white/[.12] bg-[#08090d] px-3 py-2 text-sm text-[#f6f3ed] shadow-inner shadow-black/20 placeholder:text-[#697080] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff5a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131a] disabled:cursor-not-allowed disabled:opacity-50', className)} {...props} />
));
Input.displayName = 'Input';
