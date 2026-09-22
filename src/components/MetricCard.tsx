import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps { title: string; value: string; change?: string; changeType?: 'positive' | 'negative' | 'neutral'; icon: LucideIcon; iconColor?: string; }

export default function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'text-[#1d5a51]' }: MetricCardProps) {
  return <Card className="group overflow-hidden"><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="eyebrow">{title}</p><p className="mt-3 text-3xl font-semibold tracking-[-.05em] text-[#182321]">{value}</p></div><div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5efeb] transition-transform duration-300 group-hover:scale-110', iconColor)}><Icon className="h-5 w-5" /></div></div>{change && <p className={cn('mt-4 text-sm font-medium', changeType === 'positive' && 'text-[#1d7461]', changeType === 'negative' && 'text-[#a84e39]', changeType === 'neutral' && 'text-[#68736f]')}>{change}</p>}</CardContent></Card>;
}
