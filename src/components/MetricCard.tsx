import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export default function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'text-indigo-600' }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className={cn('w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center', iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <span className={cn(
              'text-sm font-medium',
              changeType === 'positive' && 'text-green-600',
              changeType === 'negative' && 'text-red-600',
              changeType === 'neutral' && 'text-gray-500',
            )}>
              {change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
