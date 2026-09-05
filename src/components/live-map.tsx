import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { RadarNowcast } from "@/components/radar-nowcast";
import { RiskBadge } from "@/components/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CITIES,
  FORECAST_MIN,
  GRID,
  actionForAlert,
  cellToLatLng,
  cityGrid,
  dbzToRgba,
  formatDbz,
  formatEta,
  getVulnerability,
  latLngToCell,
  peopleNotified,
  sampleDbz,
  type CellAlert,
  type City,
} from "@/lib/nimbus";
import { contactsForZone, useOps } from "@/lib/ops-store";
import { cn } from "@/lib/utils";
import type { Map as LeafletMap } from "leaflet";

export type MapLayers = {
  grid: boolean;
  reflectivity: boolean;
  predicted: boolean;
  vulnerability: boolean;
};

type Props = {
  city: City;
  timeMin: number;
  frames: Float32Array[];
  selected: { x: number; y: number } | null;
  onSelect: (cell: { x: number; y: number } | null) => void;
  alerts: CellAlert[];
  activeAlerts: CellAlert[];
  playing: boolean;
  onPlaying: (v: boolean | ((p: boolean) => boolean)) => void;
  onTimeMin: (v: number) => void;
  cityId: string;
  onCityId: (id: string) => void;
  threshold: number;
};

type LayerKey = keyof MapLayers;

const LAYER_ITEMS: { key: LayerKey | "wind" | "temp"; label: string; disabled?: boolean }[] = [
  { key: "grid", label: "Micro-grid" },
  { key: "reflectivity", label: "Predicted reflectivity" },
  { key: "predicted", label: "Hot cells" },
  { key: "vulnerability", label: "Flood vulnerability" },
  { key: "wind", label: "Wind", disabled: true },
  { key: "temp", label: "Temperature", disabled: true },
];

export function LiveMap(props: Props) {
  const [layers, setLayers] = useState<MapLayers>({
    grid: true,
    reflectivity: true,
    predicted: true,
    vulnerability: false,
  });
  const [tileOk, setTileOk] = useState(true);
  const [mapFailed, setMapFailed] = useState(false);

  const onSelect = (cell: { x: number; y: number } | null) => props.onSelect(cell);

  return (
    <div className="bg-bg">
      <div className="relative h-[48vh] min-h-[280px] lg:h-[calc(100dvh-4rem)]">
        {mapFailed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-elevated p-4">
            <div className="w-full max-w-lg">
              <p className="mb-2 text-center text-xs text-muted">
                Basemap unavailable. Showing 1 km micro-grid only.
              </p>
              <RadarNowcast
                city={props.city}
                model="dgmr"
                timeMin={props.timeMin}
                frames={props.frames}
                selected={props.selected}
                onSelect={onSelect}
                alerts={props.alerts}
                showVuln={layers.vulnerability}
                variant="panel"
              />
            </div>
          </div>
        ) : (
          <LeafletStage
            city={props.city}
            timeMin={props.timeMin}
            frames={props.frames}
            selected={props.selected}
            onSelect={onSelect}
            activeAlerts={props.activeAlerts}
            layers={layers}
            onTileOk={setTileOk}
            onFailed={() => setMapFailed(true)}
          />
        )}

        {!tileOk && !mapFailed ? (
          <div className="pointer-events-none absolute left-1/2 top-3 z-[500] -translate-x-1/2 rounded-md bg-surface px-3 py-1.5 text-xs text-muted shadow-[0_0_0_1px_var(--color-border)]">
            Some tiles failed to load. Micro-grid overlay is still live.
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-0 z-[500] hidden lg:block">
          <div className="pointer-events-auto absolute top-3 left-3 w-56">
            <ControlCard
              cityId={props.cityId}
              onCityId={props.onCityId}
              layers={layers}
              onLayers={setLayers}
            />
          </div>
          <div className="pointer-events-auto absolute top-3 right-3 w-80">
            <ZonesCard {...props} />
          </div>
          <div className="pointer-events-auto absolute right-3 bottom-20 left-3">
            <TimelineBar {...props} />
          </div>
        </div>
      </div>

      <div className="space-y-3 p-3 lg:hidden">
        <TimelineBar {...props} />
        <ControlCard
          cityId={props.cityId}
          onCityId={props.onCityId}
          layers={layers}
          onLayers={setLayers}
        />
        <ZonesCard {...props} />
      </div>
    </div>
  );
}

function ControlCard({
  cityId,
  onCityId,
  layers,
  onLayers,
}: {
  cityId: string;
  onCityId: (id: string) => void;
  layers: MapLayers;
  onLayers: (l: MapLayers) => void;
}) {
  return (
    <section className="rounded-xl bg-surface/95 p-3 shadow-[0_0_0_1px_var(--color-border)] backdrop-blur-sm">
      <p className="eyebrow">Volume</p>
      <div className="mt-2 flex flex-col gap-0.5">
        {CITIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCityId(c.id)}
            className={cn(
              "rounded-md px-2.5 py-2 text-left text-sm",
              cityId === c.id ? "bg-accent text-accent-fg" : "text-fg hover:bg-surface-2",
            )}
          >
            {c.name}
            <span className={cn("mt-0.5 block text-[11px]", cityId === c.id ? "text-accent-fg/80" : "text-subtle")}>
              {c.basin}
            </span>
          </button>
        ))}
      </div>
      <p className="eyebrow mt-4">Layers</p>
      <ul className="mt-2 space-y-1">
        {LAYER_ITEMS.map((item) => {
          const on = !item.disabled && item.key in layers ? layers[item.key as LayerKey] : false;
          return (
            <li key={item.key}>
              <label
                className={cn(
                  "flex h-9 items-center gap-2 rounded-md px-1 text-sm",
                  item.disabled ? "cursor-not-allowed text-subtle" : "text-fg",
                )}
              >
                <input
                  type="checkbox"
                  className="size-4 accent-accent"
                  disabled={item.disabled}
                  checked={on}
                  onChange={() => {
                    if (item.disabled) return;
                    const k = item.key as LayerKey;
                    onLayers({ ...layers, [k]: !layers[k] });
                  }}
                />
                <span>{item.label}</span>
                {item.disabled ? <span className="ml-auto font-mono text-[10px] text-subtle">soon</span> : null}
              </label>
            </li>
          );
        })}
      </ul>
      <Legend />
    </section>
  );
}

