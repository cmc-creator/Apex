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
      <Header title="Your command center" subtitle="A considered home for client work, decisions, and momentum." />
      <main className="mx-auto max-w-7xl space-y-6 p-5 lg:p-9">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#123b35] px-7 py-10 text-white shadow-[0_30px_80px_-45px_rgba(18,59,53,.9)] sm:px-10 lg:min-h-[390px] lg:px-14 lg:py-16">
          <div className="relative z-10 max-w-2xl"><p className="eyebrow text-[#a9c5bd]">Apex / private client operations</p><h2 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-.065em] sm:text-5xl lg:text-6xl">Make your client experience feel as premium as your work.</h2><p className="mt-6 max-w-xl text-base leading-7 text-[#d3e1dc] sm:text-lg">Apex brings relationships, delivery, and revenue into one intentionally quiet workspace—built for high-touch service businesses.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/clients"><Button size="lg" className="bg-[#d7b475] text-[#123b35] hover:bg-[#eed49e]"><UserRoundPlus className="mr-2 h-4 w-4" /> Start with a client</Button></Link><Link href="/settings"><Button size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"><Upload className="mr-2 h-4 w-4" /> Prepare your import</Button></Link></div></div>
          <div className="absolute -right-12 -top-8 h-64 w-64 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,#67948b,transparent_60%)]" /><div className="absolute bottom-0 right-0 hidden h-64 w-[44%] lg:block"><div className="absolute bottom-8 right-12 w-64 rounded-2xl border border-white/15 bg-white/[.08] p-5 backdrop-blur"><p className="eyebrow text-[#a9c5bd]">Your next move</p><p className="mt-2 text-lg font-medium">Create your first client record.</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-1/4 rounded-full bg-[#d7b475]" /></div><p className="mt-2 text-xs text-[#c4d8d1]">Workspace setup · 1 of 4</p></div></div>
        </section>
        <section className="grid gap-4 md:grid-cols-3">{[{ icon: UserRoundPlus, number: '01', title: 'Capture the relationship', text: 'Keep client context, conversations, and next steps close to the work.' }, { icon: CalendarDays, number: '02', title: 'Run the engagement', text: 'Move from discovery to delivery with calm, visible momentum.' }, { icon: CircleCheck, number: '03', title: 'Close the loop', text: 'Unify agreements, billing, and outcomes in one client view.' }].map(({ icon: Icon, number, title, text }) => <Card key={title} className="group border-[#e2e4df] bg-white/70 shadow-none transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-26px_rgba(18,59,53,.4)]"><CardContent className="p-6"><div className="flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e5efeb] text-[#1d5a51]"><Icon className="h-5 w-5" /></div><span className="font-mono text-xs text-[#92a19b]">{number}</span></div><h3 className="mt-7 text-xl font-semibold tracking-[-.035em] text-[#182321]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#68736f]">{text}</p></CardContent></Card>)}</section>
        <section className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]"><Card className="border-[#dfe8e4] bg-[#eaf2ee] shadow-none"><CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow text-[#49716a]">Ready for real data</p><h3 className="mt-2 text-xl font-semibold tracking-[-.035em]">Bring your client list into Apex.</h3><p className="mt-2 text-sm text-[#587068]">The import flow is the next product milestone—connect data before relying on Apex for live operations.</p></div><Link href="/settings"><Button variant="secondary">Workspace readiness <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></CardContent></Card><Card className="border-[#eadcc8] bg-[#fbf5ed] shadow-none"><CardContent className="p-6"><p className="eyebrow text-[#9a7443]">Design principle</p><p className="mt-2 text-sm leading-6 text-[#5c5145]">More clarity. Less admin. Every screen should make your business feel more valuable.</p></CardContent></Card></section>
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
      
      <main className="mx-auto max-w-7xl space-y-6 p-5 lg:p-9">
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
