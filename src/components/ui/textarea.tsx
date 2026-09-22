import * as React from 'react';
import { cn } from '@/lib/utils';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn('flex min-h-[96px] w-full rounded-xl border border-white/[.12] bg-[#08090d] px-3 py-2 text-sm text-[#f6f3ed] shadow-inner shadow-black/20 placeholder:text-[#697080] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff5a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131a] disabled:cursor-not-allowed disabled:opacity-50', className)} {...props} />
));
Textarea.displayName = 'Textarea';
