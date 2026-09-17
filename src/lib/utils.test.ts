import { describe, expect, it } from 'vitest';
import { calculateInvoiceTotals, getInitials, getStatusColor } from './utils';

describe('utils', () => {
  it('calculates invoice totals with discount and tax', () => {
    const totals = calculateInvoiceTotals(
      [
        { quantity: 2, rate: 100 },
        { quantity: 1, rate: 50 },
      ],
      10,
      20,
    );

    expect(totals).toEqual({
      subtotal: 250,
      discountAmount: 50,
      taxAmount: 20,
      total: 220,
    });
  });

  it('builds initials from name', () => {
    expect(getInitials('Sarah Mitchell')).toBe('SM');
    expect(getInitials('alex')).toBe('A');
  });

  it('returns fallback status color for unknown status', () => {
    expect(getStatusColor('unknown')).toBe('bg-gray-100 text-gray-800');
  });
});
