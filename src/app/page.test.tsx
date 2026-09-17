// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Dashboard from './page';
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

vi.mock('@/components/MetricCard', () => ({
  default: ({ title, value }: { title: string; value: string }) => (
    <div>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  ),
}));

vi.mock('@/components/RevenueChart', () => ({
  default: () => <div>Revenue Chart Mock</div>,
}));

vi.mock('@/components/ActivityFeed', () => ({
  default: () => <div>Activity Feed Mock</div>,
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

describe('Dashboard page', () => {
  it('renders main dashboard sections using app data', async () => {
    render(<Dashboard />);

    expect(await screen.findByText('Dashboard')).toBeTruthy();
    expect(screen.getByText('Total Revenue')).toBeTruthy();
    expect(screen.getByText('Upcoming Meetings')).toBeTruthy();
    expect(screen.getByText('Revenue Chart Mock')).toBeTruthy();
  });
});
