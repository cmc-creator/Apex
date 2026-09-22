import { cn } from '@/lib/utils';

interface NyxApexLogoProps { className?: string; markOnly?: boolean; }

export default function NyxApexLogo({ className, markOnly = false }: NyxApexLogoProps) {
  return <div className={cn('flex items-center gap-3', className)}>
    <svg aria-label="NyxApex" className="h-10 w-10 shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 3 42 13.5v21L24 45 6 34.5v-21L24 3Z" fill="#C8FF5A" />
      <path d="m13 32 10.8-18L35 32h-6.1l-5.1-9.5L18.7 32H13Z" fill="#08090D" />
      <path d="M20.5 27.2h6.7" stroke="#C8FF5A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M10 11.5h8" stroke="#08090D" strokeWidth="2" strokeLinecap="round" opacity=".72" />
    </svg>
    {!markOnly && <div><p className="text-xl font-semibold tracking-[-.065em] text-white">NyxApex</p><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#C8FF5A]">Client operating system</p></div>}
  </div>;
}