function Legend() {
  const stops = [
    { l: "Low", c: "bg-ok" },
    { l: "Moderate", c: "bg-moderate" },
    { l: "High", c: "bg-warn" },
    { l: "Severe", c: "bg-danger" },
  ];
  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="eyebrow">Severity</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {stops.map((s) => (
          <span key={s.l} className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className={cn("size-2 rounded-full", s.c)} />
            {s.l}
          </span>
        ))}
      </div>
    </div>
  );
}

function ZonesCard(props: Props) {
  const contacts = useOps((s) => s.contacts);
  const pushActivity = useOps((s) => s.pushActivity);
  const notified = peopleNotified(props.city, props.activeAlerts);
  const selectedDbz =
    props.selected != null ? sampleDbz(props.frames, props.timeMin, props.selected.x, props.selected.y) : null;
  const vuln = useMemo(() => getVulnerability(props.city), [props.city]);
  const selectedVuln =
    props.selected != null ? (vuln[props.selected.y * GRID + props.selected.x] ?? 0) : 0;

  const notify = (alert: CellAlert) => {
    const zone = alert.landmark ?? props.city.name;
    const hits = contactsForZone(contacts, zone, props.city.name);
    const n = Math.max(1, hits.length);
    pushActivity(
      `SMS queued · ${zone} · ${formatDbz(alert.dbz)} · ${n} contact${n === 1 ? "" : "s"}`,
      "sms",
    );
    const sample = hits[0]?.phone ?? "geofence-cell";
    console.info("[Nimbus SMS mock]", {
      to: hits.map((h) => h.phone),
      zone,
      body: `NIMBUS ALERT: ${actionForAlert(alert)}`,
    });
    toast(`Queued ${n} SMS for ${zone}`, { description: `Mock dispatch · ${sample}` });
  };

  return (
    <section className="flex max-h-[min(70vh,36rem)] flex-col rounded-xl bg-surface/95 p-3 shadow-[0_0_0_1px_var(--color-border)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="eyebrow">Active zones</p>
        <Badge variant="outline">{props.activeAlerts.length} cells</Badge>
      </div>
      <p className="mt-1 text-xs text-muted">
        {notified.toLocaleString("en-IN")} residents in predicted 1 km cells at T+
        {Math.round(props.timeMin)}m
      </p>
      <ul className="mt-3 min-h-0 flex-1 space-y-2 overflow-auto pr-1">
        {props.activeAlerts.slice(0, 10).map((a) => (
          <li key={`${a.x}-${a.y}`}>
            <button
              type="button"
              onClick={() => props.onSelect({ x: a.x, y: a.y })}
              className={cn(
                "w-full rounded-lg p-2.5 text-left shadow-[0_0_0_1px_var(--color-border)]",
                props.selected?.x === a.x && props.selected?.y === a.y
                  ? "bg-surface-2"
                  : "bg-bg-elevated hover:bg-surface-2",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-fg">{a.landmark ?? `Cell ${a.x},${a.y}`}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-subtle">
                    {a.x},{a.y} · ETA {formatEta(Math.max(0, a.t))}
                  </p>
                </div>
                <RiskBadge dbz={a.dbz} vuln={a.vuln} />
              </div>
              <p className="mt-1 font-mono text-[11px] text-accent">{formatDbz(a.dbz)}</p>
            </button>
          </li>
        ))}
        {props.activeAlerts.length === 0 ? (
          <li className="text-sm text-muted">No breaches yet. Advance the horizon.</li>
        ) : null}
      </ul>
      {props.selected && selectedDbz != null ? (
        <div className="mt-3 border-t border-border pt-3">
          <p className="text-xs text-muted">
            Cell {props.selected.x},{props.selected.y} · {formatDbz(selectedDbz)} · vuln{" "}
            {Math.round(selectedVuln * 100)}%
          </p>
          <Button
            type="button"
            size="sm"
            className="mt-2 w-full"
            onClick={() => {
              const existing = props.activeAlerts.find(
                (a) => a.x === props.selected!.x && a.y === props.selected!.y,
              );
              notify(
                existing ?? {
                  x: props.selected!.x,
                  y: props.selected!.y,
                  t: props.timeMin,
                  dbz: selectedDbz,
                  vuln: selectedVuln,
                  landmark: null,
                },
              );
            }}
          >
            Notify zone
          </Button>
        </div>
      ) : null}
    </section>
  );
}

function TimelineBar(props: Props) {
  const ticks = [0, 30, 60, 90, 120];
  return (
    <section className="rounded-xl bg-surface/95 px-3 py-3 shadow-[0_0_0_1px_var(--color-border)] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          aria-label={props.playing ? "Pause" : "Play"}
          onClick={() => props.onPlaying((p) => !p)}
        >
          {props.playing ? <Pause /> : <Play className="ml-0.5" />}
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Reset timeline"
          onClick={() => {
            props.onTimeMin(0);
            props.onPlaying(true);
          }}
        >
          <RotateCcw />
        </Button>
        <div className="min-w-0 flex-1">
          <input
            type="range"
            className="timeline-range h-11 w-full"
            min={0}
            max={FORECAST_MIN}
            value={Math.round(props.timeMin)}
            onChange={(e) => {
              props.onPlaying(false);
              props.onTimeMin(Number(e.target.value));
            }}
            aria-label="Forecast lead time"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-subtle">
            {ticks.map((t) => (
              <span key={t}>T+{t}</span>
            ))}
          </div>
        </div>
        <span className="w-16 text-right font-mono text-sm tabular-nums text-accent">
          T+{Math.round(props.timeMin)}m
        </span>
      </div>
    </section>
  );
}

function LeafletStage({
  city,
  timeMin,
  frames,
  selected,
  onSelect,
  activeAlerts,
  layers,
  onTileOk,
  onFailed,
}: {
  city: City;
  timeMin: number;
  frames: Float32Array[];
  selected: { x: number; y: number } | null;
  onSelect: (cell: { x: number; y: number } | null) => void;
  activeAlerts: CellAlert[];
  layers: MapLayers;
  onTileOk: (ok: boolean) => void;
  onFailed: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cityRef = useRef(city);
  const selectRef = useRef(onSelect);
  const paintRef = useRef<() => void>(() => {});
  const setPosRef = useRef<(el: HTMLElement, x: number, y: number) => void>(() => {});
  cityRef.current = city;
  selectRef.current = onSelect;

  paintRef.current = () => {
    const canvas = canvasRef.current;
    const map = mapRef.current;
    if (!canvas || !map) return;
    const g = cityGrid(city);
    const nw = map.latLngToLayerPoint([g.north, g.west]);
    const se = map.latLngToLayerPoint([g.south, g.east]);
    const w = Math.max(32, se.x - nw.x);
    const h = Math.max(32, se.y - nw.y);
    setPosRef.current(canvas, nw.x, nw.y);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    paintGrid(canvas, city, frames, timeMin, layers, activeAlerts, selected);
  };

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let destroyed = false;
    let map: LeafletMap | null = null;
    let canvas: HTMLCanvasElement | null = null;

    (async () => {
      try {
        const mod = await import("leaflet");
        const L = ((mod as { default?: typeof import("leaflet") }).default ??
          mod) as typeof import("leaflet");
        if (destroyed || !hostRef.current) return;
        setPosRef.current = (el, x, y) => {
          L.DomUtil.setPosition(el, L.point(x, y));
        };
        hostRef.current.innerHTML = "";
        const g = cityGrid(city);
        const bounds = L.latLngBounds([g.south, g.west], [g.north, g.east]);
        map = L.map(hostRef.current, {
          zoomControl: false,
          attributionControl: true,
          minZoom: 9,
          maxZoom: 15,
          preferCanvas: true,
        });
        L.control.zoom({ position: "bottomright" }).addTo(map);
        map.fitBounds(bounds, { padding: [28, 28], maxZoom: 12 });

        let errors = 0;
        const tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution: "&copy; OSM &copy; CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        });
        tiles.on("tileerror", () => {
          errors += 1;
          if (errors >= 8) onTileOk(false);
        });
        tiles.addTo(map);

        canvas = L.DomUtil.create("canvas", "nimbus-radar-canvas") as HTMLCanvasElement;
        canvas.style.pointerEvents = "none";
        canvas.style.position = "absolute";
        map.getPanes().overlayPane.appendChild(canvas);
        canvasRef.current = canvas;

        const labels = L.layerGroup();
        for (const lm of city.landmarks) {
          const ll = cellToLatLng(city, lm.x, lm.y);
          L.marker([ll.lat, ll.lng], {
            icon: L.divIcon({
              className: "nimbus-pin",
              html: `<span>${lm.name}</span>`,
              iconSize: [0, 0],
            }),
            interactive: false,
          }).addTo(labels);
        }
        labels.addTo(map);

        const sync = () => paintRef.current();
        map.on("move zoom viewreset", sync);
        map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
          const cell = latLngToCell(cityRef.current, e.latlng.lat, e.latlng.lng);
          selectRef.current(cell);
        });
        mapRef.current = map;
        requestAnimationFrame(sync);
        window.setTimeout(() => map?.invalidateSize(), 80);
      } catch {
        if (!destroyed) onFailed();
      }
    })();

    return () => {
      destroyed = true;
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
      canvasRef.current = null;
      map?.off();
      map?.remove();
      mapRef.current = null;
    };
    // Re-init when the city volume changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city.id]);

  useEffect(() => {
    paintRef.current();
  }, [timeMin, frames, layers, selected, activeAlerts, city.id]);

  return <div ref={hostRef} className="absolute inset-0" role="application" aria-label={`${city.name} nowcast map`} />;
}

function paintGrid(
  canvas: HTMLCanvasElement,
  city: City,
  frames: Float32Array[],
  timeMin: number,
  layers: MapLayers,
  active: CellAlert[],
  selected: { x: number; y: number } | null,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const cw = w / GRID;
  const ch = h / GRID;
  const vuln = layers.vulnerability ? getVulnerability(city) : null;
  const hot = new Set(active.map((a) => `${a.x},${a.y}`));

  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const dbz = sampleDbz(frames, timeMin, x, y);
      const px = x * cw;
      const py = y * ch;
      if (layers.reflectivity && dbz > 12) {
        const [r, g, b, a] = dbzToRgba(dbz);
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a / 255})`;
        ctx.fillRect(px, py, cw + 0.6, ch + 0.6);
      } else if (layers.predicted && hot.has(`${x},${y}`)) {
        const [r, g, b] = dbzToRgba(Math.max(dbz, 42));
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},0.4)`;
        ctx.fillRect(px, py, cw + 0.6, ch + 0.6);
      }
      if (vuln) {
        const v = vuln[y * GRID + x] ?? 0;
        if (v > 0.45) {
          ctx.fillStyle = `rgba(196,138,58,${v * 0.2})`;
          ctx.fillRect(px, py, cw + 0.6, ch + 0.6);
        }
      }
    }
  }

  if (layers.grid) {
    ctx.strokeStyle = "rgba(232,238,244,0.14)";
    ctx.lineWidth = Math.max(1, cw * 0.03);
    for (let i = 0; i <= GRID; i++) {
      ctx.globalAlpha = i % 4 === 0 ? 1 : 0.45;
      ctx.beginPath();
      ctx.moveTo(i * cw, 0);
      ctx.lineTo(i * cw, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * ch);
      ctx.lineTo(w, i * ch);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  if (layers.predicted) {
    ctx.strokeStyle = "rgba(196,92,74,0.92)";
    ctx.lineWidth = Math.max(1.4, cw * 0.07);
    for (const a of active) {
      ctx.strokeRect(a.x * cw + 1, a.y * ch + 1, cw - 2, ch - 2);
    }
  }

  if (selected) {
    ctx.strokeStyle = "rgba(232,238,244,0.95)";
    ctx.lineWidth = Math.max(2, cw * 0.1);
    ctx.strokeRect(selected.x * cw + 2, selected.y * ch + 2, cw - 4, ch - 4);
  }
}
