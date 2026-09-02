'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, FolderKanban, FileText, FileCheck, Calendar, TrendingUp, Globe, Settings, Zap, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppUser, getCurrentUser } from '@/lib/auth';

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
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const initials = user?.name
    ?.split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'JD';

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-indigo-900 flex flex-col z-30">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-400 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl font-bold">Apex CRM</span>
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
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-indigo-800">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-200 hover:bg-indigo-800 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
            {initials}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{user?.name ?? 'Guest user'}</p>
            <p className="text-indigo-300 text-xs">{user ? user.role : 'Not signed in'}</p>
          </div>
        </div>
        <Link
          href={user ? '/settings' : '/login'}
          className="mt-2 block w-full rounded-lg border border-indigo-700 px-3 py-2 text-center text-xs font-medium text-indigo-100 hover:bg-indigo-800"
        >
          {user ? 'Manage account' : 'Sign in'}
        </Link>
      </div>
    </aside>
  );
}
