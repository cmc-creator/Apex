import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockData } from './data';
import { getAppData, updateClient } from './storage';

const STORAGE_KEY = 'apex_crm_data';

function createStorageMock() {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    clear() {
      store.clear();
    },
  };
}

describe('storage', () => {
  let originalWindow: typeof globalThis.window | undefined;
  let originalLocalStorage: typeof globalThis.localStorage | undefined;

  beforeEach(() => {
    originalWindow = globalThis.window;
    originalLocalStorage = globalThis.localStorage;

    Object.defineProperty(globalThis, 'window', {
      value: {},
      configurable: true,
      writable: true,
    });

    Object.defineProperty(globalThis, 'localStorage', {
      value: createStorageMock(),
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      configurable: true,
      writable: true,
    });

    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
      writable: true,
    });
  });

  it('returns mock data and seeds storage when storage is empty', () => {
    const data = getAppData();

    expect(data).toEqual(mockData);
    expect(globalThis.localStorage.getItem(STORAGE_KEY)).toBeTruthy();
  });

  it('falls back to mock data when stored payload is invalid', () => {
    globalThis.localStorage.setItem(STORAGE_KEY, '{not-json');

    const data = getAppData();

    expect(data).toEqual(mockData);
  });

  it('updates client and persists updated payload', () => {
    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));

    const updated = updateClient('client-1', { name: 'Updated Name' });

    expect(updated.clients.find(c => c.id === 'client-1')?.name).toBe('Updated Name');

    const persisted = JSON.parse(globalThis.localStorage.getItem(STORAGE_KEY) || '{}');
    expect(persisted.clients.find((c: { id: string; name: string }) => c.id === 'client-1')?.name).toBe('Updated Name');
  });
});
