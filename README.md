# Apex

Apex is a Next.js CRM dashboard for freelancer operations, including clients, projects, invoices, contracts, scheduling, and finance workflows.

## Current status

This repo is in a strong frontend prototype state: it builds successfully and passes lint checks. It still has a mock-data fallback for local development, but it now includes a Supabase-ready backend layer so it can be migrated toward production without rewriting the whole app.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production validation

```bash
npm run build
npm run lint
```

## Environment setup

Copy `.env.example` to `.env.local` and replace placeholders before deployment.

```bash
cp .env.example .env.local
```

Required values for Supabase-enabled setup:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Supabase-ready backend scaffold

The project now includes:

- `src/lib/supabase.ts` for client creation and environment checks
- `src/lib/crm-data.ts` for data access with mock fallback behavior
- `src/app/api/clients/route.ts` for client list/create API routes
- `src/app/api/projects/route.ts` for project list/create API routes
- `src/app/api/invoices/route.ts` for invoice list/create API routes
- `src/app/api/health/route.ts` for backend readiness checks

If Supabase environment variables are present, these APIs can target Supabase tables. If they are absent, the app falls back to the existing mock dataset so the UI continues to run locally.

## Launch-readiness checklist

Before going live, complete the following:

- Replace the local mock fallback with real Supabase tables and row-level security
- Add authentication and role-based access control
- Add server-side validation, permissions, and audit logs
- Configure production secret management and deployment environment variables
- Add automated tests for critical flows
- Add monitoring, logging, error tracking, and uptime checks
- Review privacy, retention, and compliance requirements for customer data

## Recommended deployment path

- Deploy to Vercel
- Set production environment variables in the Vercel dashboard
- Configure Supabase auth and Postgres schema before enabling real data
- Validate the app with a staging deployment before production launch

## App structure

- `src/app` — route pages and app shell
- `src/components` — reusable UI and data views
- `src/lib` — mock data, storage helpers, Supabase helpers, and utilities
