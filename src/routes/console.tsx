import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { AppShell } from "@/components/app-shell";
import { RiskBadge } from "@/components/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MODELS,
  actionForAlert,
  clockLabel,
  formatDbz,
  formatEta,
  peopleNotified,
  type ModelId,
} from "@/lib/nimbus";
import { useOps } from "@/lib/ops-store";
import { useNowcast } from "@/lib/use-nowcast";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/console")({ component: ConsolePage });

function ConsolePage() {
  const n = useNowcast("vijayawada", "dgmr");
  const setOpsCity = useOps((s) => s.setCityId);
  const activity = useOps((s) => s.activity);
  const pushActivity = useOps((s) => s.pushActivity);
  const threshold = useOps((s) => s.threshold);
  const vulnMin = useOps((s) => s.vulnMin);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    n.setThreshold(threshold);
    n.setVulnMin(vulnMin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, vulnMin]);

  useEffect(() => {
    setOpsCity(n.cityId);
  }, [n.cityId, setOpsCity]);

  useEffect(() => {
    for (const a of n.activeAlerts) {
      const key = `${n.city.id}:${a.x}:${a.y}`;
      if (seen.current.has(key)) continue;
      if (a.dbz < n.threshold + 2) continue;
      seen.current.add(key);
      pushActivity(
        `${n.city.name} · ${a.landmark ?? `cell ${a.x},${a.y}`} · ${formatDbz(a.dbz)} · ${actionForAlert(a)}`,
        "alert",
      );
      break;
    }
  }, [n.activeAlerts, n.city.id, n.city.name, n.threshold, pushActivity]);

  const notified = peopleNotified(n.city, n.activeAlerts);
  const lead = n.activeAlerts[0]?.t ?? 0;

  return (
    <AppShell>
      <div className="mx-auto max-w-wide px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Command center</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              Authority dashboard
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Who was notified, which 1 km cells are hot, and how fast the
              dispatch ran. Open the live map to scrub the volume.
            </p>
          </div>
          <Button asChild>
            <Link to="/map">Open live map</Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi k="Active alerts" v={String(n.activeAlerts.length)} />
          <Kpi k="Zones notified" v={String(n.activeAlerts.length)} />
          <Kpi k="Avg dispatch" v={MODELS.find((m) => m.id === n.model)?.latency ?? "< 3 s"} />
          <Kpi k="People reached" v={notified.toLocaleString("en-IN")} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">Nowcast model</span>
          <div className="flex rounded-lg bg-surface p-1 shadow-[0_0_0_1px_var(--color-border)]">
            {MODELS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => n.setModel(m.id as ModelId)}
                className={cn(
                  "h-10 rounded-md px-3 text-xs sm:text-sm",
                  n.model === m.id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                {m.name}
              </button>
            ))}
          </div>
          <Badge variant="outline">{n.city.name}</Badge>
          <span className="font-mono text-xs text-subtle">Lead {formatEta(lead)}</span>
        </div>
        <p className="mt-2 text-xs text-muted">{MODELS.find((m) => m.id === n.model)?.note}</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="overflow-x-auto rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]">
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="font-display text-base font-semibold">Notified zones</h2>
              <span className="font-mono text-xs text-subtle">T+{Math.round(n.timeMin)}m</span>
            </div>
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-y border-border text-xs text-muted">
                  <th className="px-4 py-2 font-medium">Zone</th>
                  <th className="px-4 py-2 font-medium">Risk</th>
                  <th className="px-4 py-2 font-medium">dBZ</th>
                  <th className="px-4 py-2 font-medium">Residents</th>
                  <th className="px-4 py-2 font-medium">ETA</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {n.activeAlerts.slice(0, 12).map((a) => (
                  <tr key={`${a.x}-${a.y}`} className="border-b border-border/70">
                    <td className="px-4 py-2.5">
                      <span className="text-fg">{a.landmark ?? `Cell ${a.x},${a.y}`}</span>
                      <span className="mt-0.5 block font-mono text-[11px] text-subtle">
                        {a.x},{a.y}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <RiskBadge dbz={a.dbz} vuln={a.vuln} />
                    </td>
                    <td className="px-4 py-2.5 font-mono tabular-nums">{formatDbz(a.dbz)}</td>
                    <td className="px-4 py-2.5 font-mono tabular-nums">
                      {n.city.density.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2.5 font-mono tabular-nums">{formatEta(a.t)}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant="ok">Notified</Badge>
                    </td>
                  </tr>
                ))}
                {n.activeAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted">
                      No breaches at this lead time. Open the live map and play the horizon.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </section>

          <section className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]">
            <h2 className="font-display text-base font-semibold">Live activity</h2>
            <ul className="mt-3 max-h-[28rem] space-y-3 overflow-auto pr-1">
              {activity.length === 0 ? (
                <li className="text-sm text-muted">Waiting for cell breaches and SMS mocks.</li>
              ) : (
                activity.map((item) => (
                  <li key={item.id} className="border-b border-border/70 pb-3 last:border-0">
                    <p className="font-mono text-[10px] uppercase tracking-kicker text-subtle">
                      {clockLabel(item.at)} · {item.kind}
                    </p>
                    <p className="mt-1 text-sm text-fg">{item.text}</p>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ k, v }: { k: string; v: string }) {
  return (
    <article className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]">
      <p className="text-xs text-muted">{k}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{v}</p>
    </article>
  );
}
