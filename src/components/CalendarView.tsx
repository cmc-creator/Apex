'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Meeting } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  meetings: Meeting[];
}

export default function CalendarView({ meetings }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getMeetingsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return meetings.filter(m => m.date.startsWith(dateStr));
  };

  const today = new Date();
  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const cells = Array.from({ length: firstDay }, (_, i) => ({ day: 0, key: `empty-${i}` }))
    .concat(Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, key: `day-${i + 1}` })));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="font-semibold text-gray-900">{monthName}</h3>
        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500">{d}</div>
        ))}
        {cells.map(({ day, key }) => {
          if (!day) return <div key={key} className="bg-white h-16" />;
          const dayMeetings = getMeetingsForDay(day);
          return (
            <div key={key} className={cn(
              'bg-white h-16 p-1 text-sm',
              isToday(day) && 'bg-indigo-50'
            )}>
              <span className={cn(
                'flex items-center justify-center w-6 h-6 rounded-full text-xs',
                isToday(day) ? 'bg-indigo-600 text-white font-bold' : 'text-gray-700'
              )}>
                {day}
              </span>
              {dayMeetings.slice(0, 2).map(m => (
                <div key={m.id} className="mt-0.5 text-xs bg-indigo-100 text-indigo-700 px-1 rounded truncate">
                  {m.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
