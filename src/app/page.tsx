'use client';
import { useEffect, useState } from 'react';
import { DollarSign, FolderOpen, FileText, Users, Plus, ArrowRight } from 'lucide-react';
import { getAppData } from '@/lib/storage';
import { AppData } from '@/lib/types';
import MetricCard from '@/components/MetricCard';
import RevenueChart from '@/components/RevenueChart';
import ActivityFeed from '@/components/ActivityFeed';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Dashboard() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    setData(getAppData());
  }, []);

  if (!data) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
    </div>
  );

  const totalRevenue = data.clients.reduce((s, c) => s + c.totalRevenue, 0);
  const activeProjects = data.projects.filter(p => p.status === 'active').length;
  const pendingInvoices = data.invoices.filter(i => ['sent', 'viewed', 'overdue'].includes(i.status));
  const pendingAmount = pendingInvoices.reduce((s, i) => s + i.total, 0);
  const newLeads = data.clients.filter(c => c.status === 'lead').length;
  const upcomingMeetings = data.meetings.slice(0, 3);

  return (
    <div className="flex-1">
      <Header title="Dashboard" subtitle="Welcome back, John! Here's what's happening." />
      
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Revenue" value={formatCurrency(totalRevenue)} change="+12% this month" changeType="positive" icon={DollarSign} />
          <MetricCard title="Active Projects" value={String(activeProjects)} change={`${data.projects.length} total`} changeType="neutral" icon={FolderOpen} />
          <MetricCard title="Pending Invoices" value={formatCurrency(pendingAmount)} change={`${pendingInvoices.length} invoices`} changeType="negative" icon={FileText} />
          <MetricCard title="New Leads" value={String(newLeads)} change="This month" changeType="positive" icon={Users} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Meetings</CardTitle>
              <Link href="/scheduling">
                <Button variant="ghost" size="sm">View all <ArrowRight className="w-3 h-3 ml-1" /></Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-indigo-700 text-xs font-bold">{new Date(meeting.date).getDate()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                      <p className="text-xs text-gray-500">{formatDate(meeting.date)} · {meeting.duration}min</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent><ActivityFeed /></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'New Client', href: '/clients', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                  { label: 'New Invoice', href: '/invoices', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                  { label: 'New Project', href: '/projects', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
                  { label: 'New Contract', href: '/contracts', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
                  { label: 'Log Expense', href: '/finances', color: 'bg-pink-50 text-pink-700 hover:bg-pink-100' },
                  { label: 'Schedule Meeting', href: '/scheduling', color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
                ].map(({ label, href, color }) => (
                  <Link key={label} href={href}>
                    <div className={`p-4 rounded-lg text-sm font-medium text-center cursor-pointer transition-colors ${color}`}>
                      <Plus className="w-5 h-5 mx-auto mb-1" />
                      {label}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
