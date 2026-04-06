'use client';
import { Task, TaskStatus } from '@/lib/types';
import { getStatusColor, formatDate } from '@/lib/utils';
import { Check, Clock, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
}

const statusIcons: Record<TaskStatus, React.ElementType> = {
  todo: Circle,
  in_progress: Clock,
  done: Check,
};

export default function TaskList({ tasks, onStatusChange }: TaskListProps) {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    todo: 'in_progress',
    in_progress: 'done',
    done: 'todo',
  };

  return (
    <div className="space-y-2">
      {tasks.map(task => {
        const Icon = statusIcons[task.status];
        return (
          <div key={task.id} className={cn(
            'flex items-start gap-3 p-3 rounded-lg border transition-colors',
            task.status === 'done' ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200'
          )}>
            <button
              onClick={() => onStatusChange?.(task.id, nextStatus[task.status])}
              className={cn(
                'mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                task.status === 'done' ? 'bg-green-500 border-green-500 text-white' :
                task.status === 'in_progress' ? 'border-blue-500 text-blue-500' :
                'border-gray-300 text-gray-300'
              )}
            >
              <Icon className="w-3 h-3" />
            </button>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm font-medium', task.status === 'done' && 'line-through text-gray-400')}>
                {task.title}
              </p>
              {task.description && (
                <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
              )}
              <div className="flex items-center gap-3 mt-1.5">
                <span className={cn('text-xs px-1.5 py-0.5 rounded-full font-medium', getStatusColor(task.status))}>
                  {task.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-400">{formatDate(task.dueDate)}</span>
                {task.timeLogged > 0 && (
                  <span className="text-xs text-gray-400">{task.timeLogged}h logged</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {tasks.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-8">No tasks yet</p>
      )}
    </div>
  );
}
