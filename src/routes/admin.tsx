import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CITIES } from "@/lib/nimbus";
import { useOps, type Contact } from "@/lib/ops-store";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const navigate = useNavigate();
  const ready = useSession((s) => s.ready);
  const user = useSession((s) => s.user);
  const hydrate = useSession((s) => s.hydrate);
  const hydrateOps = useOps((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    hydrateOps();
  }, [hydrate, hydrateOps]);

  useEffect(() => {
    if (!ready) return;
    if (!user || user.role !== "admin") {
      void navigate({ to: "/login", search: { next: "/admin" } });
    }
  }, [navigate, ready, user]);

  if (!ready || !user || user.role !== "admin") {
    return (
      <AppShell>
        <div className="px-4 py-16 text-center text-sm text-muted">Checking credentials…</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-wide px-4 py-8 sm:px-6">
        <p className="eyebrow">Alert management</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          Emergency contacts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Add duty phones for 1 km zones. “Send test SMS” mocks Twilio/Msg91 —
          a toast and a command-center log entry, plus a console line judges can
          inspect.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <aside className="space-y-4">
            <ContactForm />
            <Thresholds />
          </aside>
          <ContactTable />
        </div>
      </div>
    </AppShell>
  );
}

function ContactForm() {
  const addContact = useOps((s) => s.addContact);
  const pushActivity = useOps((s) => s.pushActivity);
  const [form, setForm] = useState({ name: "", phone: "", zone: CITIES[0].name, role: "SDMA" });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = addContact(form);
    if ("error" in res) {
      setError(res.error);
      return;
    }
    setError(null);
    setForm((f) => ({ ...f, name: "", phone: "" }));
    pushActivity(`Contact added · ${res.name} · ${res.zone}`, "system");
    toast(`Saved ${res.name}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]"
    >
      <h2 className="font-display text-base font-semibold">Add contact</h2>
      <Field label="Name" htmlFor="c-name">
        <Input
          id="c-name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </Field>
      <Field label="Phone" htmlFor="c-phone">
        <Input
          id="c-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
      </Field>
      <Field label="Zone" htmlFor="c-zone">
        <Input
          id="c-zone"
          value={form.zone}
          onChange={(e) => setForm({ ...form, zone: e.target.value })}
          required
        />
      </Field>
      <Field label="Role" htmlFor="c-role">
        <Input
          id="c-role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" className="w-full">
        Save contact
      </Button>
    </form>
  );
}

function Thresholds() {
  const threshold = useOps((s) => s.threshold);
  const vulnMin = useOps((s) => s.vulnMin);
  const setThreshold = useOps((s) => s.setThreshold);
  const setVulnMin = useOps((s) => s.setVulnMin);

  return (
    <section className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]">
      <h2 className="font-display text-base font-semibold">Severity thresholds</h2>
      <p className="mt-1 text-xs text-muted">Applied on the live map and command center.</p>
      <label className="mt-4 block text-xs text-muted">
        Reflectivity ≥ {threshold} dBZ
        <input
          type="range"
          min={30}
          max={60}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="timeline-range mt-2 h-11 w-full"
        />
      </label>
      <label className="mt-3 block text-xs text-muted">
        Vulnerability ≥ {vulnMin.toFixed(2)}
        <input
          type="range"
          min={0}
          max={80}
          value={Math.round(vulnMin * 100)}
          onChange={(e) => setVulnMin(Number(e.target.value) / 100)}
          className="timeline-range mt-2 h-11 w-full"
        />
      </label>
      <Button asChild variant="secondary" className="mt-4 w-full">
        <Link to="/map">Inspect on live map</Link>
      </Button>
    </section>
  );
}

function ContactTable() {
  const contacts = useOps((s) => s.contacts);
  const removeContact = useOps((s) => s.removeContact);
  const pushActivity = useOps((s) => s.pushActivity);

  const send = (c: Contact) => {
    console.info("[Nimbus SMS mock]", {
      to: c.phone,
      zone: c.zone,
      body: `NIMBUS TEST: Duty desk check for ${c.zone}. This is a prototype dispatch.`,
    });
    pushActivity(`Test SMS · ${c.name} · ${c.phone} · ${c.zone}`, "sms");
    toast(`Test SMS queued to ${c.phone}`, { description: `${c.name} · ${c.zone}` });
  };

  return (
    <section className="overflow-x-auto rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]">
      <div className="px-4 py-3">
        <h2 className="font-display text-base font-semibold">Directory</h2>
      </div>
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead>
          <tr className="border-y border-border text-xs text-muted">
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Phone</th>
            <th className="px-4 py-2 font-medium">Zone</th>
            <th className="px-4 py-2 font-medium">Role</th>
            <th className="px-4 py-2 font-medium"> </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-b border-border/70">
              <td className="px-4 py-3 text-fg">{c.name}</td>
              <td className="px-4 py-3 font-mono tabular-nums">{c.phone}</td>
              <td className="px-4 py-3">{c.zone}</td>
              <td className="px-4 py-3 text-muted">{c.role}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={() => send(c)}>
                    Send test SMS
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => removeContact(c.id)}>
                    Remove
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-muted">
                No contacts yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
