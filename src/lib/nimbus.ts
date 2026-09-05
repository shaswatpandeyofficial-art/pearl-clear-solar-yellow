export const GRID = 32;
export const FORECAST_MIN = 120;
export const FRAME_STEP = 10;
export const FRAME_COUNT = FORECAST_MIN / FRAME_STEP + 1;

export type ModelId = "optical" | "convlstm" | "dgmr";

export const MODELS: {
  id: ModelId;
  name: string;
  latency: string;
  note: string;
}[] = [
  {
    id: "optical",
    name: "Optical Flow",
    latency: "0.4 s",
    note: "Linear advection. Cells only slide — they never grow or die.",
  },
  {
    id: "convlstm",
    name: "ConvLSTM",
    latency: "1.8 s",
    note: "Spatiotemporal memory. Captures intensification and decay.",
  },
  {
    id: "dgmr",
    name: "DGMR",
    latency: "2.7 s",
    note: "Deep generative nowcast. Hallucinates physical development.",
  },
];

export type StormSeed = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  peak: number;
  sigma: number;
  t0: number;
  t1: number;
  peakT: number;
  spawn?: boolean;
};

export type Landmark = {
  x: number;
  y: number;
  name: string;
  kind: "civic" | "transit" | "water" | "farm";
};

export type City = {
  id: string;
  name: string;
  state: string;
  basin: string;
  density: number;
  lat: number;
  lng: number;
  blurb: string;
  river: { x: number; y: number }[];
  landmarks: Landmark[];
  storms: StormSeed[];
  userStart: { x: number; y: number };
};

