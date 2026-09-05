import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CITIES, b as formatDbz, f as actionForAlert, g as cn, i as Button, k as useOps, r as AppShell, x as formatEta } from "./app-shell-giFZj0HH.mjs";
import { t as RadarNowcast } from "./radar-nowcast-BPM1t_fY.mjs";
import { n as useNowcast, t as Badge } from "./use-nowcast-Bybk_IiO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/citizen-Cx1EhCbd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CitizenPage() {
	const setOpsCity = useOps((s) => s.setCityId);
	const n = useNowcast("vijayawada", "dgmr");
	const [userCell, setUserCell] = (0, import_react.useState)(n.city.userStart);
	const [demoOn, setDemoOn] = (0, import_react.useState)(false);
	const hit = n.activeAlerts.find((a) => a.x === userCell.x && a.y === userCell.y);
	const nearest = (0, import_react.useMemo)(() => {
		if (hit) return hit;
		if (n.activeAlerts.length === 0) return null;
		return [...n.activeAlerts].sort((a, b) => Math.hypot(a.x - userCell.x, a.y - userCell.y) - Math.hypot(b.x - userCell.x, b.y - userCell.y))[0];
	}, [
		hit,
		n.activeAlerts,
		userCell
	]);
	const triggerDemo = () => {
		const target = n.alerts.find((a) => a.x === n.city.userStart.x && a.y === n.city.userStart.y) ?? n.alerts[0];
		if (!target) {
			setDemoOn(true);
			return;
		}
		setUserCell({
			x: target.x,
			y: target.y
		});
		n.setPlaying(false);
		n.setTimeMin(Math.min(120, target.t + 4));
		setDemoOn(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-wide gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_22rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Citizen alert"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight",
				children: "Only if you are in the cell."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: "Place yourself on the 1 km micro-grid. Nimbus stays silent unless the predicted core intersects your GPS ping — then the directive is a sentence, not a synoptic chart."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					{
						t: "Precision targeting",
						d: "Alerts fire only if your GPS sits inside a predicted 1 km danger cell."
					},
					{
						t: "Plain-language directive",
						d: "“Seek higher ground.” Not a dBZ lecture."
					},
					{
						t: "No alert fatigue",
						d: "The rest of the city is not woken for a core two kilometres away."
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: b.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: b.d
					})]
				}, b.t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center gap-2",
				children: [CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: n.cityId === c.id ? "default" : "outline",
					onClick: () => {
						n.setCityId(c.id);
						setOpsCity(c.id);
						setUserCell(c.userStart);
						setDemoOn(false);
					},
					children: c.name
				}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: triggerDemo,
					children: "Trigger demo alert"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl bg-bg-elevated p-3 shadow-[0_0_0_1px_var(--color-border)] sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarNowcast, {
					city: n.city,
					model: n.model,
					timeMin: n.timeMin,
					frames: n.frames,
					selected: userCell,
					onSelect: (c) => {
						if (c) setUserCell(c);
					},
					alerts: n.alerts,
					userCell,
					variant: "panel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						className: "timeline-range h-11 min-w-0 flex-1",
						min: 0,
						max: 120,
						value: Math.round(n.timeMin),
						onChange: (e) => {
							n.setPlaying(false);
							n.setTimeMin(Number(e.target.value));
						},
						"aria-label": "Forecast minute"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-sm tabular-nums text-accent",
						children: [
							"T+",
							Math.round(n.timeMin),
							"m"
						]
					})]
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lg:pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "phone-bezel mx-auto w-full max-w-sm rounded-[1.8rem] p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-3 h-5 w-24 rounded-full bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-[1.25rem] bg-bg p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display font-semibold",
								children: "Nimbus"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: hit ? "danger" : "ok",
								children: hit ? "Alert" : "All clear"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-subtle",
							children: [
								n.city.name,
								" · cell ",
								userCell.x,
								",",
								userCell.y
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("mt-4 rounded-lg p-4 transition-opacity duration-200", hit || demoOn ? "alert-pulse bg-danger/10" : "bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-fg",
								children: hit ? actionForAlert(hit) : "No geofence match. You are outside predicted danger cells."
							}), hit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [
									formatDbz(hit.dbz),
									" core · ",
									hit.landmark ?? n.city.basin,
									" · ETA",
									" ",
									formatEta(Math.max(0, hit.t))
								]
							}) : nearest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [
									"Nearest hot cell is",
									" ",
									Math.round(Math.hypot(nearest.x - userCell.x, nearest.y - userCell.y)),
									" km away."
								]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-lg bg-surface p-3 shadow-[0_0_0_1px_var(--color-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs uppercase tracking-kicker text-subtle",
								children: "Simulated SMS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-fg",
								children: hit ? `NIMBUS ALERT: Heavy rain (${formatDbz(hit.dbz)}) entering your 1km zone. ${actionForAlert(hit)} — SDMA ${n.city.state}` : `NIMBUS: No local nowcast alert for your cell in ${n.city.name}. Stay aware.`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-4 w-full",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/console",
								children: "Authority view of this zone"
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-sm text-center text-xs text-subtle",
				children: "Precision targeting: the rest of the city is not woken for a core two kilometres away."
			})]
		})]
	}) });
}
//#endregion
export { CitizenPage as component };
