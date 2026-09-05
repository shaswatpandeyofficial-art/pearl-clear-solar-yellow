import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, c as Pause, s as Play } from "../_libs/lucide-react.mjs";
import { E as peopleNotified, O as sampleDbz, T as latLngToCell, a as CITIES, b as formatDbz, f as actionForAlert, g as cn, i as Button, k as useOps, m as cityGrid, p as cellToLatLng, r as AppShell, v as contactsForZone, w as getVulnerability, x as formatEta, y as dbzToRgba } from "./app-shell-giFZj0HH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as RadarNowcast } from "./radar-nowcast-BPM1t_fY.mjs";
import { n as useNowcast, t as Badge } from "./use-nowcast-Bybk_IiO.mjs";
import { t as RiskBadge } from "./risk-badge-BTh2oE9x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-CH595XoD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LAYER_ITEMS = [
	{
		key: "grid",
		label: "Micro-grid"
	},
	{
		key: "reflectivity",
		label: "Predicted reflectivity"
	},
	{
		key: "predicted",
		label: "Hot cells"
	},
	{
		key: "vulnerability",
		label: "Flood vulnerability"
	},
	{
		key: "wind",
		label: "Wind",
		disabled: true
	},
	{
		key: "temp",
		label: "Temperature",
		disabled: true
	}
];
function LiveMap(props) {
	const [layers, setLayers] = (0, import_react.useState)({
		grid: true,
		reflectivity: true,
		predicted: true,
		vulnerability: false
	});
	const [tileOk, setTileOk] = (0, import_react.useState)(true);
	const [mapFailed, setMapFailed] = (0, import_react.useState)(false);
	const onSelect = (cell) => props.onSelect(cell);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[48vh] min-h-[280px] lg:h-[calc(100dvh-4rem)]",
			children: [
				mapFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center bg-bg-elevated p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-center text-xs text-muted",
							children: "Basemap unavailable. Showing 1 km micro-grid only."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarNowcast, {
							city: props.city,
							model: "dgmr",
							timeMin: props.timeMin,
							frames: props.frames,
							selected: props.selected,
							onSelect,
							alerts: props.alerts,
							showVuln: layers.vulnerability,
							variant: "panel"
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeafletStage, {
					city: props.city,
					timeMin: props.timeMin,
					frames: props.frames,
					selected: props.selected,
					onSelect,
					activeAlerts: props.activeAlerts,
					layers,
					onTileOk: setTileOk,
					onFailed: () => setMapFailed(true)
				}),
				!tileOk && !mapFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute left-1/2 top-3 z-[500] -translate-x-1/2 rounded-md bg-surface px-3 py-1.5 text-xs text-muted shadow-[0_0_0_1px_var(--color-border)]",
					children: "Some tiles failed to load. Micro-grid overlay is still live."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute inset-0 z-[500] hidden lg:block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-auto absolute top-3 left-3 w-56",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlCard, {
								cityId: props.cityId,
								onCityId: props.onCityId,
								layers,
								onLayers: setLayers
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-auto absolute top-3 right-3 w-80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZonesCard, { ...props })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-auto absolute right-3 bottom-20 left-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineBar, { ...props })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-3 lg:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineBar, { ...props }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlCard, {
					cityId: props.cityId,
					onCityId: props.onCityId,
					layers,
					onLayers: setLayers
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZonesCard, { ...props })
			]
		})]
	});
}
function ControlCard({ cityId, onCityId, layers, onLayers }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-surface/95 p-3 shadow-[0_0_0_1px_var(--color-border)] backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Volume"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-col gap-0.5",
				children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onCityId(c.id),
					className: cn("rounded-md px-2.5 py-2 text-left text-sm", cityId === c.id ? "bg-accent text-accent-fg" : "text-fg hover:bg-surface-2"),
					children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-0.5 block text-[11px]", cityId === c.id ? "text-accent-fg/80" : "text-subtle"),
						children: c.basin
					})]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mt-4",
				children: "Layers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1",
				children: LAYER_ITEMS.map((item) => {
					const on = !item.disabled && item.key in layers ? layers[item.key] : false;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("flex h-9 items-center gap-2 rounded-md px-1 text-sm", item.disabled ? "cursor-not-allowed text-subtle" : "text-fg"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "size-4 accent-accent",
								disabled: item.disabled,
								checked: on,
								onChange: () => {
									if (item.disabled) return;
									const k = item.key;
									onLayers({
										...layers,
										[k]: !layers[k]
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
							item.disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto font-mono text-[10px] text-subtle",
								children: "soon"
							}) : null
						]
					}) }, item.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {})
		]
	});
}
function Legend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 border-t border-border pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: "Severity"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex flex-wrap gap-2",
			children: [
				{
					l: "Low",
					c: "bg-ok"
				},
				{
					l: "Moderate",
					c: "bg-moderate"
				},
				{
					l: "High",
					c: "bg-warn"
				},
				{
					l: "Severe",
					c: "bg-danger"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1.5 text-[11px] text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", s.c) }), s.l]
			}, s.l))
		})]
	});
}
function ZonesCard(props) {
	const contacts = useOps((s) => s.contacts);
	const pushActivity = useOps((s) => s.pushActivity);
	const notified = peopleNotified(props.city, props.activeAlerts);
	const selectedDbz = props.selected != null ? sampleDbz(props.frames, props.timeMin, props.selected.x, props.selected.y) : null;
	const vuln = (0, import_react.useMemo)(() => getVulnerability(props.city), [props.city]);
	const selectedVuln = props.selected != null ? vuln[props.selected.y * 32 + props.selected.x] ?? 0 : 0;
	const notify = (alert) => {
		const zone = alert.landmark ?? props.city.name;
		const hits = contactsForZone(contacts, zone, props.city.name);
		const n = Math.max(1, hits.length);
		pushActivity(`SMS queued · ${zone} · ${formatDbz(alert.dbz)} · ${n} contact${n === 1 ? "" : "s"}`, "sms");
		const sample = hits[0]?.phone ?? "geofence-cell";
		console.info("[Nimbus SMS mock]", {
			to: hits.map((h) => h.phone),
			zone,
			body: `NIMBUS ALERT: ${actionForAlert(alert)}`
		});
		toast(`Queued ${n} SMS for ${zone}`, { description: `Mock dispatch · ${sample}` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex max-h-[min(70vh,36rem)] flex-col rounded-xl bg-surface/95 p-3 shadow-[0_0_0_1px_var(--color-border)] backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Active zones"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: [props.activeAlerts.length, " cells"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					notified.toLocaleString("en-IN"),
					" residents in predicted 1 km cells at T+",
					Math.round(props.timeMin),
					"m"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 min-h-0 flex-1 space-y-2 overflow-auto pr-1",
				children: [props.activeAlerts.slice(0, 10).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => props.onSelect({
						x: a.x,
						y: a.y
					}),
					className: cn("w-full rounded-lg p-2.5 text-left shadow-[0_0_0_1px_var(--color-border)]", props.selected?.x === a.x && props.selected?.y === a.y ? "bg-surface-2" : "bg-bg-elevated hover:bg-surface-2"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-fg",
							children: a.landmark ?? `Cell ${a.x},${a.y}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 font-mono text-[11px] text-subtle",
							children: [
								a.x,
								",",
								a.y,
								" · ETA ",
								formatEta(Math.max(0, a.t))
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
							dbz: a.dbz,
							vuln: a.vuln
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-[11px] text-accent",
						children: formatDbz(a.dbz)
					})]
				}) }, `${a.x}-${a.y}`)), props.activeAlerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "No breaches yet. Advance the horizon."
				}) : null]
			}),
			props.selected && selectedDbz != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 border-t border-border pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"Cell ",
						props.selected.x,
						",",
						props.selected.y,
						" · ",
						formatDbz(selectedDbz),
						" · vuln",
						" ",
						Math.round(selectedVuln * 100),
						"%"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					className: "mt-2 w-full",
					onClick: () => {
						const existing = props.activeAlerts.find((a) => a.x === props.selected.x && a.y === props.selected.y);
						notify(existing ?? {
							x: props.selected.x,
							y: props.selected.y,
							t: props.timeMin,
							dbz: selectedDbz,
							vuln: selectedVuln,
							landmark: null
						});
					},
					children: "Notify zone"
				})]
			}) : null
		]
	});
}
function TimelineBar(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "rounded-xl bg-surface/95 px-3 py-3 shadow-[0_0_0_1px_var(--color-border)] backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon",
					variant: "secondary",
					"aria-label": props.playing ? "Pause" : "Play",
					onClick: () => props.onPlaying((p) => !p),
					children: props.playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon",
					variant: "ghost",
					"aria-label": "Reset timeline",
					onClick: () => {
						props.onTimeMin(0);
						props.onPlaying(true);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						className: "timeline-range h-11 w-full",
						min: 0,
						max: 120,
						value: Math.round(props.timeMin),
						onChange: (e) => {
							props.onPlaying(false);
							props.onTimeMin(Number(e.target.value));
						},
						"aria-label": "Forecast lead time"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex justify-between font-mono text-[10px] text-subtle",
						children: [
							0,
							30,
							60,
							90,
							120
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["T+", t] }, t))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "w-16 text-right font-mono text-sm tabular-nums text-accent",
					children: [
						"T+",
						Math.round(props.timeMin),
						"m"
					]
				})
			]
		})
	});
}
function LeafletStage({ city, timeMin, frames, selected, onSelect, activeAlerts, layers, onTileOk, onFailed }) {
	const hostRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const cityRef = (0, import_react.useRef)(city);
	const selectRef = (0, import_react.useRef)(onSelect);
	const paintRef = (0, import_react.useRef)(() => {});
	const setPosRef = (0, import_react.useRef)(() => {});
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
	(0, import_react.useEffect)(() => {
		if (!hostRef.current) return;
		let destroyed = false;
		let map = null;
		let canvas = null;
		(async () => {
			try {
				const mod = await import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
				const L = mod.default ?? mod;
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
					preferCanvas: true
				});
				L.control.zoom({ position: "bottomright" }).addTo(map);
				map.fitBounds(bounds, {
					padding: [28, 28],
					maxZoom: 12
				});
				let errors = 0;
				const tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
					attribution: "&copy; OSM &copy; CARTO",
					subdomains: "abcd",
					maxZoom: 19
				});
				tiles.on("tileerror", () => {
					errors += 1;
					if (errors >= 8) onTileOk(false);
				});
				tiles.addTo(map);
				canvas = L.DomUtil.create("canvas", "nimbus-radar-canvas");
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
							iconSize: [0, 0]
						}),
						interactive: false
					}).addTo(labels);
				}
				labels.addTo(map);
				const sync = () => paintRef.current();
				map.on("move zoom viewreset", sync);
				map.on("click", (e) => {
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
	}, [city.id]);
	(0, import_react.useEffect)(() => {
		paintRef.current();
	}, [
		timeMin,
		frames,
		layers,
		selected,
		activeAlerts,
		city.id
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: hostRef,
		className: "absolute inset-0",
		role: "application",
		"aria-label": `${city.name} nowcast map`
	});
}
function paintGrid(canvas, city, frames, timeMin, layers, active, selected) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const w = canvas.width;
	const h = canvas.height;
	ctx.clearRect(0, 0, w, h);
	const cw = w / 32;
	const ch = h / 32;
	const vuln = layers.vulnerability ? getVulnerability(city) : null;
	const hot = new Set(active.map((a) => `${a.x},${a.y}`));
	for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
		const dbz = sampleDbz(frames, timeMin, x, y);
		const px = x * cw;
		const py = y * ch;
		if (layers.reflectivity && dbz > 12) {
			const [r, g, b, a] = dbzToRgba(dbz);
			ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a / 255})`;
			ctx.fillRect(px, py, cw + .6, ch + .6);
		} else if (layers.predicted && hot.has(`${x},${y}`)) {
			const [r, g, b] = dbzToRgba(Math.max(dbz, 42));
			ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},0.4)`;
			ctx.fillRect(px, py, cw + .6, ch + .6);
		}
		if (vuln) {
			const v = vuln[y * 32 + x] ?? 0;
			if (v > .45) {
				ctx.fillStyle = `rgba(196,138,58,${v * .2})`;
				ctx.fillRect(px, py, cw + .6, ch + .6);
			}
		}
	}
	if (layers.grid) {
		ctx.strokeStyle = "rgba(232,238,244,0.14)";
		ctx.lineWidth = Math.max(1, cw * .03);
		for (let i = 0; i <= 32; i++) {
			ctx.globalAlpha = i % 4 === 0 ? 1 : .45;
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
		ctx.lineWidth = Math.max(1.4, cw * .07);
		for (const a of active) ctx.strokeRect(a.x * cw + 1, a.y * ch + 1, cw - 2, ch - 2);
	}
	if (selected) {
		ctx.strokeStyle = "rgba(232,238,244,0.95)";
		ctx.lineWidth = Math.max(2, cw * .1);
		ctx.strokeRect(selected.x * cw + 2, selected.y * ch + 2, cw - 4, ch - 4);
	}
}
function MapPage() {
	const opsCity = useOps((s) => s.cityId);
	const setOpsCity = useOps((s) => s.setCityId);
	const threshold = useOps((s) => s.threshold);
	const vulnMin = useOps((s) => s.vulnMin);
	const n = useNowcast(opsCity, "dgmr");
	(0, import_react.useEffect)(() => {
		n.setThreshold(threshold);
		n.setVulnMin(vulnMin);
	}, [threshold, vulnMin]);
	(0, import_react.useEffect)(() => {
		if (n.cityId !== opsCity) n.setCityId(opsCity);
	}, [opsCity]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		bleed: true,
		footer: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveMap, {
			city: n.city,
			timeMin: n.timeMin,
			frames: n.frames,
			selected: n.selected,
			onSelect: n.setSelected,
			alerts: n.alerts,
			activeAlerts: n.activeAlerts,
			playing: n.playing,
			onPlaying: n.setPlaying,
			onTimeMin: n.setTimeMin,
			cityId: n.cityId,
			onCityId: (id) => {
				n.setCityId(id);
				setOpsCity(id);
			},
			threshold: n.threshold
		})
	});
}
//#endregion
export { MapPage as component };
