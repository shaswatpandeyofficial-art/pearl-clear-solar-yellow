import { create } from "zustand";

export type Role = "admin" | "operator" | "citizen";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
};

export const ADMIN_EMAIL = "admin@nimbus";
export const ADMIN_PASSWORD = "SIH2026";

const USERS_KEY = "nimbus.users";
const SESSION_KEY = "nimbus.session";

const SEED_ADMIN: User = {
  id: "admin",
  name: "Nimbus Admin",
  email: ADMIN_EMAIL,
  phone: "18001800",
  password: ADMIN_PASSWORD,
  role: "admin",
};

function canStore() {
  return typeof window !== "undefined";
}

function readUsers(): User[] {
  if (!canStore()) return [SEED_ADMIN];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [SEED_ADMIN];
    const parsed = JSON.parse(raw) as User[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [SEED_ADMIN];
    if (!parsed.some((u) => u.email === ADMIN_EMAIL)) return [SEED_ADMIN, ...parsed];
    return parsed;
  } catch {
    return [SEED_ADMIN];
  }
}

function writeUsers(users: User[]) {
  if (!canStore()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSessionId(): string | null {
  if (!canStore()) return null;
  return window.localStorage.getItem(SESSION_KEY);
}

function writeSessionId(id: string | null) {
  if (!canStore()) return;
  if (id) window.localStorage.setItem(SESSION_KEY, id);
  else window.localStorage.removeItem(SESSION_KEY);
}

function digits(s: string) {
  return s.replace(/\D/g, "");
}

function normEmail(s: string) {
  return s.trim().toLowerCase();
}

type SessionState = {
  ready: boolean;
  user: User | null;
  users: User[];
  hydrate: () => void;
  login: (id: string, password: string) => { ok: true } | { ok: false; error: string };
  register: (input: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

export const useSession = create<SessionState>((set, get) => ({
  ready: false,
  user: null,
  users: [SEED_ADMIN],
  hydrate: () => {
    const users = readUsers();
    writeUsers(users);
    const sid = readSessionId();
    const user = users.find((u) => u.id === sid) ?? null;
    set({ ready: true, users, user });
  },
  login: (id, password) => {
    const users = get().users.length ? get().users : readUsers();
    const key = normEmail(id);
    const ph = digits(id);
    const found = users.find(
      (u) =>
        u.email === key ||
        u.email === id.trim() ||
        (ph.length >= 8 && digits(u.phone) === ph),
    );
    if (!found || found.password !== password) {
      return { ok: false, error: "Email/phone or password is incorrect." };
    }
    writeSessionId(found.id);
    set({ user: found, users, ready: true });
    return { ok: true };
  },
  register: ({ name, email, phone, password }) => {
    const users = get().users.length ? get().users : readUsers();
    const em = normEmail(email);
    if (!name.trim() || name.trim().length < 2) {
      return { ok: false, error: "Enter your name." };
    }
    if (!em.includes("@") && digits(phone).length < 10) {
      return { ok: false, error: "Enter a valid email or a 10-digit phone." };
    }
    if (password.length < 6) {
      return { ok: false, error: "Password must be at least 6 characters." };
    }
    if (users.some((u) => u.email === em && em.includes("@"))) {
      return { ok: false, error: "An account with that email already exists." };
    }
    if (em === ADMIN_EMAIL) {
      return { ok: false, error: "That identifier is reserved." };
    }
    const user: User = {
      id: `u_${Date.now().toString(36)}`,
      name: name.trim(),
      email: em.includes("@") ? em : `${digits(phone)}@nimbus.local`,
      phone: phone.trim(),
      password,
      role: "citizen",
    };
    const next = [...users, user];
    writeUsers(next);
    writeSessionId(user.id);
    set({ users: next, user, ready: true });
    return { ok: true };
  },
  logout: () => {
    writeSessionId(null);
    set({ user: null });
  },
}));
