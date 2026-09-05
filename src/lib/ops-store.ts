import { create } from "zustand";
import { CITIES } from "@/lib/nimbus";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  zone: string;
  role: string;
};

export type Activity = {
  id: string;
  at: number;
  text: string;
  kind: "sms" | "alert" | "system" | "auth";
};

const CONTACTS_KEY = "nimbus.contacts";
const ACTIVITY_KEY = "nimbus.activity";
const CITY_KEY = "nimbus.city";
const THRESH_KEY = "nimbus.thresholds";

const SEED_CONTACTS: Contact[] = [
  {
    id: "c1",
    name: "AP SDMA Duty Desk",
    phone: "08662470000",
    zone: "Vijayawada",
    role: "SDMA",
  },
  {
    id: "c2",
    name: "VMC Control Room",
    phone: "08662410000",
    zone: "Benz Circle",
    role: "Municipal",
  },
  {
    id: "c3",
    name: "Krishna Collectorate",
    phone: "08662570000",
    zone: "Vijayawada",
    role: "Collector",
  },
  {
    id: "c4",
    name: "Mumbai Disaster Cell",
    phone: "1916",
    zone: "Mumbai",
    role: "Mumbai",
  },
  {
    id: "c5",
    name: "Chennai Corporation",
    phone: "04425619200",
    zone: "Chennai",
    role: "Municipal",
  },
];

function canStore() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canStore()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canStore()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

type OpsState = {
  ready: boolean;
  cityId: string;
  threshold: number;
  vulnMin: number;
  contacts: Contact[];
  activity: Activity[];
  hydrate: () => void;
  setCityId: (id: string) => void;
  setThreshold: (n: number) => void;
  setVulnMin: (n: number) => void;
  addContact: (c: Omit<Contact, "id">) => Contact | { error: string };
  updateContact: (id: string, patch: Partial<Omit<Contact, "id">>) => void;
  removeContact: (id: string) => void;
  pushActivity: (text: string, kind?: Activity["kind"]) => void;
};

function persistThresh(threshold: number, vulnMin: number) {
  writeJson(THRESH_KEY, { threshold, vulnMin });
}

export const useOps = create<OpsState>((set, get) => ({
  ready: false,
  cityId: CITIES[0].id,
  threshold: 45,
  vulnMin: 0.35,
  contacts: SEED_CONTACTS,
  activity: [],
  hydrate: () => {
    const contacts = readJson<Contact[]>(CONTACTS_KEY, SEED_CONTACTS);
    const activity = readJson<Activity[]>(ACTIVITY_KEY, []);
    const cityId = canStore() ? (window.localStorage.getItem(CITY_KEY) ?? CITIES[0].id) : CITIES[0].id;
    const thresh = readJson(THRESH_KEY, { threshold: 45, vulnMin: 0.35 });
    if (!canStore() || !window.localStorage.getItem(CONTACTS_KEY)) {
      writeJson(CONTACTS_KEY, contacts);
    }
    set({
      ready: true,
      contacts,
      activity,
      cityId,
      threshold: thresh.threshold,
      vulnMin: thresh.vulnMin,
    });
  },
  setCityId: (id) => {
    if (canStore()) window.localStorage.setItem(CITY_KEY, id);
    set({ cityId: id });
  },
  setThreshold: (n) => {
    persistThresh(n, get().vulnMin);
    set({ threshold: n });
  },
  setVulnMin: (n) => {
    persistThresh(get().threshold, n);
    set({ vulnMin: n });
  },
  addContact: (c) => {
    const phone = c.phone.replace(/\s/g, "");
    if (!c.name.trim()) return { error: "Name is required." };
    if (phone.replace(/\D/g, "").length < 4) return { error: "Enter a valid phone number." };
    if (!c.zone.trim()) return { error: "Zone is required." };
    const contact: Contact = {
      id: `ct_${Date.now().toString(36)}`,
      name: c.name.trim(),
      phone,
      zone: c.zone.trim(),
      role: c.role.trim() || "Contact",
    };
    const contacts = [contact, ...get().contacts];
    writeJson(CONTACTS_KEY, contacts);
    set({ contacts });
    return contact;
  },
  updateContact: (id, patch) => {
    const contacts = get().contacts.map((c) => (c.id === id ? { ...c, ...patch } : c));
    writeJson(CONTACTS_KEY, contacts);
    set({ contacts });
  },
  removeContact: (id) => {
    const contacts = get().contacts.filter((c) => c.id !== id);
    writeJson(CONTACTS_KEY, contacts);
    set({ contacts });
  },
  pushActivity: (text, kind = "system") => {
    const item: Activity = {
      id: `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
      at: Date.now(),
      text,
      kind,
    };
    const activity = [item, ...get().activity].slice(0, 60);
    writeJson(ACTIVITY_KEY, activity);
    set({ activity });
  },
}));

export function contactsForZone(contacts: Contact[], zone: string, cityName: string) {
  const z = zone.toLowerCase();
  const c = cityName.toLowerCase();
  return contacts.filter((ct) => {
    const cz = ct.zone.toLowerCase();
    return cz === z || cz === c || z.includes(cz) || cz.includes(z) || cz.includes(c);
  });
}
