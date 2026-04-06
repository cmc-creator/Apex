'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 4900 },
  { month: 'Apr', revenue: 7200 },
  { month: 'May', revenue: 6100 },
  { month: 'Jun', revenue: 8400 },
  { month: 'Jul', revenue: 7600 },
  { month: 'Aug', revenue: 9200 },
  { month: 'Sep', revenue: 8100 },
  { month: 'Oct', revenue: 10500 },
  { month: 'Nov', revenue: 9800 },
  { month: 'Dec', revenue: 11200 },
];

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
        <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
