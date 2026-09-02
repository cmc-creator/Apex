import { NextResponse } from 'next/server';
import { hasSupabaseConfig } from '@/lib/supabase';

export async function GET() {
  return NextResponse.json({
    ok: true,
    backend: hasSupabaseConfig() ? 'supabase' : 'mock-fallback',
    message: 'Apex API is running.',
  });
}