export const CITIES: City[] = [
  {
    id: "vijayawada",
    name: "Vijayawada",
    state: "Andhra Pradesh",
    basin: "Krishna",
    density: 6800,
    lat: 16.5062,
    lng: 80.648,
    blurb: "Low-lying Krishna floodplain. Flash inundation along Benz Circle and the barrage belt.",
    river: [
      { x: 0.02, y: 0.78 },
      { x: 0.22, y: 0.7 },
      { x: 0.4, y: 0.58 },
      { x: 0.58, y: 0.5 },
      { x: 0.78, y: 0.4 },
      { x: 1.02, y: 0.32 },
    ],
    landmarks: [
      { x: 14, y: 18, name: "Benz Circle", kind: "transit" },
      { x: 8, y: 22, name: "Prakasam Barrage", kind: "water" },
      { x: 22, y: 10, name: "SRM AP", kind: "civic" },
      { x: 18, y: 16, name: "PNBS", kind: "transit" },
      { x: 11, y: 12, name: "Indrakeeladri", kind: "civic" },
    ],
    storms: [
      { x: 6, y: 24, vx: 6.2, vy: -4.4, peak: 58, sigma: 3.4, t0: 0, t1: 110, peakT: 42 },
      { x: 10, y: 20, vx: 4.8, vy: -3.2, peak: 46, sigma: 2.6, t0: 8, t1: 100, peakT: 50 },
      { x: 16, y: 26, vx: 5.1, vy: -5.6, peak: 62, sigma: 2.8, t0: 28, t1: 118, peakT: 72, spawn: true },
    ],
    userStart: { x: 15, y: 17 },
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    basin: "Mithi / Coast",
    density: 21000,
    lat: 19.076,
    lng: 72.8777,
    blurb: "Monsoon squall against a sealed urban bowl. Underpasses flood in minutes.",
    river: [
      { x: 0.18, y: 1.02 },
      { x: 0.22, y: 0.78 },
      { x: 0.28, y: 0.55 },
      { x: 0.4, y: 0.38 },
      { x: 0.58, y: 0.22 },
      { x: 0.72, y: 0.08 },
    ],
    landmarks: [
      { x: 12, y: 20, name: "Dharavi", kind: "civic" },
      { x: 8, y: 14, name: "Bandra-Worli", kind: "transit" },
      { x: 16, y: 8, name: "Airport", kind: "transit" },
      { x: 20, y: 22, name: "CST", kind: "transit" },
      { x: 18, y: 16, name: "Dadar", kind: "civic" },
    ],
    storms: [
      { x: 4, y: 8, vx: 3.4, vy: 5.8, peak: 61, sigma: 3.8, t0: 0, t1: 115, peakT: 38 },
      { x: 8, y: 4, vx: 2.6, vy: 6.2, peak: 52, sigma: 3.1, t0: 12, t1: 108, peakT: 55 },
      { x: 2, y: 16, vx: 4.4, vy: 3.8, peak: 57, sigma: 2.5, t0: 36, t1: 120, peakT: 78, spawn: true },
    ],
    userStart: { x: 13, y: 18 },
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    basin: "Adyar / Cooum",
    density: 17500,
    lat: 13.0827,
    lng: 80.2707,
    blurb: "Cyclonic rain bands stacking over a flat coastal city. Adyar spills first.",
    river: [
      { x: 0.0, y: 0.62 },
      { x: 0.25, y: 0.58 },
      { x: 0.48, y: 0.64 },
      { x: 0.7, y: 0.7 },
      { x: 0.92, y: 0.78 },
      { x: 1.05, y: 0.86 },
    ],
    landmarks: [
      { x: 26, y: 18, name: "Marina", kind: "civic" },
      { x: 16, y: 20, name: "T. Nagar", kind: "civic" },
      { x: 10, y: 12, name: "Airport", kind: "transit" },
      { x: 18, y: 22, name: "Adyar", kind: "water" },
      { x: 8, y: 24, name: "Tambaram", kind: "transit" },
    ],
    storms: [
      { x: 22, y: 6, vx: -4.2, vy: 5.4, peak: 64, sigma: 4.0, t0: 0, t1: 120, peakT: 48 },
      { x: 26, y: 10, vx: -3.6, vy: 4.2, peak: 49, sigma: 2.8, t0: 16, t1: 110, peakT: 60 },
      { x: 20, y: 2, vx: -5.0, vy: 6.0, peak: 59, sigma: 2.4, t0: 40, t1: 120, peakT: 82, spawn: true },
    ],
    userStart: { x: 17, y: 21 },
  },
  {
    id: "guwahati",
    name: "Guwahati",
    state: "Assam",
    basin: "Brahmaputra",
    density: 4400,
    lat: 26.1445,
    lng: 91.7362,
    blurb: "Orographic burst against the Khasi foothills. The riverbank wards go first.",
    river: [
      { x: 0.0, y: 0.28 },
      { x: 0.22, y: 0.32 },
      { x: 0.45, y: 0.3 },
      { x: 0.68, y: 0.26 },
      { x: 0.88, y: 0.3 },
      { x: 1.04, y: 0.36 },
    ],
    landmarks: [
      { x: 10, y: 14, name: "Kamakhya", kind: "civic" },
      { x: 16, y: 18, name: "Fancy Bazar", kind: "civic" },
      { x: 24, y: 12, name: "Airport", kind: "transit" },
      { x: 6, y: 10, name: "IITG", kind: "civic" },
      { x: 18, y: 8, name: "Saraighat", kind: "water" },
    ],
    storms: [
      { x: 8, y: 22, vx: 5.6, vy: -6.4, peak: 60, sigma: 3.2, t0: 0, t1: 100, peakT: 34 },
      { x: 14, y: 26, vx: 4.2, vy: -5.8, peak: 51, sigma: 2.7, t0: 10, t1: 112, peakT: 58 },
      { x: 20, y: 28, vx: 3.4, vy: -7.0, peak: 66, sigma: 2.3, t0: 32, t1: 118, peakT: 70, spawn: true },
    ],
    userStart: { x: 16, y: 16 },
  },
];

export function getCity(id: string): City {
  return CITIES.find((c) => c.id === id) ?? CITIES[0];
}

export type GridExtent = {
  dLat: number;
  dLng: number;
  north: number;
  south: number;
  west: number;
  east: number;
};

export function cityGrid(city: City): GridExtent {
  const dLat = 1 / 111.32;
  const dLng = 1 / (111.32 * Math.cos((city.lat * Math.PI) / 180));
  const north = city.lat + (GRID / 2) * dLat;
  const west = city.lng - (GRID / 2) * dLng;
  return {
    dLat,
    dLng,
    north,
    south: north - GRID * dLat,
    west,
    east: west + GRID * dLng,
  };
}

