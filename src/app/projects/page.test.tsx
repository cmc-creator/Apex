// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProjectsPage from './page';
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

describe('Projects page', () => {
  it('renders projects and filters by status', async () => {
    render(<ProjectsPage />);

    const included = mockData.projects[0];
    const excluded = mockData.projects.find(p => p.status !== included.status);
    const filterLabel = included.status.replace('_', ' ');

    expect(await screen.findByText(included.name)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${filterLabel} \\(`, 'i') }));

    expect(screen.getByText(included.name)).toBeTruthy();
    if (excluded) {
      expect(screen.queryByText(excluded.name)).toBeNull();
    }
  });
});
