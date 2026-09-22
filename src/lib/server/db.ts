import { neon } from '@neondatabase/serverless';

const schema = `
CREATE TABLE IF NOT EXISTS nyx_workspaces (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS nyx_users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), workspace_id UUID NOT NULL REFERENCES nyx_workspaces(id) ON DELETE CASCADE, email TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS nyx_clients (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), workspace_id UUID NOT NULL REFERENCES nyx_workspaces(id) ON DELETE CASCADE, name TEXT NOT NULL, company TEXT NOT NULL DEFAULT '', email TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', address TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'lead', tags TEXT[] NOT NULL DEFAULT '{}', notes TEXT NOT NULL DEFAULT '', archived_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS nyx_clients_workspace_idx ON nyx_clients(workspace_id, archived_at, created_at DESC);`;
let ready: Promise<void> | undefined;
type Db = { query: (query: string, params?: unknown[]) => Promise<Record<string, unknown>[]> };
export function sql(): Db { const url = process.env.DATABASE_URL; if (!url) throw new Error('NyxApex database is not configured.'); return neon(url) as unknown as Db; }
export async function ensureSchema(): Promise<void> { if (!ready) ready = sql().query(schema).then(() => undefined); return ready; }