export function cellToLatLng(city: City, x: number, y: number): { lat: number; lng: number } {
  const g = cityGrid(city);
  return {
    lat: g.north - (y + 0.5) * g.dLat,
    lng: g.west + (x + 0.5) * g.dLng,
  };
}

export function latLngToCell(city: City, lat: number, lng: number): { x: number; y: number } | null {
  const g = cityGrid(city);
  const x = Math.floor((lng - g.west) / g.dLng);
  const y = Math.floor((g.north - lat) / g.dLat);
  if (x < 0 || y < 0 || x >= GRID || y >= GRID) return null;
  return { x, y };
}

function hash(x: number, y: number, t: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + t * 0.13) * 43758.5453;
  return n - Math.floor(n);
}

function envelope(t: number, s: StormSeed, model: ModelId): number {
  if (t < s.t0 || t > s.t1) return 0;
  const span = s.t1 - s.t0;
  const p = (t - s.t0) / span;
  if (model === "optical") return 0.82;
  const rise = Math.max(0.08, (s.peakT - s.t0) / span);
  let e: number;
  if (p < rise) e = Math.pow(p / rise, 0.72);
  else e = Math.pow(1 - (p - rise) / Math.max(0.08, 1 - rise), 1.15);
  if (model === "convlstm") return 0.35 + 0.65 * e;
  return e;
}

function dbzFromStorms(
  x: number,
  y: number,
  t: number,
  city: City,
  model: ModelId,
): number {
  let v = 0;
  for (const s of city.storms) {
    if (s.spawn) {
      if (model === "optical") continue;
      if (model === "convlstm" && t < s.t0 + 12) continue;
    }
    const env = envelope(t, s, model);
    if (env <= 0.01) continue;
    const hours = t / 60;
    const cx = s.x + s.vx * hours;
    const cy = s.y + s.vy * hours;
    let sigma = s.sigma;
    if (model === "dgmr") sigma = s.sigma * (0.85 + 0.55 * env);
    else if (model === "convlstm") sigma = s.sigma * (0.95 + 0.2 * env);
    const peak = model === "optical" ? s.peak * 0.78 : s.peak;
    const spawnMul = s.spawn && model === "convlstm" ? 0.42 : 1;
    const dx = x - cx;
    const dy = y - cy;
    const g = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
    v += peak * env * spawnMul * g;
  }
  if (model === "dgmr") v += (hash(x, y, t) - 0.5) * 3.2;
  return Math.max(0, Math.min(72, v));
}

const frameCache = new Map<string, Float32Array[]>();

export function getFrames(cityId: string, model: ModelId): Float32Array[] {
  const key = `${cityId}:${model}`;
  const hit = frameCache.get(key);
  if (hit) return hit;
  const city = getCity(cityId);
  const frames: Float32Array[] = [];
  for (let f = 0; f < FRAME_COUNT; f++) {
    const t = f * FRAME_STEP;
    const buf = new Float32Array(GRID * GRID);
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        buf[y * GRID + x] = dbzFromStorms(x + 0.5, y + 0.5, t, city, model);
      }
    }
    frames.push(buf);
  }
  frameCache.set(key, frames);
  return frames;
}

export function sampleDbz(frames: Float32Array[], timeMin: number, x: number, y: number): number {
  const t = Math.max(0, Math.min(FORECAST_MIN, timeMin));
  const idx = t / FRAME_STEP;
  const i0 = Math.max(0, Math.min(frames.length - 1, Math.floor(idx)));
  const i1 = Math.max(0, Math.min(frames.length - 1, i0 + 1));
  const f = idx - i0;
  const i = y * GRID + x;
  const a = frames[i0]?.[i] ?? 0;
  const b = frames[i1]?.[i] ?? 0;
  return a * (1 - f) + b * f;
}

const vulnCache = new Map<string, Float32Array>();

