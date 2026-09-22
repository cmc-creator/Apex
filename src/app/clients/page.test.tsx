// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, vi, describe, it, expect } from 'vitest';
import ClientsPage from './page';
vi.mock('next/navigation', () => ({ useRouter: () => router }));
vi.mock('@/components/Header', () => ({ default: ({ title, action }: { title: string; action?: { label: string; onClick: () => void } }) => <header><h1>{title}</h1>{action && <button onClick={action.onClick}>{action.label}</button>}</header> }));
const router = vi.hoisted(() => ({ replace: vi.fn() }));
const fetchMock = vi.fn(); global.fetch = fetchMock;
afterEach(() => { cleanup(); fetchMock.mockReset(); });
describe('Clients page', () => { it('shows persisted clients returned by the API', async () => { fetchMock.mockResolvedValueOnce({ status: 200, json: async () => ({ clients: [{ id: '1', name: 'Nyx Client', company: 'Studio', email: 'hello@nyx.test', status: 'lead', tags: [] }] }) }); render(<ClientsPage />); expect(await screen.findByText('Nyx Client')).toBeTruthy(); }); it('posts a new client to the API', async () => { fetchMock.mockResolvedValueOnce({ status: 200, json: async () => ({ clients: [] }) }).mockResolvedValueOnce({ ok: true, json: async () => ({ client: { id: '2', name: 'New Client', company: '', email: 'new@nyx.test', status: 'lead', tags: [] } }) }); render(<ClientsPage />); fireEvent.click((await screen.findAllByText('New client'))[0]); fireEvent.change(screen.getByPlaceholderText('Client name'), { target: { value: 'New Client' } }); fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'new@nyx.test' } }); fireEvent.click(screen.getByRole('button', { name: 'Save client' })); expect(await screen.findByText('New Client')).toBeTruthy(); expect(fetchMock).toHaveBeenLastCalledWith('/api/clients', expect.objectContaining({ method: 'POST' })); }); });
