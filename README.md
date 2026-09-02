# Apex

Apex is a Next.js CRM dashboard for freelancer operations, including clients, projects, invoices, contracts, scheduling, and finance workflows.

## Current status

This repo is in a strong frontend prototype state: it builds successfully and passes lint checks. However, it is still using mock local data and browser storage, so it is not yet production-ready for real customer or business data.

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

## Launch-readiness notes

Before going live, you still need to complete the following:

- Replace localStorage/mock data with a real database and API layer
- Add authentication and role-based access control
- Add server-side validation, permissions, and audit logs
- Configure production secret management and deployment environment variables
- Add automated tests for critical user flows
- Add monitoring, logging, error tracking, and uptime checks
- Review privacy, retention, and compliance requirements for customer data

## Recommended deployment path

- Deploy to Vercel or another managed Next.js host
- Set production environment values in the host dashboard
- Connect a database and API backend before enabling live customer data
- Validate the app with a staging deployment before production launch

## App structure

- `src/app` — route pages and app shell
- `src/components` — reusable UI and data views
- `src/lib` — mock data, storage helpers, and utilities
