import { NextResponse } from 'next/server';
import { getClients } from '@/lib/crm-data';

export async function GET() {
  const clients = await getClients();
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.company) {
      return NextResponse.json(
        { error: 'Client name and company are required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Client payload accepted. Connect to Supabase to persist it.',
      data: body,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body.' },
      { status: 400 }
    );
  }
}
