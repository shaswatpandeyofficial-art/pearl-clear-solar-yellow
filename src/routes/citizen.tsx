import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { RadarNowcast } from "@/components/radar-nowcast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CITIES, actionForAlert, formatDbz, formatEta } from "@/lib/nimbus";
import { useOps } from "@/lib/ops-store";
import { useNowcast } from "@/lib/use-nowcast";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/citizen")({ component: CitizenPage });

function CitizenPage() {
  const setOpsCity = useOps((s) => s.setCityId);
  const n = useNowcast("vijayawada", "dgmr");
  const [userCell, setUserCell] = useState(n.city.userStart);
  const [demoOn, setDemoOn] = useState(false);

  const hit = n.activeAlerts.find((a) => a.x === userCell.x && a.y === userCell.y);
  const nearest = useMemo(() => {
    if (hit) return hit;
    if (n.activeAlerts.length === 0) return null;
    return [...n.activeAlerts].sort(
      (a, b) =>
        Math.hypot(a.x - userCell.x, a.y - userCell.y) -
        Math.hypot(b.x - userCell.x, b.y - userCell.y),
    )[0];
  }, [hit, n.activeAlerts, userCell]);

  const triggerDemo = () => {
    const target =
      n.alerts.find((a) => a.x === n.city.userStart.x && a.y === n.city.userStart.y) ??
      n.alerts[0];
    if (!target) {
      setDemoOn(true);
      return;
    }
    setUserCell({ x: target.x, y: target.y });
    n.setPlaying(false);
    n.setTimeMin(Math.min(120, target.t + 4));
    setDemoOn(true);
  };

  return (
    <AppShell>
      <div className="mx-auto grid max-w-wide gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="eyebrow">Citizen alert</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            Only if you are in the cell.
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            Place yourself on the 1 km micro-grid. Nimbus stays silent unless the
            predicted core intersects your GPS ping — then the directive is a
            sentence, not a synoptic chart.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Precision targeting",
                d: "Alerts fire only if your GPS sits inside a predicted 1 km danger cell.",
              },
              {
                t: "Plain-language directive",
                d: "“Seek higher ground.” Not a dBZ lecture.",
              },
              {
                t: "No alert fatigue",
                d: "The rest of the city is not woken for a core two kilometres away.",
              },
            ].map((b) => (
              <article
                key={b.t}
                className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]"
              >
                <h2 className="font-display text-base font-semibold">{b.t}</h2>
                <p className="mt-2 text-sm text-muted">{b.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {CITIES.map((c) => (
              <Button
                key={c.id}
                type="button"
                size="sm"
                variant={n.cityId === c.id ? "default" : "outline"}
                onClick={() => {
                  n.setCityId(c.id);
                  setOpsCity(c.id);
                  setUserCell(c.userStart);
                  setDemoOn(false);
                }}
              >
                {c.name}
              </Button>
            ))}
            <Button type="button" onClick={triggerDemo}>
              Trigger demo alert
            </Button>
          </div>

          <div className="mt-6 rounded-xl bg-bg-elevated p-3 shadow-[0_0_0_1px_var(--color-border)] sm:p-4">
            <RadarNowcast
              city={n.city}
              model={n.model}
              timeMin={n.timeMin}
              frames={n.frames}
              selected={userCell}
              onSelect={(c) => {
                if (c) setUserCell(c);
              }}
              alerts={n.alerts}
              userCell={userCell}
              variant="panel"
            />
            <div className="mt-3 flex items-center gap-3">
              <input
                type="range"
                className="timeline-range h-11 min-w-0 flex-1"
                min={0}
                max={120}
                value={Math.round(n.timeMin)}
                onChange={(e) => {
                  n.setPlaying(false);
                  n.setTimeMin(Number(e.target.value));
                }}
                aria-label="Forecast minute"
              />
              <span className="font-mono text-sm tabular-nums text-accent">
                T+{Math.round(n.timeMin)}m
              </span>
            </div>
          </div>
        </div>

        <aside className="lg:pt-6">
          <div className="phone-bezel mx-auto w-full max-w-sm rounded-[1.8rem] p-3">
            <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-surface-2" />
            <div className="overflow-hidden rounded-[1.25rem] bg-bg p-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold">Nimbus</span>
                <Badge variant={hit ? "danger" : "ok"}>{hit ? "Alert" : "All clear"}</Badge>
              </div>
              <p className="mt-1 font-mono text-xs text-subtle">
                {n.city.name} · cell {userCell.x},{userCell.y}
              </p>

              <div
                className={cn(
                  "mt-4 rounded-lg p-4 transition-opacity duration-200",
                  hit || demoOn ? "alert-pulse bg-danger/10" : "bg-surface",
                )}
              >
                <p className="text-sm font-medium text-fg">
                  {hit
                    ? actionForAlert(hit)
                    : "No geofence match. You are outside predicted danger cells."}
                </p>
                {hit ? (
                  <p className="mt-2 text-xs text-muted">
                    {formatDbz(hit.dbz)} core · {hit.landmark ?? n.city.basin} · ETA{" "}
                    {formatEta(Math.max(0, hit.t))}
                  </p>
                ) : nearest ? (
                  <p className="mt-2 text-xs text-muted">
                    Nearest hot cell is{" "}
                    {Math.round(Math.hypot(nearest.x - userCell.x, nearest.y - userCell.y))} km
                    away.
                  </p>
                ) : null}
              </div>

              <div className="mt-4 rounded-lg bg-surface p-3 shadow-[0_0_0_1px_var(--color-border)]">
                <p className="font-mono text-xs uppercase tracking-kicker text-subtle">
                  Simulated SMS
                </p>
                <p className="mt-2 text-sm text-fg">
                  {hit
                    ? `NIMBUS ALERT: Heavy rain (${formatDbz(hit.dbz)}) entering your 1km zone. ${actionForAlert(hit)} — SDMA ${n.city.state}`
                    : `NIMBUS: No local nowcast alert for your cell in ${n.city.name}. Stay aware.`}
                </p>
              </div>

              <Button asChild className="mt-4 w-full" variant="secondary">
                <Link to="/console">Authority view of this zone</Link>
              </Button>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-sm text-center text-xs text-subtle">
            Precision targeting: the rest of the city is not woken for a core two kilometres away.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}
