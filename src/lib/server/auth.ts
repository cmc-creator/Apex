import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { ensureSchema, sql } from './db';

const COOKIE = 'nyxapex_session';
const secret = () => process.env.AUTH_SECRET ?? createHmac('sha256', 'nyxapex').update(process.env.DATABASE_URL ?? 'development').digest('hex');
export function hashPassword(password: string): string { const salt = randomBytes(16).toString('hex'); return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`; }
export function verifyPassword(password: string, stored: string): boolean { const [salt, hash] = stored.split(':'); if (!salt || !hash) return false; const actual = scryptSync(password, salt, 64); return timingSafeEqual(actual, Buffer.from(hash, 'hex')); }
function sign(value: string) { return createHmac('sha256', secret()).update(value).digest('base64url'); }
export function makeSession(userId: string, workspaceId: string) { const value = Buffer.from(JSON.stringify({ userId, workspaceId, exp: Date.now() + 1000 * 60 * 60 * 24 * 14 })).toString('base64url'); return `${value}.${sign(value)}`; }
export async function setSession(userId: string, workspaceId: string) { const store = await cookies(); store.set(COOKIE, makeSession(userId, workspaceId), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 14 }); }
export async function clearSession() { const store = await cookies(); store.delete(COOKIE); }
export async function requireSession() { const raw = (await cookies()).get(COOKIE)?.value; if (!raw) throw new Error('Unauthorized'); const [value, signature] = raw.split('.'); if (!value || !signature || !timingSafeEqual(Buffer.from(signature), Buffer.from(sign(value)))) throw new Error('Unauthorized'); const session = JSON.parse(Buffer.from(value, 'base64url').toString()) as { userId: string; workspaceId: string; exp: number }; if (session.exp < Date.now()) throw new Error('Unauthorized'); return session; }
export async function userFromSession() { const session = await requireSession(); await ensureSchema(); const rows = await sql().query('SELECT id, email, display_name FROM nyx_users WHERE id = $1 AND workspace_id = $2', [session.userId, session.workspaceId]); if (!rows[0]) throw new Error('Unauthorized'); return { ...session, user: rows[0] as { id: string; email: string; display_name: string } }; }
