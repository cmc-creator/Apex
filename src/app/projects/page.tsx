'use client';
import { useEffect, useState } from 'react';
import { getAppData } from '@/lib/storage';
import { Project, Client } from '@/lib/types';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type FilterType = 'all' | 'active' | 'completed' | 'on_hold';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const data = getAppData();
    setProjects(data.projects);
    setClients(data.clients);
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);
  const filters: FilterType[] = ['all', 'active', 'completed', 'on_hold'];

  const getClient = (clientId: string) => clients.find(c => c.id === clientId);

  const getProgress = (project: Project) => {
    const totalTasks = project.tasks.length;
    if (totalTasks === 0) return 0;
    const done = project.tasks.filter(t => t.status === 'done').length;
    return Math.round((done / totalTasks) * 100);
  };

  return (
    <div className="flex-1">
      <Header title="Projects" subtitle={`${projects.length} total projects`} />

      <main className="p-6 space-y-4">
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
              {f.replace('_', ' ')} ({f === 'all' ? projects.length : projects.filter(p => p.status === f).length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(project => {
            const client = getClient(project.clientId);
            const progress = getProgress(project);
            const hoursValue = project.hoursLogged * project.hourlyRate;

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{project.name}</p>
                        <p className="text-sm text-gray-500">{client?.company}</p>
                      </div>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium ml-2 shrink-0', getStatusColor(project.status))}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{project.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Budget</span>
                        <span className="font-medium text-gray-900">{formatCurrency(project.budget)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Earned</span>
                        <span className="font-medium text-green-600">{formatCurrency(hoursValue)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Hours Logged</span>
                        <span className="font-medium text-gray-900">{project.hoursLogged}h</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Task Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 mt-3">
                      <span>{formatDate(project.startDate)}</span>
                      <span>{formatDate(project.endDate)}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-500">
              <p className="text-lg font-medium">No projects found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
