import { AppData } from './types';
import { mockData } from './data';

const STORAGE_KEY = 'apex_crm_data';

export function getAppData(): AppData {
  if (typeof window === 'undefined') return mockData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    saveAppData(mockData);
    return mockData;
  } catch {
    return mockData;
  }
}

export function saveAppData(data: AppData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data', e);
  }
}

export function updateClient(id: string, updates: Partial<import('./types').Client>): AppData {
  const data = getAppData();
  data.clients = data.clients.map(c => c.id === id ? { ...c, ...updates } : c);
  saveAppData(data);
  return data;
}

export function updateProject(id: string, updates: Partial<import('./types').Project>): AppData {
  const data = getAppData();
  data.projects = data.projects.map(p => p.id === id ? { ...p, ...updates } : p);
  saveAppData(data);
  return data;
}

export function updateInvoice(id: string, updates: Partial<import('./types').Invoice>): AppData {
  const data = getAppData();
  data.invoices = data.invoices.map(i => i.id === id ? { ...i, ...updates } : i);
  saveAppData(data);
  return data;
}
