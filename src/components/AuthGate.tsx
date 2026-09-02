'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';

const protectedRoutes = ['/settings'];

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const user = hydrated ? getCurrentUser() : null;
  const isProtectedRoute = protectedRoutes.includes(pathname);

  useEffect(() => {
    if (hydrated && isProtectedRoute && !user) {
      router.replace('/login');
    }
  }, [hydrated, isProtectedRoute, router, user]);

  if (hydrated && !user && isProtectedRoute) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Access required</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Sign in to continue</h1>
          <p className="mt-2 text-sm text-gray-600">
            This page is protected and requires an active Apex account.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return <>{children}</>;
}
