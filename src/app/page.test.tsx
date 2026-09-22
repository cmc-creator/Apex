// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Dashboard from './page';
import { mockData } from '@/lib/data';
vi.mock('@/lib/storage', () => ({ getAppData: vi.fn(() => mockData) }));
vi.mock('@/components/Header', () => ({ default: ({ title }: { title: string }) => <header><h1>{title}</h1></header> }));
vi.mock('next/link', () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
describe('Dashboard page', () => { it('renders the command center for a populated workspace', async () => { render(<Dashboard />); expect(await screen.findByText('Mission control')).toBeTruthy(); expect(screen.getByText('Live business signal')).toBeTruthy(); expect(screen.getByText('Operate with intention.')).toBeTruthy(); }); });
