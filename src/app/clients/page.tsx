'use client';
import { useEffect, useState } from 'react';
import { getAppData } from '@/lib/storage';
import { Client } from '@/lib/types';
import Header from '@/components/Header';
import PipelineBoard from '@/components/PipelineBoard';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCurrency, formatDate, getInitials, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { LayoutGrid, List, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [view, setView] = useState<'list' | 'pipeline'>('list');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const data = getAppData();
    setClients(data.clients);
  }, []);

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses = ['all', 'lead', 'proposal', 'negotiating', 'won', 'lost'];

  return (
    <div className="flex-1">
      <Header title="Clients" subtitle={`${clients.length} total clients`} />

      <main className="p-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Input
            placeholder="Search clients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
          <div className="flex gap-1">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors',
                  statusFilter === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                )}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
            >
              <List className="w-4 h-4 mr-1" /> List
            </Button>
            <Button
              variant={view === 'pipeline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('pipeline')}
            >
              <LayoutGrid className="w-4 h-4 mr-1" /> Pipeline
            </Button>
          </div>
        </div>

        {view === 'pipeline' ? (
          <PipelineBoard clients={filtered} />
        ) : (
          <div className="space-y-2">
            {filtered.map(client => (
              <Link key={client.id} href={`/clients/${client.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 shrink-0">
                        <AvatarFallback className="text-base">{getInitials(client.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{client.name}</p>
                          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(client.status))}>
                            {client.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{client.company}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Mail className="w-3 h-3" /> {client.email}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Phone className="w-3 h-3" /> {client.phone}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-gray-900">{formatCurrency(client.totalRevenue)}</p>
                        <p className="text-xs text-gray-400">Last contact: {formatDate(client.lastContact)}</p>
                        <div className="flex gap-1 mt-1 justify-end">
                          {client.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg font-medium">No clients found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
