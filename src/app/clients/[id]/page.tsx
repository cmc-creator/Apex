'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAppData } from '@/lib/storage';
import { Client, Project } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate, getInitials, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ArrowLeft, Mail, Phone, MapPin, Clock, FolderOpen, MessageSquare, FileText } from 'lucide-react';
import Link from 'next/link';

const commIcons: Record<string, React.ElementType> = {
  email: Mail,
  call: Phone,
  meeting: Clock,
  note: FileText,
};

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const appData = getAppData();
    const found = appData.clients.find(c => c.id === params.id);
    if (found) {
      setClient(found);
      setProjects(appData.projects.filter(p => p.clientId === params.id));
    }
  }, [params.id]);

  if (!client) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="flex-1">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Clients
        </button>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-xl">{getInitials(client.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
              <span className={cn('text-sm px-2.5 py-0.5 rounded-full font-medium capitalize', getStatusColor(client.status))}>
                {client.status}
              </span>
            </div>
            <p className="text-gray-500">{client.company}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {client.tags.map(tag => (
                <span key={tag} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(client.totalRevenue)}</p>
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
        </div>
      </div>

      <main className="p-6">
        <Tabs defaultValue="contact">
          <TabsList className="mb-6">
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
            <TabsTrigger value="communication">Communication ({client.communicationHistory.length})</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Contact Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a href={`mailto:${client.email}`} className="text-sm text-indigo-600 hover:underline">{client.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">{client.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm text-gray-900">{client.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Last Contact</p>
                      <p className="text-sm text-gray-900">{formatDate(client.lastContact)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Client Since</p>
                      <p className="text-sm text-gray-900">{formatDate(client.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <a href={`mailto:${client.email}`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Mail className="w-4 h-4" /> Send Email
                    </Button>
                  </a>
                  <a href={`tel:${client.phone}`}>
                    <Button variant="outline" className="w-full justify-start gap-2 mt-2">
                      <Phone className="w-4 h-4" /> Call Client
                    </Button>
                  </a>
                  <Link href="/invoices">
                    <Button variant="outline" className="w-full justify-start gap-2 mt-2">
                      <FileText className="w-4 h-4" /> Create Invoice
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="outline" className="w-full justify-start gap-2 mt-2">
                      <FolderOpen className="w-4 h-4" /> New Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No projects yet for this client</p>
                </div>
              ) : projects.map(project => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{project.name}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{project.description.slice(0, 100)}...</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(project.status))}>
                              {project.status.replace('_', ' ')}
                            </span>
                            <span className="text-xs text-gray-400">{formatDate(project.startDate)} – {formatDate(project.endDate)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatCurrency(project.budget)}</p>
                          <p className="text-xs text-gray-400">{project.hoursLogged}h logged</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication">
            <div className="space-y-3">
              {client.communicationHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(comm => {
                const Icon = commIcons[comm.type] || MessageSquare;
                return (
                  <Card key={comm.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{comm.subject}</p>
                            <span className="text-xs text-gray-400">{formatDate(comm.date)}</span>
                          </div>
                          <span className="text-xs text-indigo-600 capitalize font-medium">{comm.type}</span>
                          <p className="text-sm text-gray-600 mt-1">{comm.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 whitespace-pre-wrap">{client.notes || 'No notes yet.'}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
