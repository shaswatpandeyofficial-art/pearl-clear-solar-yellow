import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Layers, f as Earth, h as ArrowRight, i as Satellite, l as Mountain, m as Cpu, o as Radio, p as Database, r as Siren } from "../_libs/lucide-react.mjs";
import { d as TEAM, g as cn, i as Button, l as PIPELINE, o as COMPARE, r as AppShell, s as IMPACT, u as STACK } from "./app-shell-giFZj0HH.mjs";
import { t as RadarNowcast } from "./radar-nowcast-BPM1t_fY.mjs";
import { n as useNowcast, t as Badge } from "./use-nowcast-Bybk_IiO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CMVKPNZ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CountUp({ value, suffix = "", prefix = "", decimals = 0 }) {
	const [n, setN] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(0);
	const started = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => {
			if (!e?.isIntersecting || started.current) return;
			started.current = true;
			const t0 = performance.now();
			const dur = 900;
			const tick = (t) => {
				const p = Math.min(1, (t - t0) / dur);
				const eased = 1 - (1 - p) ** 3;
				setN(value * eased);
				if (p < 1) rafRef.current = requestAnimationFrame(tick);
			};
			rafRef.current = requestAnimationFrame(tick);
		}, { threshold: .4 });
		io.observe(el);
		return () => {
			io.disconnect();
			cancelAnimationFrame(rafRef.current);
		};
	}, [value]);
	const shown = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-IN");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: "tabular-nums",
		children: [
			prefix,
			shown,
			suffix
		]
	});
}
function Reveal({ children, className, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => {
			if (e?.isIntersecting) setOn(true);
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("reveal", on && "reveal-in", className),
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
var PIPE_ICONS = [
	Satellite,
	Radio,
	Mountain,
	Siren
];
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipeline, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Differentiator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Impact, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Architecture, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Team, {})
	] });
}
function Hero() {
	const nowcast = useNowcast("vijayawada", "dgmr");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-wide items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-enter",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Team CloudNine · SRM University AP · SIH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 font-display text-hero font-semibold tracking-display text-fg",
						children: ["Street-level warnings.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-accent",
							children: "Not state-level noise."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base text-muted sm:text-lg",
						children: "Nimbus treats radar as a video-prediction problem. A ConvLSTM nowcast writes the next 120 minutes onto a 1 km × 1 km micro-grid and fires geofenced alerts in under three seconds — only to the cells that will actually flood."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/map",
								children: ["Open live map", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/citizen",
								children: "Citizen alert demo"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-10 grid grid-cols-3 gap-4",
						children: [
							["< 3 s", "Predict + alert"],
							["1 km²", "Micro-grid"],
							["120 min", "Nowcast"]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-display text-xl font-semibold text-fg sm:text-2xl",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-xs text-muted",
								children: v
							})]
						}, v))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-xl bg-bg-elevated p-3 shadow-[0_0_0_1px_var(--color-border)] sm:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-mono text-xs uppercase tracking-kicker text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot" }), "Live nowcast · Vijayawada"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "DGMR" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarNowcast, {
						city: nowcast.city,
						model: nowcast.model,
						timeMin: nowcast.timeMin,
						frames: nowcast.frames,
						selected: null,
						variant: "panel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 px-1 font-mono text-xs text-subtle",
						children: [
							"Predicted reflectivity · 1 km cells · T+",
							Math.round(nowcast.timeMin),
							" min"
						]
					})
				]
			})]
		})
	});
}
function Pipeline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "solution",
		className: "scroll-mt-20 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-page px-4 py-20 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Pipeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-display font-semibold",
					children: "Ingest. Predict. Overlay. Alert."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-muted",
					children: "Four steps, each measured in seconds. Unlike broad polygon warnings, Nimbus uses a micro-grid so the public is not trained to ignore the siren."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: PIPELINE.map((p, i) => {
					const Icon = PIPE_ICONS[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "h-full rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-accent",
										children: p.step
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-xl font-semibold",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: p.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-mono text-xs text-subtle",
									children: p.meta
								})
							]
						})
					}, p.step);
				})
			})]
		})
	});
}
function Differentiator() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "scroll-mt-20 border-b border-border bg-bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-page px-4 py-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Key differentiator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-display font-semibold",
						children: "One kilometre. Not one district."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-muted",
						children: "Mass polygon alerts blanket entire cities and teach people to ignore them. Nimbus notifies only the 1 km cells that the nowcast says will breach a local vulnerability limit."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-bg p-5 shadow-[0_0_0_1px_var(--color-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted",
								children: "Traditional NWP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-lg font-semibold",
								children: "District polygon"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid h-36 grid-cols-8 grid-rows-6 overflow-hidden rounded-lg bg-surface-2",
								children: Array.from({ length: 48 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-danger/25" }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "2–4 hours to compute. The whole city is woken. Alert fatigue follows."
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl bg-bg p-5 shadow-[0_0_0_1px_var(--color-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium text-accent",
									children: "Project Nimbus"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-lg font-semibold",
									children: "1 km × 1 km micro-grid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid h-36 grid-cols-8 grid-rows-6 overflow-hidden rounded-lg bg-surface-2",
									children: Array.from({ length: 48 }, (_, i) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: i === 21 || i === 22 || i === 29 ? "bg-danger/80" : "bg-transparent" }, i);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted",
									children: "Under 3 seconds. Geofenced SMS only if a GPS ping sits inside a predicted danger cell."
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-10 overflow-x-auto",
					delay: 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-table text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-4 font-medium",
									children: "Feature"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-4 font-medium",
									children: "Traditional NWP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 font-medium text-accent",
									children: "Project Nimbus"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: COMPARE.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 text-fg",
									children: row.feature
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 text-muted",
									children: row.nwp
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 text-fg",
									children: row.us
								})
							]
						}, row.feature)) })]
					})
				})
			]
		})
	});
}
function Impact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "impact",
		className: "scroll-mt-20 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-page px-4 py-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Impact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-display font-semibold",
					children: "Minutes and kilometres, not slogans."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: IMPACT.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 50,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "h-full rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl font-semibold tabular-nums text-accent",
								children: s.k === "2.5 Cr" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
									value: 2.5,
									decimals: 1
								}), " Cr"] }) : s.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.l
							})]
						})
					}, s.k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-3 md:grid-cols-3",
					children: [
						{
							t: "State Disaster Management",
							d: "A command picture of which cell-zones have been notified — and which still sit in the path."
						},
						{
							t: "Agriculture",
							d: "Exact rainfall windows to cover harvested crop, not a district bulletin."
						},
						{
							t: "The public",
							d: "Skip the flooded underpass. The rest of the city is not woken for a core two kilometres away."
						}
					].map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 60,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "h-full rounded-xl bg-bg-elevated p-5 shadow-[0_0_0_1px_var(--color-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold",
								children: w.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: w.d
							})]
						})
					}, w.t))
				})
			]
		})
	});
}
function Architecture() {
	const groups = [
		{
			title: "AI / training",
			icon: Cpu,
			items: STACK.ai
		},
		{
			title: "Backend",
			icon: Database,
			items: STACK.backend
		},
		{
			title: "Frontend",
			icon: Layers,
			items: STACK.frontend
		},
		{
			title: "Cloud",
			icon: Earth,
			items: STACK.cloud
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "architecture",
		className: "scroll-mt-20 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-page px-4 py-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Architecture"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-display font-semibold",
					children: "Seconds. Not hours."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-3 sm:grid-cols-2",
					children: groups.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 60,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(g.icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold text-fg",
									children: g.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-1.5 text-sm text-muted",
								children: g.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: it }, it))
							})]
						})
					}, g.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-bg-elevated p-5 shadow-[0_0_0_1px_var(--color-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold",
							children: "Data flow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "Input."
								}), " Live feeds from the IMD Open Data Portal and INSAT-3D APIs."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "Processing."
								}), " Volumes are normalised; the model emits predicted reflectivity frames (dBZ)."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "Threshold engine."
								}), " Predicted rain/wind is tested against local vulnerability."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "Output."
								}), " Twilio / Msg91 dispatch targeted SMS to the affected cell."] })
							]
						})]
					})
				})
			]
		})
	});
}
function Team() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "team",
		className: "scroll-mt-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-page px-4 py-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Team CloudNine"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-display font-semibold",
						children: "SRM University AP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "Six builders. One nowcast. Mentored from CSE AIML at SRM-AP."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: TEAM.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 40,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-semibold",
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-subtle",
										children: m.track
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-accent",
									children: m.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: m.focus
								})
							]
						})
					}, m.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-12",
					delay: 80,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Key references"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "IMD Open Data Portal — radar and satellite feeds." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ravuri et al., “Skilful precipitation nowcasting using deep generative models of radar” (Nature, DeepMind)." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "INSAT-3D / 3DR radiance products for convective initiation cues." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/map",
									children: ["Launch the live map", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							})
						})
					]
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {}) });
}
//#endregion
export { Home as component };
