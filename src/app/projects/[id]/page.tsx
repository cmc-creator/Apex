'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAppData, updateProject } from '@/lib/storage';
import { Project, Client, TaskStatus } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TaskList from '@/components/TaskList';
import TimeTracker from '@/components/TimeTracker';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const appData = getAppData();
    const found = appData.projects.find(p => p.id === params.id);
    if (found) {
      setProject(found);
      const c = appData.clients.find(cl => cl.id === found.clientId);
      setClient(c || null);
    }
  }, [params.id]);

  const handleTaskStatusChange = (taskId: string, status: TaskStatus) => {
    if (!project) return;
    const updatedTasks = project.tasks.map(t => t.id === taskId ? { ...t, status } : t);
    const updatedProject = { ...project, tasks: updatedTasks };
    setProject(updatedProject);
    updateProject(project.id, { tasks: updatedTasks });
  };

  const handleTimeSave = (hours: number) => {
    if (!project) return;
    const updated = { ...project, hoursLogged: project.hoursLogged + hours };
    setProject(updated);
    updateProject(project.id, { hoursLogged: updated.hoursLogged });
  };

  if (!project) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
    </div>
  );

  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter(t => t.status === 'done').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const completedMilestones = project.milestones.filter(m => m.completed).length;

  return (
    <div className="flex-1">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <span className={cn('text-sm px-2.5 py-0.5 rounded-full font-medium', getStatusColor(project.status))}>
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-gray-500 mt-0.5">{client?.name} · {client?.company}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(project.budget)}</p>
            <p className="text-sm text-gray-500">{project.hourlyRate}/hr · {project.hoursLogged}h logged</p>
          </div>
        </div>
      </div>

      <main className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Task Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{progress}%</p>
              <Progress value={progress} className="mt-2" />
              <p className="text-xs text-gray-400 mt-1">{doneTasks}/{totalTasks} tasks done</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Hours Logged</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{project.hoursLogged}h</p>
              <p className="text-xs text-gray-400 mt-2">{formatCurrency(project.hoursLogged * project.hourlyRate)} earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Milestones</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{completedMilestones}/{project.milestones.length}</p>
              <p className="text-xs text-gray-400 mt-2">completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Budget Remaining</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(project.budget - (project.hoursLogged * project.hourlyRate))}
              </p>
              <p className="text-xs text-gray-400 mt-2">of {formatCurrency(project.budget)}</p>
            </CardContent>
          </Card>
        </div>

        <TimeTracker projectName={project.name} onSave={handleTimeSave} />

        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks ({totalTasks})</TabsTrigger>
            <TabsTrigger value="milestones">Milestones ({project.milestones.length})</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Card>
              <CardContent className="p-4">
                <TaskList tasks={project.tasks} onStatusChange={handleTaskStatusChange} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {project.milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                      {milestone.completed
                        ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        : <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                      }
                      <div className="flex-1">
                        <p className={cn('text-sm font-medium', milestone.completed && 'line-through text-gray-400')}>
                          {milestone.title}
                        </p>
                        <p className="text-xs text-gray-400">Due: {formatDate(milestone.dueDate)}</p>
                      </div>
                      {milestone.completed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completed</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 whitespace-pre-wrap">{project.notes || 'No notes yet.'}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
