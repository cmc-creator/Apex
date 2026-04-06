'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAppData } from '@/lib/storage';
import { Invoice, Client } from '@/lib/types';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ArrowLeft, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const data = getAppData();
    const found = data.invoices.find(i => i.id === params.id);
    if (found) {
      setInvoice(found);
      setClient(data.clients.find(c => c.id === found.clientId) || null);
    }
  }, [params.id]);

  if (!invoice || !client) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="flex-1">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between print:hidden">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Invoices
        </button>
        <div className="flex items-center gap-3">
          <span className={cn('text-sm px-2.5 py-0.5 rounded-full font-medium', getStatusColor(invoice.status))}>
            {invoice.status}
          </span>
          <Button onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" /> Print / PDF
          </Button>
        </div>
      </div>

      <main className="p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-xl font-bold text-indigo-900">Apex CRM</span>
              </div>
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">Freelance Developer</p>
              <p className="text-sm text-gray-500">john@apexcrm.dev</p>
              <p className="text-sm text-gray-500">+1 (555) 000-0000</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold text-indigo-600 mb-2">INVOICE</h1>
              <p className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</p>
            </div>
          </div>

          {/* Billing Info & Dates */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Bill To</p>
              <p className="font-semibold text-gray-900">{client.name}</p>
              <p className="text-sm text-gray-600">{client.company}</p>
              <p className="text-sm text-gray-500">{client.email}</p>
              <p className="text-sm text-gray-500">{client.address}</p>
            </div>
            <div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Issue Date</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(invoice.issueDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Due Date</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(invoice.dueDate)}</span>
                </div>
                {invoice.paidDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Paid Date</span>
                    <span className="text-sm font-medium text-green-600">{formatDate(invoice.paidDate)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(invoice.status))}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <table className="w-full mb-6">
            <thead>
              <tr className="bg-indigo-50">
                <th className="text-left px-4 py-3 text-sm font-semibold text-indigo-900">Description</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-indigo-900">Qty</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-indigo-900">Rate</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-indigo-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoice.items.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.description}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">{formatCurrency(item.rate)}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">{formatCurrency(invoice.subtotal)}</span>
              </div>
              {invoice.discountRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount ({invoice.discountRate}%)</span>
                  <span className="text-red-600">-{formatCurrency(invoice.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                <span className="text-gray-900">{formatCurrency(invoice.taxAmount)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-indigo-600">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="border-t border-gray-200 pt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</p>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Thank you for your business!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
