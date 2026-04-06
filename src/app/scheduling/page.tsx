'use client';
import { useEffect, useState } from 'react';
import { getAppData } from '@/lib/storage';
import { Meeting, Client } from '@/lib/types';
import Header from '@/components/Header';
import CalendarView from '@/components/CalendarView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Video, Phone, Users, Clock, Link as LinkIcon } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  video: Video,
  phone: Phone,
  in_person: Users,
};

const typeColors: Record<string, string> = {
  video: 'bg-blue-50 text-blue-600',
  phone: 'bg-green-50 text-green-600',
  in_person: 'bg-purple-50 text-purple-600',
};

export default function SchedulingPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const data = getAppData();
    setMeetings(data.meetings);
    setClients(data.clients);
  }, []);

  const getClient = (id?: string) => id ? clients.find(c => c.id === id) : null;
  const sortedMeetings = [...meetings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex-1">
      <Header title="Scheduling" subtitle={`${meetings.length} upcoming meetings`} />

      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarView meetings={meetings} />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sortedMeetings.map(meeting => {
                    const client = getClient(meeting.clientId);
                    const Icon = typeIcons[meeting.type] || Clock;
                    const colorClass = typeColors[meeting.type] || 'bg-gray-50 text-gray-600';

                    return (
                      <div key={meeting.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{meeting.title}</p>
                            {client && (
                              <p className="text-xs text-gray-500">{client.name} · {client.company}</p>
                            )}
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-400">{formatDate(meeting.date)}</span>
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock className="w-3 h-3" /> {meeting.duration}min
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{meeting.description}</p>
                            {meeting.link && (
                              <a
                                href={meeting.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                              >
                                <LinkIcon className="w-3 h-3" /> Join Meeting
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
