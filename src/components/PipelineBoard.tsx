'use client';
import { Client, ClientStatus } from '@/lib/types';
import { formatCurrency, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

const columns: { status: ClientStatus; label: string }[] = [
  { status: 'lead', label: 'Leads' },
  { status: 'proposal', label: 'Proposal' },
  { status: 'negotiating', label: 'Negotiating' },
  { status: 'won', label: 'Won' },
  { status: 'lost', label: 'Lost' },
];

interface PipelineBoardProps {
  clients: Client[];
}

export default function PipelineBoard({ clients }: PipelineBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map(({ status, label }) => {
        const columnClients = clients.filter(c => c.status === status);
        const totalRevenue = columnClients.reduce((sum, c) => sum + c.totalRevenue, 0);
        return (
          <div key={status} className="flex-shrink-0 w-64">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700 text-sm">{label}</h3>
                <span className="bg-white text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {columnClients.length}
                </span>
              </div>
              {totalRevenue > 0 && (
                <p className="text-xs text-gray-500 mb-3">{formatCurrency(totalRevenue)}</p>
              )}
              <div className="space-y-2">
                {columnClients.map(client => (
                  <Link key={client.id} href={`/clients/${client.id}`}>
                    <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-xs">{getInitials(client.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{client.name}</p>
                          <p className="text-xs text-gray-500 truncate">{client.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {client.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
