'use client';
import { useEffect, useState } from 'react';
import { DollarSign, FolderOpen, FileText, Users, Plus, ArrowRight, Sparkles, UserRoundPlus, Upload, CalendarDays, CircleCheck } from 'lucide-react';
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
      <div className="animate-spin w-8 h-8 border-4 border-[#365d59] border-t-transparent rounded-full" />
    </div>
  );

  const isEmptyWorkspace = data.clients.length + data.projects.length + data.invoices.length + data.contracts.length + data.meetings.length + data.expenses.length === 0;
  if (isEmptyWorkspace) return (
    <div className="flex-1">
      <Header title="Your client workspace" subtitle="Set up a calm, connected home for your client work." />
      <main className="p-6 lg:p-10 max-w-6xl mx-auto space-y-6">
        <section className="rounded-3xl bg-[#243a38] text-white p-8 lg:p-12 overflow-hidden relative">
          <div className="relative max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] text-[#c9d6d3] font-semibold">Welcome to Apex</p>
            <h2 className="mt-3 text-3xl lg:text-5xl font-semibold tracking-tight">A thoughtful home for every client relationship.</h2>
            <p className="mt-4 text-base lg:text-lg text-[#d9e5e2]">Start with a client, then guide work from inquiry to invoice without losing the details that matter.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href="/clients"><Button className="bg-[#e9cbae] text-[#243a38] hover:bg-[#f5d9bd]"><UserRoundPlus className="mr-2 h-4 w-4" /> Add your first client</Button></Link><Link href="/settings"><Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"><Upload className="mr-2 h-4 w-4" /> Prepare an import</Button></Link></div>
          </div>
          <div className="absolute -right-12 -bottom-16 h-64 w-64 rounded-full bg-[#4e7772] opacity-60" />
        </section>
        <section className="grid md:grid-cols-3 gap-4">
          {[{ icon: UserRoundPlus, title: 'Build your client list', text: 'Capture contact details, context, and next steps in one place.' }, { icon: CalendarDays, title: 'Map the work', text: 'Turn conversations into projects, meetings, and clear milestones.' }, { icon: CircleCheck, title: 'Get paid with clarity', text: 'Track contracts and invoices alongside the relationships they support.' }].map(({ icon: Icon, title, text }, index) => <Card key={title} className="border-[#e8e5df] shadow-none"><CardContent className="p-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f0ee] text-[#365d59]"><Icon className="h-5 w-5" /></div><p className="mt-5 text-sm text-[#98958f]">0{index + 1}</p><h3 className="mt-1 text-lg font-semibold text-[#262624]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6f6d67]">{text}</p></CardContent></Card>)}</section>
      </main>
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
      <Header title="Dashboard" subtitle="A focused view of your client work, revenue, and priorities." />
      
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-600" /> In-Product Conversion Prompts</CardTitle>
            <Link href="/compare">
              <Button variant="ghost" size="sm">View proof <ArrowRight className="w-3 h-3 ml-1" /></Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { step: 'Proposal Sent', text: 'Generate contract + invoice in one flow to cut setup time.' },
                { step: 'Contract Signed', text: 'Launch payment-ready invoice now and reduce time-to-cash.' },
                { step: 'Invoice Viewed', text: 'Send one-tap payment reminder to improve conversion.' },
              ].map(({ step, text }) => (
                <div key={step} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{step}</p>
                  <p className="text-sm text-gray-700 mt-1">{text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
