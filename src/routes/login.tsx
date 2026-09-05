import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_EMAIL, ADMIN_PASSWORD, useSession } from "@/lib/session";
import { useOps } from "@/lib/ops-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" && s.next.startsWith("/") ? s.next : "/",
  }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const user = useSession((s) => s.user);
  const ready = useSession((s) => s.ready);
  const login = useSession((s) => s.login);
  const register = useSession((s) => s.register);
  const hydrate = useSession((s) => s.hydrate);
  const pushActivity = useOps((s) => s.pushActivity);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (ready && user) {
      const dest = user.role === "admin" && next === "/" ? "/admin" : next;
      void navigate({ to: dest });
    }
  }, [navigate, next, ready, user]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "login") {
      const res = login(form.email || form.phone, form.password);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      pushActivity("Authority session opened", "auth");
      return;
    }
    const res = register(form);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    pushActivity("Citizen account created", "auth");
  };

  const set =
    (key: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <AppShell footer={false}>
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-sm flex-col justify-center px-4 py-12">
        <p className="eyebrow text-center">Nimbus access</p>
        <h1 className="mt-3 text-center font-display text-3xl font-semibold">
          {mode === "login" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Prototype session is stored on this device. Authority demo uses elevated credentials.
        </p>

        <div className="mx-auto mt-6 flex w-full rounded-lg bg-surface p-1 shadow-[0_0_0_1px_var(--color-border)]">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className={cn(
                "h-10 flex-1 rounded-md text-sm capitalize",
                mode === m ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          {mode === "register" ? (
            <Field label="Name" htmlFor="name">
              <Input
                id="name"
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                required
              />
            </Field>
          ) : null}
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              type="text"
              autoComplete="username"
              placeholder={mode === "login" ? "email or phone" : "you@example.com"}
              value={form.email}
              onChange={set("email")}
              required
            />
          </Field>
          {mode === "register" ? (
            <Field label="Phone" htmlFor="phone">
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={set("phone")}
              />
            </Field>
          ) : null}
          <Field label="Password" htmlFor="password">
            <Input
              id="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={form.password}
              onChange={set("password")}
              required
            />
          </Field>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="w-full">
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 rounded-lg bg-surface p-3 text-center text-xs text-muted shadow-[0_0_0_1px_var(--color-border)]">
          Admin demo · {ADMIN_EMAIL} / {ADMIN_PASSWORD}
        </p>
        <p className="mt-4 text-center text-xs text-subtle">
          <Link to="/" className="hover:text-fg">
            Back to overview
          </Link>
        </p>
      </div>
    </AppShell>
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
