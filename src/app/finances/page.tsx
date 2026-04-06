'use client';
import { useEffect, useState } from 'react';
import { getAppData } from '@/lib/storage';
import { Expense, Invoice } from '@/lib/types';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RevenueChart from '@/components/RevenueChart';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag } from 'lucide-react';

const categoryColors: Record<string, string> = {
  software: 'bg-blue-100 text-blue-700',
  hardware: 'bg-purple-100 text-purple-700',
  travel: 'bg-orange-100 text-orange-700',
  marketing: 'bg-pink-100 text-pink-700',
  office: 'bg-gray-100 text-gray-700',
  other: 'bg-yellow-100 text-yellow-700',
};

export default function FinancesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const data = getAppData();
    setExpenses(data.expenses);
    setInvoices(data.invoices);
  }, []);

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = totalRevenue - totalExpenses;
  const pendingRevenue = invoices.filter(i => ['sent', 'viewed', 'overdue'].includes(i.status)).reduce((s, i) => s + i.total, 0);

  const expensesByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex-1">
      <Header title="Finances" subtitle="Revenue, expenses, and profit overview" />

      <main className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-500">Total Revenue (Paid)</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-gray-500">Pending Revenue</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(pendingRevenue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <p className="text-xs text-gray-500">Total Expenses</p>
              </div>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                <p className="text-xs text-gray-500">Net Profit</p>
              </div>
              <p className={cn('text-2xl font-bold', profit >= 0 ? 'text-green-600' : 'text-red-600')}>
                {formatCurrency(profit)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview (2024)</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', categoryColors[category] || 'bg-gray-100 text-gray-700')}>
                        {category}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(amount)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(expense => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{expense.description}</td>
                      <td className="px-4 py-3">
                        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', categoryColors[expense.category] || 'bg-gray-100 text-gray-700')}>
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(expense.date)}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{formatCurrency(expense.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-700">Total Expenses</td>
                    <td className="px-4 py-3 text-sm font-bold text-red-600 text-right">{formatCurrency(totalExpenses)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
