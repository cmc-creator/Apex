import { NextResponse } from 'next/server';
import { getInvoices } from '@/lib/crm-data';

export async function GET() {
  const invoices = await getInvoices();
  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.invoiceNumber || !body?.clientId) {
      return NextResponse.json(
        { error: 'Invoice number and clientId are required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Invoice payload accepted. Connect to Supabase to persist it.',
      data: body,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body.' },
      { status: 400 }
    );
  }
}
