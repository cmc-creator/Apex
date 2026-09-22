'use client';
import { Search, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}

export default function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <header className="bg-[#f8f7f4]/90 backdrop-blur border-b border-[#e8e5df] px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#262624]">{title}</h1>
        {subtitle && <p className="text-sm text-[#6f6d67] mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98958f]" />
          <Input placeholder="Search your workspace..." className="pl-9 w-64" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        {action && (
          <Button onClick={action.onClick}>
            <Plus className="h-4 w-4 mr-2" />
            {action.label}
          </Button>
        )}
      </div>
    </header>
  );
}
