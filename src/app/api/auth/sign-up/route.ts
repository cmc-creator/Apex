import { NextResponse } from 'next/server';
import { ensureSchema, sql } from '@/lib/server/db';
import { hashPassword, setSession } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: unknown; workspaceName?: unknown; email?: unknown; password?: unknown };
    if (typeof body.name !== 'string' || typeof body.workspaceName !== 'string' || typeof body.email !== 'string' || typeof body.password !== 'string' || !body.name.trim() || !body.workspaceName.trim() || !body.email.trim()) return NextResponse.json({ error: 'Name, workspace name, email, and password are required.' }, { status: 400 });
    if (body.password.length < 12) return NextResponse.json({ error: 'Use a password with at least 12 characters.' }, { status: 400 });
    await ensureSchema(); const db = sql();
    const workspace = await db.query('INSERT INTO nyx_workspaces (name) VALUES ($1) RETURNING id, name', [body.workspaceName.trim()]);
    const workspaceRow = workspace[0] as { id: string; name: string };
    const users = await db.query('INSERT INTO nyx_users (workspace_id, email, display_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, email, display_name', [workspaceRow.id, body.email.trim().toLowerCase(), body.name.trim(), hashPassword(body.password)]);
    const user = users[0] as { id: string; email: string; display_name: string };
    await setSession(user.id, workspaceRow.id);
    return NextResponse.json({ user, workspace: workspaceRow }, { status: 201 });
  } catch (error) { const message = error instanceof Error && error.message.includes('unique') ? 'An account already exists for this email.' : 'Unable to create your NyxApex workspace.'; return NextResponse.json({ error: message }, { status: 500 }); }
}
