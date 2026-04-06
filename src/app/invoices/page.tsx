'use client';
import { useEffect, useState } from 'react';
import { getAppData } from '@/lib/storage';
import { Invoice, Client } from '@/lib/types';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate, getStatusColor, getDaysUntilDue } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

type FilterType = 'all' | 'draft' | 'sent' | 'paid' | 'overdue' | 'viewed';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const data = getAppData();
    setInvoices(data.invoices);
    setClients(data.clients);
  }, []);

  const filters: FilterType[] = ['all', 'draft', 'sent', 'viewed', 'paid', 'overdue'];
  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);
  const getClient = (id: string) => clients.find(c => c.id === id);

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const totalPending = invoices.filter(i => ['sent', 'viewed'].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);

  return (
    <div className="flex-1">
      <Header title="Invoices" subtitle={`${invoices.length} total invoices`} />

      <main className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Paid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalPaid)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(totalPending)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalOverdue)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors',
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              )}
            >
              {f} ({f === 'all' ? invoices.length : invoices.filter(i => i.status === f).length})
            </button>
          ))}
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(invoice => {
                  const client = getClient(invoice.clientId);
                  const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-900">{client?.name}</p>
                        <p className="text-xs text-gray-400">{client?.company}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{formatCurrency(invoice.total)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(invoice.status))}>
                          {invoice.status}
                        </span>
                        {invoice.status === 'overdue' && (
                          <div className="flex items-center gap-1 mt-0.5 text-red-500">
                            <AlertCircle className="w-3 h-3" />
                            <span className="text-xs">{Math.abs(daysUntilDue)} days overdue</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(invoice.issueDate)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(invoice.dueDate)}</td>
                      <td className="px-4 py-3">
                        <Link href={`/invoices/${invoice.id}`}>
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">No invoices found</div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
