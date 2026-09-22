'use client';
import { Bell, Command, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps { title: string; subtitle?: string; action?: { label: string; onClick: () => void }; }
export default function Header({ title, subtitle, action }: HeaderProps) {
  return <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e2e4df] bg-[#f6f5f1]/80 px-5 py-4 backdrop-blur-xl lg:px-9">
    <div className="flex items-center gap-3"><div><p className="eyebrow hidden sm:block">Apex workspace</p><h1 className="text-xl font-semibold tracking-[-.04em] text-[#182321] sm:mt-1 sm:text-2xl">{title}</h1>{subtitle && <p className="mt-1 hidden text-sm text-[#68736f] lg:block">{subtitle}</p>}</div></div>
    <div className="flex items-center gap-2 sm:gap-3"><div className="relative hidden md:block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#82908b]" /><Input placeholder="Search everything" className="h-10 w-60 rounded-xl border-[#dfe3dd] bg-white/75 pl-9 pr-10 shadow-none" /><Command className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#a1aaa6]" /></div><Button variant="ghost" size="icon" className="relative"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#d7b475] ring-2 ring-[#f6f5f1]" /></Button>{action && <Button onClick={action.onClick} className="hidden sm:inline-flex"><Plus className="mr-2 h-4 w-4" />{action.label}</Button>}</div>
  </header>;
}
