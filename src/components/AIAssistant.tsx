'use client';
import { useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'Draft a follow-up email',
  'Summarize overdue invoices',
  'Suggest next actions for leads',
  'Create a project proposal',
];

const fakeResponses: Record<string, string> = {
  default: "I'm your AI assistant! I can help you draft emails, analyze your pipeline, summarize client data, and more. What would you like help with?",
  email: "Here's a professional follow-up email:\n\nSubject: Following Up on Our Recent Discussion\n\nDear [Client Name],\n\nI wanted to follow up on our recent conversation and check if you had any questions about the proposal I sent over. I'm confident we can deliver excellent results for your project.\n\nLooking forward to hearing from you!\n\nBest,\nJohn",
  invoice: "You have 2 outstanding invoices:\n• INV-003: $18,360 from TechCorp (sent Jan 1, due Jan 31)\n• INV-004: $5,400 from HealthTech (overdue since Jan 14)\n\nWould you like me to draft reminder emails for these?",
  leads: "Based on your pipeline, I recommend:\n1. Follow up with MediaGroup (Olivia Banks) — new lead from Jan 3, no follow-up yet\n2. Send updated proposal to EduLearn Platform — waiting for board approval\n3. Close negotiation with StartupXYZ — meeting scheduled Jan 22",
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: fakeResponses.default }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = fakeResponses.default;
      if (lower.includes('email')) response = fakeResponses.email;
      else if (lower.includes('invoice')) response = fakeResponses.invoice;
      else if (lower.includes('lead') || lower.includes('action')) response = fakeResponses.leads;
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors z-50"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col z-50">
          <div className="flex items-center justify-between p-4 border-b bg-indigo-600 text-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap',
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => sendMessage(s)} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full hover:bg-indigo-100 transition-colors">
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask anything..."
                className="flex-1"
              />
              <Button size="icon" onClick={() => sendMessage(input)}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
