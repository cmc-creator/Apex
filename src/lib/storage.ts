import { AppData } from './types';
import { mockData } from './data';

const STORAGE_KEY = 'apex_crm_data';

export const emptyAppData: AppData = {
  clients: [],
  projects: [],
  invoices: [],
  contracts: [],
  meetings: [],
  expenses: [],
};

export function getAppData(): AppData {
  if (typeof window === 'undefined') return emptyAppData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AppData;
      if (!isLegacySampleData(parsed)) return parsed;
    }
    saveAppData(emptyAppData);
    return emptyAppData;
  } catch {
    return emptyAppData;
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

function isLegacySampleData(data: AppData): boolean {
  const sampleClientIds = new Set(['client-1', 'client-2', 'client-3', 'client-4', 'client-5', 'client-6', 'client-7']);
  return data.clients.length === sampleClientIds.size && data.clients.every((client) => sampleClientIds.has(client.id));
}

export function resetAppData(): AppData {
  const empty = structuredClone(emptyAppData);
  saveAppData(empty);
  return empty;
}

// Exported only for component tests and visual development; production startup uses emptyAppData.
export { mockData };
