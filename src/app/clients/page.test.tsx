// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ClientsPage from './page';
import { mockData } from '@/lib/data';

vi.mock('@/lib/storage', () => ({
  getAppData: vi.fn(() => mockData),
}));

vi.mock('@/components/Header', () => ({
  default: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  ),
}));

vi.mock('@/components/PipelineBoard', () => ({
  default: () => <div>Pipeline Board Mock</div>,
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

describe('Clients page', () => {
  it('renders seeded clients and supports search filtering', async () => {
    render(<ClientsPage />);

    expect(await screen.findByText('Sarah Mitchell')).toBeTruthy();

    fireEvent.change(screen.getByPlaceholderText('Search clients...'), {
      target: { value: 'zzzz-not-found' },
    });

    expect(screen.getByText('No clients found')).toBeTruthy();
  });
});
