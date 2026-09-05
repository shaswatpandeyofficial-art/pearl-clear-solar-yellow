import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-giFZj0HH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border bg-bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-wide flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "Nimbus"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-muted",
				children: "An AI-driven hyper-local early warning system for severe weather nowcasting. Team CloudNine · SRM University AP · Smart India Hackathon."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-kicker text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-fg",
						children: "Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/map",
						className: "hover:text-fg",
						children: "Live Map"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/citizen",
						className: "hover:text-fg",
						children: "Citizen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/console",
						className: "hover:text-fg",
						children: "Command"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://mausam.imd.gov.in/",
						className: "hover:text-fg",
						target: "_blank",
						rel: "noreferrer",
						children: "IMD"
					})
				]
			})]
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-surface text-fg shadow-[0_0_0_1px_var(--color-border)] hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface",
			outline: "text-fg shadow-[0_0_0_1px_var(--color-border)] hover:bg-surface",
			danger: "bg-danger text-fg hover:bg-danger/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var MODELS = [
	{
		id: "optical",
		name: "Optical Flow",
		latency: "0.4 s",
		note: "Linear advection. Cells only slide — they never grow or die."
	},
	{
		id: "convlstm",
		name: "ConvLSTM",
		latency: "1.8 s",
		note: "Spatiotemporal memory. Captures intensification and decay."
	},
	{
		id: "dgmr",
		name: "DGMR",
		latency: "2.7 s",
		note: "Deep generative nowcast. Hallucinates physical development."
	}
];
var CITIES = [
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
			{
				x: .02,
				y: .78
			},
			{
				x: .22,
				y: .7
			},
			{
				x: .4,
				y: .58
			},
			{
				x: .58,
				y: .5
			},
			{
				x: .78,
				y: .4
			},
			{
				x: 1.02,
				y: .32
			}
		],
		landmarks: [
			{
				x: 14,
				y: 18,
				name: "Benz Circle",
				kind: "transit"
			},
			{
				x: 8,
				y: 22,
				name: "Prakasam Barrage",
				kind: "water"
			},
			{
				x: 22,
				y: 10,
				name: "SRM AP",
				kind: "civic"
			},
			{
				x: 18,
				y: 16,
				name: "PNBS",
				kind: "transit"
			},
			{
				x: 11,
				y: 12,
				name: "Indrakeeladri",
				kind: "civic"
			}
		],
		storms: [
			{
				x: 6,
				y: 24,
				vx: 6.2,
				vy: -4.4,
				peak: 58,
				sigma: 3.4,
				t0: 0,
				t1: 110,
				peakT: 42
			},
			{
				x: 10,
				y: 20,
				vx: 4.8,
				vy: -3.2,
				peak: 46,
				sigma: 2.6,
				t0: 8,
				t1: 100,
				peakT: 50
			},
			{
				x: 16,
				y: 26,
				vx: 5.1,
				vy: -5.6,
				peak: 62,
				sigma: 2.8,
				t0: 28,
				t1: 118,
				peakT: 72,
				spawn: true
			}
		],
		userStart: {
			x: 15,
			y: 17
		}
	},
	{
		id: "mumbai",
		name: "Mumbai",
		state: "Maharashtra",
		basin: "Mithi / Coast",
		density: 21e3,
		lat: 19.076,
		lng: 72.8777,
		blurb: "Monsoon squall against a sealed urban bowl. Underpasses flood in minutes.",
		river: [
			{
				x: .18,
				y: 1.02
			},
			{
				x: .22,
				y: .78
			},
			{
				x: .28,
				y: .55
			},
			{
				x: .4,
				y: .38
			},
			{
				x: .58,
				y: .22
			},
			{
				x: .72,
				y: .08
			}
		],
		landmarks: [
			{
				x: 12,
				y: 20,
				name: "Dharavi",
				kind: "civic"
			},
			{
				x: 8,
				y: 14,
				name: "Bandra-Worli",
				kind: "transit"
			},
			{
				x: 16,
				y: 8,
				name: "Airport",
				kind: "transit"
			},
			{
				x: 20,
				y: 22,
				name: "CST",
				kind: "transit"
			},
			{
				x: 18,
				y: 16,
				name: "Dadar",
				kind: "civic"
			}
		],
		storms: [
			{
				x: 4,
				y: 8,
				vx: 3.4,
				vy: 5.8,
				peak: 61,
				sigma: 3.8,
				t0: 0,
				t1: 115,
				peakT: 38
			},
			{
				x: 8,
				y: 4,
				vx: 2.6,
				vy: 6.2,
				peak: 52,
				sigma: 3.1,
				t0: 12,
				t1: 108,
				peakT: 55
			},
			{
				x: 2,
				y: 16,
				vx: 4.4,
				vy: 3.8,
				peak: 57,
				sigma: 2.5,
				t0: 36,
				t1: 120,
				peakT: 78,
				spawn: true
			}
		],
		userStart: {
			x: 13,
			y: 18
		}
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
			{
				x: 0,
				y: .62
			},
			{
				x: .25,
				y: .58
			},
			{
				x: .48,
				y: .64
			},
			{
				x: .7,
				y: .7
			},
			{
				x: .92,
				y: .78
			},
			{
				x: 1.05,
				y: .86
			}
		],
		landmarks: [
			{
				x: 26,
				y: 18,
				name: "Marina",
				kind: "civic"
			},
			{
				x: 16,
				y: 20,
				name: "T. Nagar",
				kind: "civic"
			},
			{
				x: 10,
				y: 12,
				name: "Airport",
				kind: "transit"
			},
			{
				x: 18,
				y: 22,
				name: "Adyar",
				kind: "water"
			},
			{
				x: 8,
				y: 24,
				name: "Tambaram",
				kind: "transit"
			}
		],
		storms: [
			{
				x: 22,
				y: 6,
				vx: -4.2,
				vy: 5.4,
				peak: 64,
				sigma: 4,
				t0: 0,
				t1: 120,
				peakT: 48
			},
			{
				x: 26,
				y: 10,
				vx: -3.6,
				vy: 4.2,
				peak: 49,
				sigma: 2.8,
				t0: 16,
				t1: 110,
				peakT: 60
			},
			{
				x: 20,
				y: 2,
				vx: -5,
				vy: 6,
				peak: 59,
				sigma: 2.4,
				t0: 40,
				t1: 120,
				peakT: 82,
				spawn: true
			}
		],
		userStart: {
			x: 17,
			y: 21
		}
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
			{
				x: 0,
				y: .28
			},
			{
				x: .22,
				y: .32
			},
			{
				x: .45,
				y: .3
			},
			{
				x: .68,
				y: .26
			},
			{
				x: .88,
				y: .3
			},
			{
				x: 1.04,
				y: .36
			}
		],
		landmarks: [
			{
				x: 10,
				y: 14,
				name: "Kamakhya",
				kind: "civic"
			},
			{
				x: 16,
				y: 18,
				name: "Fancy Bazar",
				kind: "civic"
			},
			{
				x: 24,
				y: 12,
				name: "Airport",
				kind: "transit"
			},
			{
				x: 6,
				y: 10,
				name: "IITG",
				kind: "civic"
			},
			{
				x: 18,
				y: 8,
				name: "Saraighat",
				kind: "water"
			}
		],
		storms: [
			{
				x: 8,
				y: 22,
				vx: 5.6,
				vy: -6.4,
				peak: 60,
				sigma: 3.2,
				t0: 0,
				t1: 100,
				peakT: 34
			},
			{
				x: 14,
				y: 26,
				vx: 4.2,
				vy: -5.8,
				peak: 51,
				sigma: 2.7,
				t0: 10,
				t1: 112,
				peakT: 58
			},
			{
				x: 20,
				y: 28,
				vx: 3.4,
				vy: -7,
				peak: 66,
				sigma: 2.3,
				t0: 32,
				t1: 118,
				peakT: 70,
				spawn: true
			}
		],
		userStart: {
			x: 16,
			y: 16
		}
	}
];
function getCity(id) {
	return CITIES.find((c) => c.id === id) ?? CITIES[0];
}
function cityGrid(city) {
	const dLat = 1 / 111.32;
	const dLng = 1 / (111.32 * Math.cos(city.lat * Math.PI / 180));
	const north = city.lat + 16 * dLat;
	const west = city.lng - 16 * dLng;
	return {
		dLat,
		dLng,
		north,
		south: north - 32 * dLat,
		west,
		east: west + 32 * dLng
	};
}
function cellToLatLng(city, x, y) {
	const g = cityGrid(city);
	return {
		lat: g.north - (y + .5) * g.dLat,
		lng: g.west + (x + .5) * g.dLng
	};
}
function latLngToCell(city, lat, lng) {
	const g = cityGrid(city);
	const x = Math.floor((lng - g.west) / g.dLng);
	const y = Math.floor((g.north - lat) / g.dLat);
	if (x < 0 || y < 0 || x >= 32 || y >= 32) return null;
	return {
		x,
		y
	};
}
function hash(x, y, t) {
	const n = Math.sin(x * 12.9898 + y * 78.233 + t * .13) * 43758.5453;
	return n - Math.floor(n);
}
function envelope(t, s, model) {
	if (t < s.t0 || t > s.t1) return 0;
	const span = s.t1 - s.t0;
	const p = (t - s.t0) / span;
	if (model === "optical") return .82;
	const rise = Math.max(.08, (s.peakT - s.t0) / span);
	let e;
	if (p < rise) e = Math.pow(p / rise, .72);
	else e = Math.pow(1 - (p - rise) / Math.max(.08, 1 - rise), 1.15);
	if (model === "convlstm") return .35 + .65 * e;
	return e;
}
function dbzFromStorms(x, y, t, city, model) {
	let v = 0;
	for (const s of city.storms) {
		if (s.spawn) {
			if (model === "optical") continue;
			if (model === "convlstm" && t < s.t0 + 12) continue;
		}
		const env = envelope(t, s, model);
		if (env <= .01) continue;
		const hours = t / 60;
		const cx = s.x + s.vx * hours;
		const cy = s.y + s.vy * hours;
		let sigma = s.sigma;
		if (model === "dgmr") sigma = s.sigma * (.85 + .55 * env);
		else if (model === "convlstm") sigma = s.sigma * (.95 + .2 * env);
		const peak = model === "optical" ? s.peak * .78 : s.peak;
		const spawnMul = s.spawn && model === "convlstm" ? .42 : 1;
		const dx = x - cx;
		const dy = y - cy;
		const g = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
		v += peak * env * spawnMul * g;
	}
	if (model === "dgmr") v += (hash(x, y, t) - .5) * 3.2;
	return Math.max(0, Math.min(72, v));
}
var frameCache = /* @__PURE__ */ new Map();
function getFrames(cityId, model) {
	const key = `${cityId}:${model}`;
	const hit = frameCache.get(key);
	if (hit) return hit;
	const city = getCity(cityId);
	const frames = [];
	for (let f = 0; f < 13; f++) {
		const t = f * 10;
		const buf = /* @__PURE__ */ new Float32Array(1024);
		for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) buf[y * 32 + x] = dbzFromStorms(x + .5, y + .5, t, city, model);
		frames.push(buf);
	}
	frameCache.set(key, frames);
	return frames;
}
function sampleDbz(frames, timeMin, x, y) {
	const idx = Math.max(0, Math.min(120, timeMin)) / 10;
	const i0 = Math.max(0, Math.min(frames.length - 1, Math.floor(idx)));
	const i1 = Math.max(0, Math.min(frames.length - 1, i0 + 1));
	const f = idx - i0;
	const i = y * 32 + x;
	const a = frames[i0]?.[i] ?? 0;
	const b = frames[i1]?.[i] ?? 0;
	return a * (1 - f) + b * f;
}
var vulnCache = /* @__PURE__ */ new Map();
function getVulnerability(city) {
	const hit = vulnCache.get(city.id);
	if (hit) return hit;
	const buf = /* @__PURE__ */ new Float32Array(1024);
	for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
		const nx = (x + .5) / 32;
		const ny = (y + .5) / 32;
		let minD = 99;
		for (let i = 0; i < city.river.length - 1; i++) {
			const a = city.river[i];
			const b = city.river[i + 1];
			const d = distToSeg(nx, ny, a.x, a.y, b.x, b.y);
			if (d < minD) minD = d;
		}
		const river = Math.max(0, 1 - minD / .18);
		const bowl = .15 + .35 * (ny / 1);
		buf[y * 32 + x] = Math.min(1, river * .82 + bowl * .28);
	}
	vulnCache.set(city.id, buf);
	return buf;
}
function distToSeg(px, py, x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const l2 = dx * dx + dy * dy || 1e-6;
	let t = ((px - x1) * dx + (py - y1) * dy) / l2;
	t = Math.max(0, Math.min(1, t));
	const qx = x1 + t * dx;
	const qy = y1 + t * dy;
	return Math.hypot(px - qx, py - qy);
}
function computeAlerts(city, frames, dbzMin, vulnMin) {
	const vuln = getVulnerability(city);
	const out = [];
	for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
		const v = vuln[y * 32 + x] ?? 0;
		if (v < vulnMin) continue;
		for (let f = 0; f < frames.length; f++) {
			const dbz = frames[f]?.[y * 32 + x] ?? 0;
			if (dbz >= dbzMin) {
				const lm = nearestLandmark(city, x, y, 3.2);
				out.push({
					x,
					y,
					t: f * 10,
					dbz,
					vuln: v,
					landmark: lm
				});
				break;
			}
		}
	}
	out.sort((a, b) => a.t - b.t || b.dbz - a.dbz);
	return out;
}
function nearestLandmark(city, x, y, max) {
	let best = null;
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
function peopleNotified(city, alerts) {
	return Math.round(alerts.length * city.density);
}
var DBZ_STOPS = [
	{
		z: 8,
		c: [
			0,
			0,
			0,
			0
		]
	},
	{
		z: 18,
		c: [
			40,
			90,
			110,
			90
		]
	},
	{
		z: 28,
		c: [
			70,
			150,
			165,
			150
		]
	},
	{
		z: 38,
		c: [
			184,
			164,
			74,
			185
		]
	},
	{
		z: 48,
		c: [
			196,
			138,
			58,
			210
		]
	},
	{
		z: 58,
		c: [
			196,
			92,
			74,
			230
		]
	},
	{
		z: 70,
		c: [
			236,
			220,
			210,
			255
		]
	}
];
function dbzToRgba(dbz) {
	if (dbz < 10) return [
		0,
		0,
		0,
		0
	];
	for (let i = 0; i < DBZ_STOPS.length - 1; i++) {
		const a = DBZ_STOPS[i];
		const b = DBZ_STOPS[i + 1];
		if (dbz >= a.z && dbz <= b.z) {
			const t = (dbz - a.z) / (b.z - a.z || 1);
			return [
				a.c[0] + (b.c[0] - a.c[0]) * t,
				a.c[1] + (b.c[1] - a.c[1]) * t,
				a.c[2] + (b.c[2] - a.c[2]) * t,
				a.c[3] + (b.c[3] - a.c[3]) * t
			];
		}
	}
	return DBZ_STOPS[DBZ_STOPS.length - 1].c;
}
function formatDbz(n) {
	return `${n.toFixed(1)} dBZ`;
}
function formatEta(min) {
	if (min < 1) return "now";
	if (min < 60) return `${Math.round(min)} min`;
	return `${Math.floor(min / 60)}h ${Math.round(min % 60)}m`;
}
function actionForAlert(alert) {
	if (alert.dbz >= 55 && alert.vuln >= .55) return "Seek higher ground immediately.";
	if (alert.dbz >= 48) return "Avoid underpasses and river roads.";
	if (alert.vuln >= .6) return "Move vehicles off low-lying streets.";
	return "Carry rain cover. Expect short, intense bursts.";
}
function riskLevel(dbz, vuln = .5) {
	if (dbz >= 55 && vuln >= .4) return "severe";
	if (dbz >= 48) return "high";
	if (dbz >= 38) return "moderate";
	return "low";
}
function clockLabel(ms = Date.now()) {
	return new Date(ms).toLocaleTimeString("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
var TEAM = [
	{
		name: "Sahil Rasal",
		track: "CSE AIML",
		role: "AIML Lead",
		focus: "ConvLSTM / DGMR fine-tune"
	},
	{
		name: "Anmol Vyas",
		track: "CSE AIML",
		role: "Nowcast Models",
		focus: "Radar video prediction"
	},
	{
		name: "Mahip Thakore",
		track: "CSE",
		role: "Backend",
		focus: "FastAPI · PostGIS · Redis"
	},
	{
		name: "Vshashant Pandey",
		track: "CSE",
		role: "Interface",
		focus: "React · live map rendering"
	},
	{
		name: "Sudhiksha P",
		track: "CSE",
		role: "Data & Cloud",
		focus: "IMD NetCDF · AWS · Docker"
	},
	{
		name: "Akarsh Sharma",
		track: "CSE",
		role: "GIS / UX",
		focus: "1 km micro-grid · alerts UX"
	}
];
var PIPELINE = [
	{
		step: "01",
		title: "Ingest",
		body: "IMD Radar & Satellite feeds (NetCDF format)",
		meta: "IMD Open Data · INSAT-3D"
	},
	{
		step: "02",
		title: "Predict",
		body: "ConvLSTM AI model extrapolates 120-min trajectory",
		meta: "< 3 seconds on GPU"
	},
	{
		step: "03",
		title: "Overlay",
		body: "Cross-reference with topographical risk data",
		meta: "PostGIS · 1 km grid"
	},
	{
		step: "04",
		title: "Alert",
		body: "Geofenced push & SMS alerts to affected area",
		meta: "Twilio · Msg91 · 1 km cells only"
	}
];
var COMPARE = [
	{
		feature: "Processing time",
		nwp: "2–4 hours",
		us: "Under 3 seconds"
	},
	{
		feature: "Spatial resolution",
		nwp: "Broad region / state",
		us: "Hyper-local 1 km × 1 km"
	},
	{
		feature: "Alert targeting",
		nwp: "Mass broadcast (TV, radio)",
		us: "Geofenced SMS / push"
	},
	{
		feature: "Foundation",
		nwp: "Physics & fluid equations",
		us: "Data-driven ConvLSTMs"
	},
	{
		feature: "Storm growth / decay",
		nwp: "Too slow for 0–2 h",
		us: "Generative nowcast (DGMR)"
	}
];
var STACK = {
	ai: [
		"Python",
		"PyTorch",
		"ConvLSTM",
		"DGMR (DeepMind)"
	],
	backend: [
		"FastAPI",
		"PostgreSQL + PostGIS",
		"Redis"
	],
	frontend: [
		"React",
		"Mapbox GL",
		"WebSockets"
	],
	cloud: [
		"Docker",
		"AWS EC2",
		"edge inference"
	]
};
var IMPACT = [
	{
		k: "45 min",
		l: "Extra response window for emergency services before impact."
	},
	{
		k: "10,000+",
		l: "Lives protected annually in flood-prone urban and rural cells."
	},
	{
		k: "2.5 Cr",
		l: "Indians facing daily disruption from unpredicted weather anomalies."
	},
	{
		k: "SDG 11 · 13",
		l: "Sustainable cities and climate action, measured in kilometres and minutes."
	}
];
var CONTACTS_KEY = "nimbus.contacts";
var ACTIVITY_KEY = "nimbus.activity";
var CITY_KEY = "nimbus.city";
var THRESH_KEY = "nimbus.thresholds";
var SEED_CONTACTS = [
	{
		id: "c1",
		name: "AP SDMA Duty Desk",
		phone: "08662470000",
		zone: "Vijayawada",
		role: "SDMA"
	},
	{
		id: "c2",
		name: "VMC Control Room",
		phone: "08662410000",
		zone: "Benz Circle",
		role: "Municipal"
	},
	{
		id: "c3",
		name: "Krishna Collectorate",
		phone: "08662570000",
		zone: "Vijayawada",
		role: "Collector"
	},
	{
		id: "c4",
		name: "Mumbai Disaster Cell",
		phone: "1916",
		zone: "Mumbai",
		role: "Mumbai"
	},
	{
		id: "c5",
		name: "Chennai Corporation",
		phone: "04425619200",
		zone: "Chennai",
		role: "Municipal"
	}
];
function canStore$1() {
	return typeof window !== "undefined";
}
function readJson(key, fallback) {
	if (!canStore$1()) return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	if (!canStore$1()) return;
	window.localStorage.setItem(key, JSON.stringify(value));
}
function persistThresh(threshold, vulnMin) {
	writeJson(THRESH_KEY, {
		threshold,
		vulnMin
	});
}
var useOps = create((set, get) => ({
	ready: false,
	cityId: CITIES[0].id,
	threshold: 45,
	vulnMin: .35,
	contacts: SEED_CONTACTS,
	activity: [],
	hydrate: () => {
		const contacts = readJson(CONTACTS_KEY, SEED_CONTACTS);
		const activity = readJson(ACTIVITY_KEY, []);
		const cityId = canStore$1() ? window.localStorage.getItem(CITY_KEY) ?? CITIES[0].id : CITIES[0].id;
		const thresh = readJson(THRESH_KEY, {
			threshold: 45,
			vulnMin: .35
		});
		if (!canStore$1() || !window.localStorage.getItem(CONTACTS_KEY)) writeJson(CONTACTS_KEY, contacts);
		set({
			ready: true,
			contacts,
			activity,
			cityId,
			threshold: thresh.threshold,
			vulnMin: thresh.vulnMin
		});
	},
	setCityId: (id) => {
		if (canStore$1()) window.localStorage.setItem(CITY_KEY, id);
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
		const contact = {
			id: `ct_${Date.now().toString(36)}`,
			name: c.name.trim(),
			phone,
			zone: c.zone.trim(),
			role: c.role.trim() || "Contact"
		};
		const contacts = [contact, ...get().contacts];
		writeJson(CONTACTS_KEY, contacts);
		set({ contacts });
		return contact;
	},
	updateContact: (id, patch) => {
		const contacts = get().contacts.map((c) => c.id === id ? {
			...c,
			...patch
		} : c);
		writeJson(CONTACTS_KEY, contacts);
		set({ contacts });
	},
	removeContact: (id) => {
		const contacts = get().contacts.filter((c) => c.id !== id);
		writeJson(CONTACTS_KEY, contacts);
		set({ contacts });
	},
	pushActivity: (text, kind = "system") => {
		const activity = [{
			id: `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
			at: Date.now(),
			text,
			kind
		}, ...get().activity].slice(0, 60);
		writeJson(ACTIVITY_KEY, activity);
		set({ activity });
	}
}));
function contactsForZone(contacts, zone, cityName) {
	const z = zone.toLowerCase();
	const c = cityName.toLowerCase();
	return contacts.filter((ct) => {
		const cz = ct.zone.toLowerCase();
		return cz === z || cz === c || z.includes(cz) || cz.includes(z) || cz.includes(c);
	});
}
var ADMIN_EMAIL = "admin@nimbus";
var ADMIN_PASSWORD = "SIH2026";
var USERS_KEY = "nimbus.users";
var SESSION_KEY = "nimbus.session";
var SEED_ADMIN = {
	id: "admin",
	name: "Nimbus Admin",
	email: ADMIN_EMAIL,
	phone: "18001800",
	password: ADMIN_PASSWORD,
	role: "admin"
};
function canStore() {
	return typeof window !== "undefined";
}
function readUsers() {
	if (!canStore()) return [SEED_ADMIN];
	try {
		const raw = window.localStorage.getItem(USERS_KEY);
		if (!raw) return [SEED_ADMIN];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed) || parsed.length === 0) return [SEED_ADMIN];
		if (!parsed.some((u) => u.email === "admin@nimbus")) return [SEED_ADMIN, ...parsed];
		return parsed;
	} catch {
		return [SEED_ADMIN];
	}
}
function writeUsers(users) {
	if (!canStore()) return;
	window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function readSessionId() {
	if (!canStore()) return null;
	return window.localStorage.getItem(SESSION_KEY);
}
function writeSessionId(id) {
	if (!canStore()) return;
	if (id) window.localStorage.setItem(SESSION_KEY, id);
	else window.localStorage.removeItem(SESSION_KEY);
}
function digits(s) {
	return s.replace(/\D/g, "");
}
function normEmail(s) {
	return s.trim().toLowerCase();
}
var useSession = create((set, get) => ({
	ready: false,
	user: null,
	users: [SEED_ADMIN],
	hydrate: () => {
		const users = readUsers();
		writeUsers(users);
		const sid = readSessionId();
		set({
			ready: true,
			users,
			user: users.find((u) => u.id === sid) ?? null
		});
	},
	login: (id, password) => {
		const users = get().users.length ? get().users : readUsers();
		const key = normEmail(id);
		const ph = digits(id);
		const found = users.find((u) => u.email === key || u.email === id.trim() || ph.length >= 8 && digits(u.phone) === ph);
		if (!found || found.password !== password) return {
			ok: false,
			error: "Email/phone or password is incorrect."
		};
		writeSessionId(found.id);
		set({
			user: found,
			users,
			ready: true
		});
		return { ok: true };
	},
	register: ({ name, email, phone, password }) => {
		const users = get().users.length ? get().users : readUsers();
		const em = normEmail(email);
		if (!name.trim() || name.trim().length < 2) return {
			ok: false,
			error: "Enter your name."
		};
		if (!em.includes("@") && digits(phone).length < 10) return {
			ok: false,
			error: "Enter a valid email or a 10-digit phone."
		};
		if (password.length < 6) return {
			ok: false,
			error: "Password must be at least 6 characters."
		};
		if (users.some((u) => u.email === em && em.includes("@"))) return {
			ok: false,
			error: "An account with that email already exists."
		};
		if (em === "admin@nimbus") return {
			ok: false,
			error: "That identifier is reserved."
		};
		const user = {
			id: `u_${Date.now().toString(36)}`,
			name: name.trim(),
			email: em.includes("@") ? em : `${digits(phone)}@nimbus.local`,
			phone: phone.trim(),
			password,
			role: "citizen"
		};
		const next = [...users, user];
		writeUsers(next);
		writeSessionId(user.id);
		set({
			users: next,
			user,
			ready: true
		});
		return { ok: true };
	},
	logout: () => {
		writeSessionId(null);
		set({ user: null });
	}
}));
var STATE_SHORT = {
	"Andhra Pradesh": "AP",
	Maharashtra: "MH",
	"Tamil Nadu": "TN",
	Assam: "AS"
};
function stateShort(state) {
	return STATE_SHORT[state] ?? state;
}
var LINKS = [
	{
		to: "/",
		label: "Overview"
	},
	{
		to: "/map",
		label: "Live Map"
	},
	{
		to: "/citizen",
		label: "Citizen Alert"
	},
	{
		to: "/console",
		label: "Command Center"
	}
];
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const city = getCity(useOps((s) => s.cityId));
	const user = useSession((s) => s.user);
	const ready = useSession((s) => s.ready);
	const logout = useSession((s) => s.logout);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/95",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-wide items-center justify-between gap-3 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-w-0 items-center gap-2.5",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-md bg-surface shadow-[0_0_0_1px_var(--color-border)]",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-[5px] rounded-full shadow-[0_0_0_1px_var(--color-accent)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-1/2 h-[9px] w-[9px] origin-bottom-left -translate-x-px -translate-y-px rounded-tr-full bg-accent/90" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative size-1.5 rounded-full bg-fg" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-[15px] font-semibold leading-none tracking-tight",
							children: "Nimbus"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 hidden font-mono text-[10px] uppercase tracking-kicker text-subtle sm:block",
							children: "AI Nowcasting · Team CloudNine"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-5 lg:flex",
					"aria-label": "Primary",
					children: [LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: cn("text-sm transition-colors duration-150", pathname === l.to ? "text-fg" : "text-muted hover:text-fg"),
						children: l.label
					}, l.to)), user?.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: cn("text-sm transition-colors duration-150", pathname === "/admin" ? "text-fg" : "text-muted hover:text-fg"),
						children: "Alert Management"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-2 rounded-full bg-surface px-2.5 py-1 shadow-[0_0_0_1px_var(--color-border)] sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-kicker text-muted",
								children: [
									"Live · ",
									city.name,
									", ",
									stateShort(city.state)
								]
							})]
						}),
						ready && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "ghost",
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: user.role === "admin" ? "/admin" : "/citizen",
								children: user.name.split(" ")[0]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => logout(),
							children: "Log out"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: pathname === "/login" ? "default" : "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								search: { next: "/" },
								children: "Login"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-md text-fg lg:hidden",
							"aria-label": open ? "Close menu" : "Open menu",
							"aria-expanded": open,
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("border-t border-border bg-bg lg:hidden", open ? "block" : "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-wide flex-col px-4 py-2",
				"aria-label": "Mobile",
				children: [
					LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "rounded-md px-3 py-3 text-sm text-fg",
						onClick: () => setOpen(false),
						children: l.label
					}, l.to)),
					user?.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "rounded-md px-3 py-3 text-sm text-fg",
						onClick: () => setOpen(false),
						children: "Alert Management"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: { next: "/" },
						className: "rounded-md px-3 py-3 text-sm text-fg",
						onClick: () => setOpen(false),
						children: user ? "Account" : "Login"
					})
				]
			})
		})]
	});
}
function AppShell({ children, bleed = false, footer = true }) {
	const hydrateSession = useSession((s) => s.hydrate);
	const hydrateOps = useOps((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrateSession();
		hydrateOps();
	}, [hydrateOps, hydrateSession]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: cn(bleed ? "relative" : void 0),
				children
			}),
			footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}) : null
		]
	});
}
//#endregion
export { useSession as A, getFrames as C, riskLevel as D, peopleNotified as E, sampleDbz as O, getCity as S, latLngToCell as T, computeAlerts as _, CITIES as a, formatDbz as b, MODELS as c, TEAM as d, actionForAlert as f, cn as g, clockLabel as h, Button as i, useOps as k, PIPELINE as l, cityGrid as m, ADMIN_PASSWORD as n, COMPARE as o, cellToLatLng as p, AppShell as r, IMPACT as s, ADMIN_EMAIL as t, STACK as u, contactsForZone as v, getVulnerability as w, formatEta as x, dbzToRgba as y };
