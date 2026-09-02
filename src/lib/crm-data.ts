import { mockData } from './data';
import type { AppData, Client, Invoice, Project } from './types';
import { createSupabaseClient, hasSupabaseConfig } from './supabase';

const fallbackData: AppData = mockData;

async function fetchFromSupabase<T>(table: string): Promise<T[] | null> {
  if (!hasSupabaseConfig()) return null;

  const supabase = createSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.error(`Failed to load ${table} from Supabase`, error);
    return null;
  }

  return (data ?? []) as T[];
}

export async function getClients(): Promise<Client[]> {
  const data = await fetchFromSupabase<Client>('clients');
  return data ?? fallbackData.clients;
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchFromSupabase<Project>('projects');
  return data ?? fallbackData.projects;
}

export async function getInvoices(): Promise<Invoice[]> {
  const data = await fetchFromSupabase<Invoice>('invoices');
  return data ?? fallbackData.invoices;
}

export async function getDashboardData(): Promise<AppData> {
  const [clients, projects, invoices] = await Promise.all([
    getClients(),
    getProjects(),
    getInvoices(),
  ]);

  return {
    ...fallbackData,
    clients,
    projects,
    invoices,
  };
}
