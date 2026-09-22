'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FolderKanban, FileText, FileCheck, Calendar, TrendingUp, Globe, Settings, Sparkles, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard }, { href: '/clients', label: 'Client library', icon: Users },
  { href: '/projects', label: 'Projects', icon: FolderKanban }, { href: '/invoices', label: 'Billing', icon: FileText },
  { href: '/contracts', label: 'Agreements', icon: FileCheck }, { href: '/scheduling', label: 'Calendar', icon: Calendar },
  { href: '/finances', label: 'Insights', icon: TrendingUp }, { href: '/portal', label: 'Client portal', icon: Globe },
  { href: '/strategy', label: 'Growth studio', icon: Rocket },
];

export default function Sidebar() {
  const pathname = usePathname();
  return <aside className="fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-[#123b35] p-4 lg:flex">
    <Link href="/" className="mb-9 flex items-center gap-3 px-3 pt-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#d7b475] text-[#123b35]"><Sparkles className="h-5 w-5" /></div><div><p className="text-lg font-semibold tracking-[-.04em] text-white">Apex</p><p className="text-[10px] font-medium uppercase tracking-[.2em] text-[#a9c5bd]">Client studio</p></div></Link>
    <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#83a49b]">Workspace</p>
    <nav className="flex-1 space-y-1">{navItems.map(({ href, label, icon: Icon }) => { const active = pathname === href || (href !== '/' && pathname.startsWith(href)); return <Link key={href} href={href} className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all', active ? 'bg-white text-[#123b35] shadow-sm' : 'text-[#c8d9d3] hover:bg-white/10 hover:text-white')}><Icon className="h-[18px] w-[18px]" />{label}</Link>; })}</nav>
    <div className="rounded-2xl border border-white/10 bg-white/[.06] p-3"><p className="text-xs font-semibold text-white">Build the business, not the busywork.</p><p className="mt-1 text-xs leading-5 text-[#bad1ca]">Keep every relationship, decision, and payment in one calm place.</p><Link href="/settings" className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#e8c98e] hover:text-white"><Settings className="h-3.5 w-3.5" /> Workspace settings</Link></div>
  </aside>;
}
