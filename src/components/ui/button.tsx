import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} className={cn(
      'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d5a51] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]',
      variant === 'default' && 'bg-[#1d5a51] text-white shadow-[0_8px_18px_-10px_rgba(18,59,53,.8)] hover:bg-[#123b35]',
      variant === 'destructive' && 'bg-[#a84e39] text-white hover:bg-[#913d2b]',
      variant === 'outline' && 'border border-[#d9ddd7] bg-white/80 text-[#182321] hover:border-[#a8c2ba] hover:bg-[#eaf2ee]',
      variant === 'secondary' && 'bg-[#e5efeb] text-[#1d5a51] hover:bg-[#d5e6df]',
      variant === 'ghost' && 'text-[#3c514c] hover:bg-[#eaf2ee] hover:text-[#123b35]',
      variant === 'link' && 'text-[#1d5a51] underline-offset-4 hover:underline',
      size === 'default' && 'h-10 px-4 py-2 text-sm', size === 'sm' && 'h-8 px-3 text-xs', size === 'lg' && 'h-12 px-6 text-sm', size === 'icon' && 'h-10 w-10', className
    )} {...props} />;
  }
);
Button.displayName = 'Button';
