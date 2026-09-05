import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as peopleNotified, b as formatDbz, c as MODELS, f as actionForAlert, g as cn, h as clockLabel, i as Button, k as useOps, r as AppShell, x as formatEta } from "./app-shell-giFZj0HH.mjs";
import { n as useNowcast, t as Badge } from "./use-nowcast-Bybk_IiO.mjs";
import { t as RiskBadge } from "./risk-badge-BTh2oE9x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/console-CgauV9VW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConsolePage() {
	const n = useNowcast("vijayawada", "dgmr");
	const setOpsCity = useOps((s) => s.setCityId);
	const activity = useOps((s) => s.activity);
	const pushActivity = useOps((s) => s.pushActivity);
	const threshold = useOps((s) => s.threshold);
	const vulnMin = useOps((s) => s.vulnMin);
	const seen = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		n.setThreshold(threshold);
		n.setVulnMin(vulnMin);
	}, [threshold, vulnMin]);
	(0, import_react.useEffect)(() => {
		setOpsCity(n.cityId);
	}, [n.cityId, setOpsCity]);
	(0, import_react.useEffect)(() => {
		for (const a of n.activeAlerts) {
			const key = `${n.city.id}:${a.x}:${a.y}`;
			if (seen.current.has(key)) continue;
			if (a.dbz < n.threshold + 2) continue;
			seen.current.add(key);
			pushActivity(`${n.city.name} · ${a.landmark ?? `cell ${a.x},${a.y}`} · ${formatDbz(a.dbz)} · ${actionForAlert(a)}`, "alert");
			break;
		}
	}, [
		n.activeAlerts,
		n.city.id,
		n.city.name,
		n.threshold,
		pushActivity
	]);
	const notified = peopleNotified(n.city, n.activeAlerts);
	const lead = n.activeAlerts[0]?.t ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-wide px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Command center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl font-semibold tracking-tight",
						children: "Authority dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted",
						children: "Who was notified, which 1 km cells are hot, and how fast the dispatch ran. Open the live map to scrub the volume."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/map",
						children: "Open live map"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						k: "Active alerts",
						v: String(n.activeAlerts.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						k: "Zones notified",
						v: String(n.activeAlerts.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						k: "Avg dispatch",
						v: MODELS.find((m) => m.id === n.model)?.latency ?? "< 3 s"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						k: "People reached",
						v: notified.toLocaleString("en-IN")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "Nowcast model"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-lg bg-surface p-1 shadow-[0_0_0_1px_var(--color-border)]",
						children: MODELS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => n.setModel(m.id),
							className: cn("h-10 rounded-md px-3 text-xs sm:text-sm", n.model === m.id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
							children: m.name
						}, m.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: n.city.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-subtle",
						children: ["Lead ", formatEta(lead)]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: MODELS.find((m) => m.id === n.model)?.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-x-auto rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Notified zones"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-subtle",
							children: [
								"T+",
								Math.round(n.timeMin),
								"m"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[36rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-y border-border text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "Zone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "Risk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "dBZ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "Residents"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "ETA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "Status"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [n.activeAlerts.slice(0, 12).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg",
										children: a.landmark ?? `Cell ${a.x},${a.y}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-0.5 block font-mono text-[11px] text-subtle",
										children: [
											a.x,
											",",
											a.y
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
										dbz: a.dbz,
										vuln: a.vuln
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 font-mono tabular-nums",
									children: formatDbz(a.dbz)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 font-mono tabular-nums",
									children: n.city.density.toLocaleString("en-IN")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 font-mono tabular-nums",
									children: formatEta(a.t)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "ok",
										children: "Notified"
									})
								})
							]
						}, `${a.x}-${a.y}`)), n.activeAlerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "px-4 py-8 text-center text-muted",
							children: "No breaches at this lead time. Open the live map and play the horizon."
						}) }) : null] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: "Live activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 max-h-[28rem] space-y-3 overflow-auto pr-1",
						children: activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "Waiting for cell breaches and SMS mocks."
						}) : activity.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-border/70 pb-3 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] uppercase tracking-kicker text-subtle",
								children: [
									clockLabel(item.at),
									" · ",
									item.kind
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-fg",
								children: item.text
							})]
						}, item.id))
					})]
				})]
			})
		]
	}) });
}
function Kpi({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl font-semibold tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { ConsolePage as component };
