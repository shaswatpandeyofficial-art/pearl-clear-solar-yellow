import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCity } from "@/lib/nimbus";
import { useOps } from "@/lib/ops-store";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

const STATE_SHORT: Record<string, string> = {
  "Andhra Pradesh": "AP",
  Maharashtra: "MH",
  "Tamil Nadu": "TN",
  Assam: "AS",
};

function stateShort(state: string) {
  return STATE_SHORT[state] ?? state;
}

const LINKS = [
  { to: "/", label: "Overview" },
  { to: "/map", label: "Live Map" },
  { to: "/citizen", label: "Citizen Alert" },
  { to: "/console", label: "Command Center" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const cityId = useOps((s) => s.cityId);
  const city = getCity(cityId);
  const user = useSession((s) => s.user);
  const ready = useSession((s) => s.ready);
  const logout = useSession((s) => s.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95">
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-md bg-surface shadow-[0_0_0_1px_var(--color-border)]"
            aria-hidden
          >
            <span className="absolute inset-[5px] rounded-full shadow-[0_0_0_1px_var(--color-accent)]" />
            <span className="absolute left-1/2 top-1/2 h-[9px] w-[9px] origin-bottom-left -translate-x-px -translate-y-px rounded-tr-full bg-accent/90" />
            <span className="relative size-1.5 rounded-full bg-fg" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[15px] font-semibold leading-none tracking-tight">
              Nimbus
            </span>
            <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-kicker text-subtle sm:block">
              AI Nowcasting · Team CloudNine
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm transition-colors duration-150",
                pathname === l.to ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {l.label}
            </Link>
          ))}
          {user?.role === "admin" ? (
            <Link
              to="/admin"
              className={cn(
                "text-sm transition-colors duration-150",
                pathname === "/admin" ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              Alert Management
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full bg-surface px-2.5 py-1 shadow-[0_0_0_1px_var(--color-border)] sm:inline-flex">
            <span className="live-dot" />
            <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
              Live · {city.name}, {stateShort(city.state)}
            </span>
          </span>
          {ready && user ? (
            <>
              <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
                <Link to={user.role === "admin" ? "/admin" : "/citizen"}>{user.name.split(" ")[0]}</Link>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => logout()}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button asChild size="sm" variant={pathname === "/login" ? "default" : "secondary"}>
              <Link to="/login" search={{ next: "/" }}>
                Login
              </Link>
            </Button>
          )}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className={cn("border-t border-border bg-bg lg:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-wide flex-col px-4 py-2" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-3 text-sm text-fg"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {user?.role === "admin" ? (
            <Link to="/admin" className="rounded-md px-3 py-3 text-sm text-fg" onClick={() => setOpen(false)}>
              Alert Management
            </Link>
          ) : null}
          <Link to="/login" search={{ next: "/" }} className="rounded-md px-3 py-3 text-sm text-fg" onClick={() => setOpen(false)}>
            {user ? "Account" : "Login"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
