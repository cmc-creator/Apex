'use client';
import { Mail, Phone, Video, FileText, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Activity {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  date: string;
}

const activities: Activity[] = [
  { id: '1', type: 'email', title: 'Email sent to TechCorp', subtitle: 'Project proposal follow-up', date: '2025-01-15' },
  { id: '2', type: 'invoice', title: 'Invoice #INV-002 paid', subtitle: '$20,600 received from HealthTech', date: '2024-11-15' },
  { id: '3', type: 'call', title: 'Call with StartupXYZ', subtitle: 'Discovery call - 45 minutes', date: '2025-01-08' },
  { id: '4', type: 'video', title: 'Meeting with RetailMax', subtitle: 'Project kickoff meeting', date: '2025-01-15' },
  { id: '5', type: 'invoice', title: 'Invoice #INV-003 sent', subtitle: '$18,360 to TechCorp Solutions', date: '2025-01-01' },
];

const iconMap: Record<string, React.ElementType> = {
  email: Mail,
  invoice: FileText,
  call: Phone,
  video: Video,
};

export default function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = iconMap[activity.type] || Clock;
        return (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.subtitle}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0">{formatDate(activity.date)}</span>
          </div>
        );
      })}
    </div>
  );
}
