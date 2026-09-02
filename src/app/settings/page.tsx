'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser, signOutUser, AppUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const [user, setUser] = useState<AppUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleSignOut = () => {
    signOutUser();
    setUser(null);
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Account required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600">
            <p>Sign in to manage account settings and user-scoped access.</p>
            <Link href="/login">
              <Button className="w-full">Go to login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Name</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.name}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Role</p>
                <p className="mt-1 text-sm font-medium text-gray-900 capitalize">{user.role}</p>
              </div>
              <div className="sm:col-span-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-800">
              User-scoped access is now enforced at the app level for protected settings screens.
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push('/')}>
                Back to dashboard
              </Button>
              <Button variant="destructive" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
