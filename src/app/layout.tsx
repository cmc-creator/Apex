import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import AIAssistant from '@/components/AIAssistant';

export const metadata: Metadata = {
  title: 'Apex CRM - Freelancer Management',
  description: 'Complete CRM for freelancers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 ml-64 flex flex-col min-h-screen">
            {children}
          </div>
        </div>
        <AIAssistant />
      </body>
    </html>
  );
}
