'use client';
import { useEffect, useState } from 'react';
import { getAppData } from '@/lib/storage';
import { Contract, Client } from '@/lib/types';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { FileCheck, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  useEffect(() => {
    const data = getAppData();
    setContracts(data.contracts);
    setClients(data.clients);
  }, []);

  const getClient = (id: string) => clients.find(c => c.id === id);

  const totalValue = contracts.reduce((s, c) => s + c.value, 0);
  const signedCount = contracts.filter(c => c.status === 'signed').length;

  return (
    <div className="flex-1">
      <Header title="Contracts" subtitle={`${contracts.length} contracts · ${formatCurrency(totalValue)} total value`} />

      <main className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">{formatCurrency(totalValue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Signed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{signedCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{contracts.length - signedCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {contracts.map(contract => {
            const client = getClient(contract.clientId);
            return (
              <Card key={contract.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                        <FileCheck className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{contract.title}</p>
                        <p className="text-sm text-gray-500">{client?.name} · {client?.company}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(contract.status))}>
                            {contract.status}
                          </span>
                          <span className="text-xs text-gray-400">Created: {formatDate(contract.createdAt)}</span>
                          {contract.signedAt && (
                            <span className="text-xs text-gray-400">Signed: {formatDate(contract.signedAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(contract.value)}</p>
                        <p className="text-xs text-gray-400">Contract value</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContract(contract)}
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedContract?.title}</DialogTitle>
          </DialogHeader>
          {selectedContract && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(selectedContract.status))}>
                  {selectedContract.status}
                </span>
                <span className="text-sm text-gray-500">Value: {formatCurrency(selectedContract.value)}</span>
              </div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed bg-gray-50 p-4 rounded-lg">
                {selectedContract.content}
              </pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
