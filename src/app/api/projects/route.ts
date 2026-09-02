import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/crm-data';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.clientId) {
      return NextResponse.json(
        { error: 'Project name and clientId are required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Project payload accepted. Connect to Supabase to persist it.',
      data: body,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body.' },
      { status: 400 }
    );
  }
}