export function getVulnerability(city: City): Float32Array {
  const hit = vulnCache.get(city.id);
  if (hit) return hit;
  const buf = new Float32Array(GRID * GRID);
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const nx = (x + 0.5) / GRID;
      const ny = (y + 0.5) / GRID;
      let minD = 99;
      for (let i = 0; i < city.river.length - 1; i++) {
        const a = city.river[i];
        const b = city.river[i + 1];
        const d = distToSeg(nx, ny, a.x, a.y, b.x, b.y);
        if (d < minD) minD = d;
      }
      const river = Math.max(0, 1 - minD / 0.18);
      const bowl = 0.15 + 0.35 * (ny / 1);
      buf[y * GRID + x] = Math.min(1, river * 0.82 + bowl * 0.28);
    }
  }
  vulnCache.set(city.id, buf);
  return buf;
}

function distToSeg(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy || 1e-6;
  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  const qx = x1 + t * dx;
  const qy = y1 + t * dy;
  return Math.hypot(px - qx, py - qy);
}

export type CellAlert = {
  x: number;
  y: number;
  t: number;
  dbz: number;
  vuln: number;
  landmark: string | null;
};

export function computeAlerts(
  city: City,
  frames: Float32Array[],
  dbzMin: number,
  vulnMin: number,
): CellAlert[] {
  const vuln = getVulnerability(city);
  const out: CellAlert[] = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const v = vuln[y * GRID + x] ?? 0;
      if (v < vulnMin) continue;
      for (let f = 0; f < frames.length; f++) {
        const dbz = frames[f]?.[y * GRID + x] ?? 0;
        if (dbz >= dbzMin) {
          const lm = nearestLandmark(city, x, y, 3.2);
          out.push({ x, y, t: f * FRAME_STEP, dbz, vuln: v, landmark: lm });
          break;
        }
      }
    }
  }
  out.sort((a, b) => a.t - b.t || b.dbz - a.dbz);
  return out;
}

function nearestLandmark(city: City, x: number, y: number, max: number): string | null {
  let best: Landmark | null = null;
  let d0 = max;
  for (const lm of city.landmarks) {
    const d = Math.hypot(lm.x - x, lm.y - y);
    if (d < d0) {
      d0 = d;
      best = lm;
    }
  }
  return best?.name ?? null;
}

export function peopleNotified(city: City, alerts: CellAlert[]): number {
  return Math.round(alerts.length * city.density);
}

export type Rgba = [number, number, number, number];

const DBZ_STOPS: { z: number; c: Rgba }[] = [
  { z: 8, c: [0, 0, 0, 0] },
  { z: 18, c: [40, 90, 110, 90] },
  { z: 28, c: [70, 150, 165, 150] },
  { z: 38, c: [184, 164, 74, 185] },
  { z: 48, c: [196, 138, 58, 210] },
  { z: 58, c: [196, 92, 74, 230] },
  { z: 70, c: [236, 220, 210, 255] },
];

export function dbzToRgba(dbz: number): Rgba {
  if (dbz < 10) return [0, 0, 0, 0];
  for (let i = 0; i < DBZ_STOPS.length - 1; i++) {
    const a = DBZ_STOPS[i];
    const b = DBZ_STOPS[i + 1];
    if (dbz >= a.z && dbz <= b.z) {
      const t = (dbz - a.z) / (b.z - a.z || 1);
      return [
        a.c[0] + (b.c[0] - a.c[0]) * t,
        a.c[1] + (b.c[1] - a.c[1]) * t,
        a.c[2] + (b.c[2] - a.c[2]) * t,
        a.c[3] + (b.c[3] - a.c[3]) * t,
      ];
    }
  }
  return DBZ_STOPS[DBZ_STOPS.length - 1].c;
}

export function formatDbz(n: number): string {
  return `${n.toFixed(1)} dBZ`;
}

export function formatEta(min: number): string {
  if (min < 1) return "now";
  if (min < 60) return `${Math.round(min)} min`;
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return `${h}h ${m}m`;
}

export function actionForAlert(alert: CellAlert): string {
  if (alert.dbz >= 55 && alert.vuln >= 0.55) return "Seek higher ground immediately.";
  if (alert.dbz >= 48) return "Avoid underpasses and river roads.";
  if (alert.vuln >= 0.6) return "Move vehicles off low-lying streets.";
  return "Carry rain cover. Expect short, intense bursts.";
}

export type RiskLevel = "low" | "moderate" | "high" | "severe";

