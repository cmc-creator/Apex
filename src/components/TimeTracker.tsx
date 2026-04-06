'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Square, Clock } from 'lucide-react';

interface TimeTrackerProps {
  projectName: string;
  onSave?: (hours: number) => void;
}

export default function TimeTracker({ projectName, onSave }: TimeTrackerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    setIsRunning(false);
    if (seconds > 0 && onSave) {
      onSave(parseFloat((seconds / 3600).toFixed(2)));
    }
    setSeconds(0);
  };

  return (
    <Card className="bg-indigo-50 border-indigo-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <div>
              <p className="text-xs text-indigo-600 font-medium">Time Tracker</p>
              <p className="text-xs text-indigo-500">{projectName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-mono font-bold text-indigo-900">{formatTime(seconds)}</span>
            <Button size="icon" variant="ghost" className="w-8 h-8" onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? <Pause className="w-4 h-4 text-indigo-600" /> : <Play className="w-4 h-4 text-indigo-600" />}
            </Button>
            <Button size="icon" variant="ghost" className="w-8 h-8" onClick={handleStop} disabled={seconds === 0}>
              <Square className="w-4 h-4 text-indigo-600" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
