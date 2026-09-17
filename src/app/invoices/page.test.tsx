// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import InvoicesPage from './page';
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

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

describe('Invoices page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders invoices and filters by status', async () => {
    render(<InvoicesPage />);

    const included = mockData.invoices[0];
    const excluded = mockData.invoices.find(i => i.status !== included.status);

    expect(await screen.findByText(included.invoiceNumber)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${included.status} \\(`, 'i') }));

    expect(screen.getByText(included.invoiceNumber)).toBeTruthy();
    if (excluded) {
      expect(screen.queryByText(excluded.invoiceNumber)).toBeNull();
    }
  });

  it('shows overdue indicator for overdue invoices', async () => {
    const overdue = mockData.invoices.find(i => i.status === 'overdue');
    if (!overdue) return;

    render(<InvoicesPage />);

    const overdueButtons = screen.getAllByRole('button', { name: /^overdue \(/i });
    fireEvent.click(overdueButtons[0]);

    expect((await screen.findAllByText(overdue.invoiceNumber)).length).toBeGreaterThan(0);
    expect(screen.getByText(/days overdue/i)).toBeTruthy();
  });
});
