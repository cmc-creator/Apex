'use client';

import { useState } from 'react';
import { AlertTriangle, DatabaseZap, Download, RotateCcw, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAppData, resetAppData } from '@/lib/storage';

export default function SettingsPage() {
  const [message, setMessage] = useState<string | null>(null);

  function resetWorkspace(): void {
    const data = getAppData();
    const total = data.clients.length + data.projects.length + data.invoices.length + data.contracts.length + data.meetings.length + data.expenses.length;
    if (!window.confirm(`Clear ${total} local records from this browser? This cannot be undone.`)) return;
    resetAppData();
    setMessage('This browser workspace is now empty and ready for your data.');
  }

  return <div className="flex-1">
    <Header title="Workspace settings" subtitle="Prepare NyxApex for your own client operations." />
    <main className="max-w-4xl p-6 space-y-6">
      <Card className="border-[#dce7e4] bg-[#f2f7f5] shadow-none">
        <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#365d59]" /> Data readiness</CardTitle><CardDescription>NyxApex currently stores records only in this browser. Nothing is shared or backed up until a hosted data layer is added.</CardDescription></CardHeader>
        <CardContent className="flex flex-wrap gap-3"><Button className="bg-[#365d59] hover:bg-[#294b47]"><Download className="mr-2 h-4 w-4" /> Import clients (coming next)</Button><Button variant="outline"><DatabaseZap className="mr-2 h-4 w-4" /> Connect data storage (coming next)</Button></CardContent>
      </Card>
      <Card className="border-[#eed6c5]">
        <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-[#a95435]" /> Clear this browser’s workspace</CardTitle><CardDescription>Use this once to remove the sample workspace or any local test records before importing your real data.</CardDescription></CardHeader>
        <CardContent className="space-y-3"><Button variant="destructive" onClick={resetWorkspace}><RotateCcw className="mr-2 h-4 w-4" /> Reset local workspace</Button>{message && <p className="text-sm font-medium text-[#365d59]">{message}</p>}</CardContent>
      </Card>
    </main>
  </div>;
}
