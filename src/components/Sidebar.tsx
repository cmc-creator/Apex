'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FolderKanban, FileText, FileCheck, Calendar, TrendingUp, Globe, Settings, Sparkles, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/invoices', label: 'Invoices', icon: FileText },
  { href: '/contracts', label: 'Contracts', icon: FileCheck },
  { href: '/scheduling', label: 'Scheduling', icon: Calendar },
  { href: '/finances', label: 'Finances', icon: TrendingUp },
  { href: '/portal', label: 'Client Portal', icon: Globe },
  { href: '/strategy', label: 'Growth Strategy', icon: Rocket },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#243a38] flex flex-col z-30">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#e9cbae] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#243a38]" />
          </div>
          <span className="text-white text-xl font-bold">Apex</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 pb-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-[#c9d6d3] hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#c9d6d3] hover:bg-white/10 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-[#4e7772] flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <div>
            <p className="text-white text-sm font-medium">Your workspace</p>
            <p className="text-[#aec3bf] text-xs">Client operations</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
