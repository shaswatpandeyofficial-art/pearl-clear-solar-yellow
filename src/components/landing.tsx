import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Database, Globe2, Layers, Radio, Satellite, Siren, Mountain } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { RadarNowcast } from "@/components/radar-nowcast";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COMPARE,
  IMPACT,
  PIPELINE,
  STACK,
  TEAM,
} from "@/lib/nimbus";
import { useNowcast } from "@/lib/use-nowcast";

const PIPE_ICONS = [Satellite, Radio, Mountain, Siren] as const;

export function LandingPage() {
  return (
    <>
      <Hero />
      <Pipeline />
      <Differentiator />
      <Impact />
      <Architecture />
      <Team />
    </>
  );
}

function Hero() {
  const nowcast = useNowcast("vijayawada", "dgmr");

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-wide items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
        <div className="hero-enter">
          <p className="eyebrow">Team CloudNine · SRM University AP · SIH</p>
          <h1 className="mt-5 font-display text-hero font-semibold tracking-display text-fg">
            Street-level warnings.
            <span className="mt-1 block text-accent">Not state-level noise.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
            Nimbus treats radar as a video-prediction problem. A ConvLSTM nowcast
            writes the next 120 minutes onto a 1 km × 1 km micro-grid and fires
            geofenced alerts in under three seconds — only to the cells that will
            actually flood.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/map">
                Open live map
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/citizen">Citizen alert demo</Link>
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["< 3 s", "Predict + alert"],
              ["1 km²", "Micro-grid"],
              ["120 min", "Nowcast"],
            ].map(([k, v]) => (
              <div key={v} className="border-t border-border pt-3">
                <dt className="font-display text-xl font-semibold text-fg sm:text-2xl">{k}</dt>
                <dd className="mt-1 text-xs text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative rounded-xl bg-bg-elevated p-3 shadow-[0_0_0_1px_var(--color-border)] sm:p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-kicker text-muted">
              <span className="live-dot" />
              Live nowcast · Vijayawada
            </span>
            <Badge>DGMR</Badge>
          </div>
          <RadarNowcast
            city={nowcast.city}
            model={nowcast.model}
            timeMin={nowcast.timeMin}
            frames={nowcast.frames}
            selected={null}
            variant="panel"
          />
          <p className="mt-3 px-1 font-mono text-xs text-subtle">
            Predicted reflectivity · 1 km cells · T+{Math.round(nowcast.timeMin)} min
          </p>
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section id="solution" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">Pipeline</p>
          <h2 className="mt-4 font-display text-display font-semibold">
            Ingest. Predict. Overlay. Alert.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Four steps, each measured in seconds. Unlike broad polygon warnings,
            Nimbus uses a micro-grid so the public is not trained to ignore the
            siren.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((p, i) => {
            const Icon = PIPE_ICONS[i];
            return (
              <Reveal key={p.step} delay={i * 70}>
                <article className="h-full rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">{p.step}</span>
                    <Icon className="size-4 text-muted" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.body}</p>
                  <p className="mt-4 font-mono text-xs text-subtle">{p.meta}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Differentiator() {
  return (
    <section className="scroll-mt-20 border-b border-border bg-bg-elevated">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">Key differentiator</p>
          <h2 className="mt-4 font-display text-display font-semibold">
            One kilometre. Not one district.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Mass polygon alerts blanket entire cities and teach people to ignore
            them. Nimbus notifies only the 1 km cells that the nowcast says will
            breach a local vulnerability limit.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="rounded-xl bg-bg p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium text-muted">Traditional NWP</p>
              <p className="mt-1 font-display text-lg font-semibold">District polygon</p>
              <div className="mt-4 grid h-36 grid-cols-8 grid-rows-6 overflow-hidden rounded-lg bg-surface-2">
                {Array.from({ length: 48 }, (_, i) => (
                  <span key={i} className="bg-danger/25" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">
                2–4 hours to compute. The whole city is woken. Alert fatigue
                follows.
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="rounded-xl bg-bg p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium text-accent">Project Nimbus</p>
              <p className="mt-1 font-display text-lg font-semibold">1 km × 1 km micro-grid</p>
              <div className="mt-4 grid h-36 grid-cols-8 grid-rows-6 overflow-hidden rounded-lg bg-surface-2">
                {Array.from({ length: 48 }, (_, i) => {
                  const hot = i === 21 || i === 22 || i === 29;
                  return (
                    <span
                      key={i}
                      className={hot ? "bg-danger/80" : "bg-transparent"}
                    />
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-muted">
                Under 3 seconds. Geofenced SMS only if a GPS ping sits inside a
                predicted danger cell.
              </p>
            </article>
          </Reveal>
        </div>
        <Reveal className="mt-10 overflow-x-auto" delay={80}>
          <table className="w-full min-w-table text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-3 pr-4 font-medium">Feature</th>
                <th className="py-3 pr-4 font-medium">Traditional NWP</th>
                <th className="py-3 font-medium text-accent">Project Nimbus</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.feature} className="border-b border-border/70">
                  <td className="py-3 pr-4 text-fg">{row.feature}</td>
                  <td className="py-3 pr-4 text-muted">{row.nwp}</td>
                  <td className="py-3 text-fg">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section id="impact" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">Impact</p>
          <h2 className="mt-4 font-display text-display font-semibold">
            Minutes and kilometres, not slogans.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((s, i) => (
            <Reveal key={s.k} delay={i * 50}>
              <article className="h-full rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
                <p className="font-display text-3xl font-semibold tabular-nums text-accent">
                  {s.k === "2.5 Cr" ? (
                    <>
                      <CountUp value={2.5} decimals={1} /> Cr
                    </>
                  ) : (
                    s.k
                  )}
                </p>
                <p className="mt-2 text-sm text-muted">{s.l}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            {
              t: "State Disaster Management",
              d: "A command picture of which cell-zones have been notified — and which still sit in the path.",
            },
            {
              t: "Agriculture",
              d: "Exact rainfall windows to cover harvested crop, not a district bulletin.",
            },
            {
              t: "The public",
              d: "Skip the flooded underpass. The rest of the city is not woken for a core two kilometres away.",
            },
          ].map((w, i) => (
            <Reveal key={w.t} delay={i * 60}>
              <article className="h-full rounded-xl bg-bg-elevated p-5 shadow-[0_0_0_1px_var(--color-border)]">
                <h3 className="font-display text-lg font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm text-muted">{w.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const groups = [
    { title: "AI / training", icon: Cpu, items: STACK.ai },
    { title: "Backend", icon: Database, items: STACK.backend },
    { title: "Frontend", icon: Layers, items: STACK.frontend },
    { title: "Cloud", icon: Globe2, items: STACK.cloud },
  ] as const;

  return (
    <section id="architecture" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">Architecture</p>
          <h2 className="mt-4 font-display text-display font-semibold">Seconds. Not hours.</h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 60}>
              <article className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
                <div className="flex items-center gap-2 text-accent">
                  <g.icon className="size-4" />
                  <h3 className="font-display text-lg font-semibold text-fg">{g.title}</h3>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <article className="rounded-xl bg-bg-elevated p-5 shadow-[0_0_0_1px_var(--color-border)]">
            <h3 className="font-display text-lg font-semibold">Data flow</h3>
            <ul className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
              <li>
                <span className="text-fg">Input.</span> Live feeds from the IMD Open Data Portal and INSAT-3D APIs.
              </li>
              <li>
                <span className="text-fg">Processing.</span> Volumes are normalised; the model emits predicted reflectivity frames (dBZ).
              </li>
              <li>
                <span className="text-fg">Threshold engine.</span> Predicted rain/wind is tested against local vulnerability.
              </li>
              <li>
                <span className="text-fg">Output.</span> Twilio / Msg91 dispatch targeted SMS to the affected cell.
              </li>
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="scroll-mt-20">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">Team CloudNine</p>
          <h2 className="mt-4 font-display text-display font-semibold">SRM University AP</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Six builders. One nowcast. Mentored from CSE AIML at SRM-AP.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 40}>
              <article className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                  <span className="font-mono text-xs text-subtle">{m.track}</span>
                </div>
                <p className="mt-2 text-sm text-accent">{m.role}</p>
                <p className="mt-1 text-sm text-muted">{m.focus}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12" delay={80}>
          <p className="eyebrow">Key references</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>IMD Open Data Portal — radar and satellite feeds.</li>
            <li>
              Ravuri et al., “Skilful precipitation nowcasting using deep generative
              models of radar” (Nature, DeepMind).
            </li>
            <li>INSAT-3D / 3DR radiance products for convective initiation cues.</li>
          </ul>
          <div className="mt-8">
            <Button asChild>
              <Link to="/map">
                Launch the live map
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
