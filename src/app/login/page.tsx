'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { signInDemo } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@apex.crm');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = signInDemo(email, password);

    if (!user) {
      setError('Enter a valid email and password to continue.');
      return;
    }

    setError('');
    router.push('/');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign in to Apex</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="rounded-md bg-indigo-50 px-3 py-2 text-xs text-indigo-700">
                Demo mode: use any valid email and a non-empty password.
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
              Need to go back?{' '}
              <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Return to dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
