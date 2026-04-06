'use client';
import { useEffect, useState } from 'react';
import { getAppData } from '@/lib/storage';
import { Client } from '@/lib/types';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Globe, FileText, FolderOpen, Eye, Link, Share2, CheckCircle, Shield, BarChart2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PortalPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const data = getAppData();
    setClients(data.clients);
  }, []);

  const wonClients = clients.filter(c => c.status === 'won');

  const features = [
    { icon: FileText, title: 'Invoice View & Payment', description: 'Clients can view and download all invoices, and pay online.' },
    { icon: FolderOpen, title: 'Project Status', description: 'Real-time project progress, tasks, and milestones.' },
    { icon: FileText, title: 'Contract Signing', description: 'Clients can review and sign contracts electronically.' },
    { icon: BarChart2, title: 'Reports & Analytics', description: 'Project performance reports and time tracking summaries.' },
    { icon: MessageSquare, title: 'Secure Messaging', description: 'Direct communication channel with you.' },
    { icon: Shield, title: 'Secure & Private', description: 'Each client has their own private, password-protected portal.' },
  ];

  return (
    <div className="flex-1">
      <Header title="Client Portal" subtitle="Share project updates and invoices with your clients" />

      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle>Client Portal Overview</CardTitle>
                  <p className="text-sm text-gray-500 mt-0.5">Give clients a professional self-service experience</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-100">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-indigo-900 text-lg">Your Portal URL</h3>
                    <p className="text-indigo-700 text-sm mt-1">Share a unique link with each client</p>
                    <div className="flex items-center gap-2 mt-3 bg-white rounded-lg p-2 border border-indigo-200">
                      <span className="text-sm text-gray-600 flex-1">https://portal.apexcrm.dev/c/your-client-id</span>
                      <Button size="sm" variant="ghost" className="text-indigo-600">
                        <Link className="w-4 h-4 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">Portal Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>How to Share</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Select a Client', desc: 'Choose from your active clients below' },
                    { step: '2', title: 'Generate Link', desc: 'Create a unique portal URL for them' },
                    { step: '3', title: 'Send Invite', desc: 'Email the portal link to your client' },
                    { step: '4', title: 'Client Logs In', desc: 'They access their dashboard securely' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {step}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{title}</p>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portal Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Active Portals</span>
                    <span className="font-semibold text-gray-900">{wonClients.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Clients</span>
                    <span className="font-semibold text-gray-900">{clients.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Portal Revenue</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(wonClients.reduce((s, c) => s + c.totalRevenue, 0))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Client Portals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {wonClients.map(client => (
                <div key={client.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-700 font-semibold text-sm">
                      {client.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Portal Active</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(client.totalRevenue)}</p>
                    <p className="text-xs text-gray-400">Total Revenue</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" /> Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-1" /> Share
                    </Button>
                  </div>
                </div>
              ))}
              {wonClients.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No active clients yet. Win some deals to activate portals!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