export function riskLevel(dbz: number, vuln = 0.5): RiskLevel {
  if (dbz >= 55 && vuln >= 0.4) return "severe";
  if (dbz >= 48) return "high";
  if (dbz >= 38) return "moderate";
  return "low";
}

export function clockLabel(ms = Date.now()): string {
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export const TEAM = [
  { name: "Sahil Rasal", track: "CSE AIML", role: "AIML Lead", focus: "ConvLSTM / DGMR fine-tune" },
  { name: "Anmol Vyas", track: "CSE AIML", role: "Nowcast Models", focus: "Radar video prediction" },
  { name: "Mahip Thakore", track: "CSE", role: "Backend", focus: "FastAPI · PostGIS · Redis" },
  { name: "Vshashant Pandey", track: "CSE", role: "Interface", focus: "React · live map rendering" },
  { name: "Sudhiksha P", track: "CSE", role: "Data & Cloud", focus: "IMD NetCDF · AWS · Docker" },
  { name: "Akarsh Sharma", track: "CSE", role: "GIS / UX", focus: "1 km micro-grid · alerts UX" },
] as const;

export const PIPELINE = [
  {
    step: "01",
    title: "Ingest",
    body: "IMD Radar & Satellite feeds (NetCDF format)",
    meta: "IMD Open Data · INSAT-3D",
  },
  {
    step: "02",
    title: "Predict",
    body: "ConvLSTM AI model extrapolates 120-min trajectory",
    meta: "< 3 seconds on GPU",
  },
  {
    step: "03",
    title: "Overlay",
    body: "Cross-reference with topographical risk data",
    meta: "PostGIS · 1 km grid",
  },
  {
    step: "04",
    title: "Alert",
    body: "Geofenced push & SMS alerts to affected area",
    meta: "Twilio · Msg91 · 1 km cells only",
  },
] as const;

export const COMPARE = [
  { feature: "Processing time", nwp: "2–4 hours", us: "Under 3 seconds" },
  { feature: "Spatial resolution", nwp: "Broad region / state", us: "Hyper-local 1 km × 1 km" },
  { feature: "Alert targeting", nwp: "Mass broadcast (TV, radio)", us: "Geofenced SMS / push" },
  { feature: "Foundation", nwp: "Physics & fluid equations", us: "Data-driven ConvLSTMs" },
  { feature: "Storm growth / decay", nwp: "Too slow for 0–2 h", us: "Generative nowcast (DGMR)" },
] as const;

export const STACK = {
  ai: ["Python", "PyTorch", "ConvLSTM", "DGMR (DeepMind)"],
  backend: ["FastAPI", "PostgreSQL + PostGIS", "Redis"],
  frontend: ["React", "Mapbox GL", "WebSockets"],
  cloud: ["Docker", "AWS EC2", "edge inference"],
} as const;

export const HOURS = [
  {
    range: "Hours 1–8",
    title: "Data pipeline & infrastructure",
    who: "Sahil · Sudhiksha",
    body: "Parse IMD historical radar (NetCDF). Stand up schemas, FastAPI routing, and the AWS envelope.",
  },
  {
    range: "Hours 8–20",
    title: "AI model fine-tuning",
    who: "Anmol · Sahil",
    body: "Fine-tune ConvLSTM on a 3-year IMD subset. First accurate predicted frames on held-out volumes.",
  },
  {
    range: "Hours 20–30",
    title: "Dashboard & API integration",
    who: "Vshashant · Mahip",
    body: "Command console, vulnerability logic, and a geofenced SMS simulation through Twilio.",
  },
  {
    range: "Hours 30–36",
    title: "Polish, QA & pitch",
    who: "Akarsh · CloudNine",
    body: "End-to-end integration, UI consistency, and the live demonstration path for judges.",
  },
] as const;

export const IMPACT = [
  { k: "45 min", l: "Extra response window for emergency services before impact." },
  { k: "10,000+", l: "Lives protected annually in flood-prone urban and rural cells." },
  { k: "2.5 Cr", l: "Indians facing daily disruption from unpredicted weather anomalies." },
  { k: "SDG 11 · 13", l: "Sustainable cities and climate action, measured in kilometres and minutes." },
] as const;
