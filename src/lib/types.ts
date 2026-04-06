export type ClientStatus = 'lead' | 'proposal' | 'negotiating' | 'won' | 'lost';
export type ProjectStatus = 'active' | 'completed' | 'on_hold';
export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';
export type ContractStatus = 'draft' | 'sent' | 'signed';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type ExpenseCategory = 'software' | 'hardware' | 'travel' | 'marketing' | 'office' | 'other';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  tags: string[];
  status: ClientStatus;
  avatar?: string;
  notes: string;
  createdAt: string;
  lastContact: string;
  totalRevenue: number;
  communicationHistory: Communication[];
}

export interface Communication {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  subject: string;
  content: string;
  date: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  hoursLogged: number;
  hourlyRate: number;
  tasks: Task[];
  milestones: Milestone[];
  notes: string;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  timeLogged: number;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  projectId?: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  notes: string;
  paidDate?: string;
}

export interface Contract {
  id: string;
  clientId: string;
  projectId?: string;
  title: string;
  status: ContractStatus;
  content: string;
  createdAt: string;
  signedAt?: string;
  value: number;
}

export interface Meeting {
  id: string;
  clientId?: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  type: 'video' | 'phone' | 'in_person';
  link?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  receipt?: string;
}

export interface AppData {
  clients: Client[];
  projects: Project[];
  invoices: Invoice[];
  contracts: Contract[];
  meetings: Meeting[];
  expenses: Expense[];
}
