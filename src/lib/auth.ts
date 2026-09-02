export type AppUserRole = 'admin' | 'member';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: AppUserRole;
}

const STORAGE_KEY = 'apex_auth_session';

export function getCurrentUser(): AppUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AppUser;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: AppUser): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function signOutUser(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function signInDemo(email: string, password: string): AppUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes('@') || !password.trim()) {
    return null;
  }

  const baseName = normalizedEmail.split('@')[0].replace(/[._-]+/g, ' ').trim();
  const displayName = baseName
    ? baseName.split(' ').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    : 'Apex User';

  const user: AppUser = {
    id: `demo-${normalizedEmail.replace(/[^a-z0-9]/gi, '')}`,
    email: normalizedEmail,
    name: displayName,
    role: 'admin',
  };

  saveCurrentUser(user);
  return user;
}
