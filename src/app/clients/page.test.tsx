// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi, describe, it, expect } from 'vitest';
import ClientsPage from './page';
import { mockData } from '@/lib/data';

const createClient = vi.hoisted(() => vi.fn((input) => ({ ...input, id: 'new-client', createdAt: '2026-01-01', lastContact: '2026-01-01', totalRevenue: 0, communicationHistory: [] })));
vi.mock('@/lib/storage', () => ({ getAppData: vi.fn(() => mockData), createClient }));
vi.mock('@/components/Header', () => ({ default: ({ title, subtitle, action }: { title: string; subtitle: string; action?: { label: string; onClick: () => void } }) => <header><h1>{title}</h1><p>{subtitle}</p>{action && <button onClick={action.onClick}>{action.label}</button>}</header> }));
vi.mock('@/components/PipelineBoard', () => ({ default: () => <div>Pipeline Board Mock</div> }));
vi.mock('next/link', () => ({ default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a> }));

describe('Clients page', () => { afterEach(() => cleanup());
  it('renders clients and supports search filtering', async () => { render(<ClientsPage />); expect(await screen.findByText('Sarah Mitchell')).toBeTruthy(); fireEvent.change(screen.getByPlaceholderText('Search clients...'), { target: { value: 'zzzz-not-found' } }); expect(screen.getByText('No clients found')).toBeTruthy(); });
  it('creates a client from the workspace form', async () => { render(<ClientsPage />); fireEvent.click((await screen.findAllByText('New client'))[0]); fireEvent.change(screen.getByPlaceholderText('Client name *'), { target: { value: 'Nyx Client' } }); fireEvent.change(screen.getByPlaceholderText('Email *'), { target: { value: 'hello@nyx.test' } }); fireEvent.click(screen.getByRole('button', { name: 'Create client' })); expect(createClient).toHaveBeenCalledWith(expect.objectContaining({ name: 'Nyx Client', email: 'hello@nyx.test' })); expect(await screen.findByText('Nyx Client')).toBeTruthy(); });
});
