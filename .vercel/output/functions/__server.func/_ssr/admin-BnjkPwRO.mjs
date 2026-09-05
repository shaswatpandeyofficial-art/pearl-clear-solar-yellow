import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useSession, a as CITIES, i as Button, k as useOps, r as AppShell } from "./app-shell-giFZj0HH.mjs";
import { n as Label, t as Input } from "./label-1YDkY0nw.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BnjkPwRO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const navigate = useNavigate();
	const ready = useSession((s) => s.ready);
	const user = useSession((s) => s.user);
	const hydrate = useSession((s) => s.hydrate);
	const hydrateOps = useOps((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
		hydrateOps();
	}, [hydrate, hydrateOps]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		if (!user || user.role !== "admin") navigate({
			to: "/login",
			search: { next: "/admin" }
		});
	}, [
		navigate,
		ready,
		user
	]);
	if (!ready || !user || user.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 py-16 text-center text-sm text-muted",
		children: "Checking credentials…"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-wide px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Alert management"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight",
				children: "Emergency contacts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Add duty phones for 1 km zones. “Send test SMS” mocks Twilio/Msg91 — a toast and a command-center log entry, plus a console line judges can inspect."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thresholds, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactTable, {})]
			})
		]
	}) });
}
function ContactForm() {
	const addContact = useOps((s) => s.addContact);
	const pushActivity = useOps((s) => s.pushActivity);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		zone: CITIES[0].name,
		role: "SDMA"
	});
	const [error, setError] = (0, import_react.useState)(null);
	const onSubmit = (e) => {
		e.preventDefault();
		const res = addContact(form);
		if ("error" in res) {
			setError(res.error);
			return;
		}
		setError(null);
		setForm((f) => ({
			...f,
			name: "",
			phone: ""
		}));
		pushActivity(`Contact added · ${res.name} · ${res.zone}`, "system");
		toast(`Saved ${res.name}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-3 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-base font-semibold",
				children: "Add contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				htmlFor: "c-name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "c-name",
					value: form.name,
					onChange: (e) => setForm({
						...form,
						name: e.target.value
					}),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Phone",
				htmlFor: "c-phone",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "c-phone",
					type: "tel",
					value: form.phone,
					onChange: (e) => setForm({
						...form,
						phone: e.target.value
					}),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Zone",
				htmlFor: "c-zone",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "c-zone",
					value: form.zone,
					onChange: (e) => setForm({
						...form,
						zone: e.target.value
					}),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Role",
				htmlFor: "c-role",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "c-role",
					value: form.role,
					onChange: (e) => setForm({
						...form,
						role: e.target.value
					})
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				children: "Save contact"
			})
		]
	});
}
function Thresholds() {
	const threshold = useOps((s) => s.threshold);
	const vulnMin = useOps((s) => s.vulnMin);
	const setThreshold = useOps((s) => s.setThreshold);
	const setVulnMin = useOps((s) => s.setVulnMin);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-base font-semibold",
				children: "Severity thresholds"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Applied on the live map and command center."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-xs text-muted",
				children: [
					"Reflectivity ≥ ",
					threshold,
					" dBZ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 30,
						max: 60,
						value: threshold,
						onChange: (e) => setThreshold(Number(e.target.value)),
						className: "timeline-range mt-2 h-11 w-full"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block text-xs text-muted",
				children: [
					"Vulnerability ≥ ",
					vulnMin.toFixed(2),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 80,
						value: Math.round(vulnMin * 100),
						onChange: (e) => setVulnMin(Number(e.target.value) / 100),
						className: "timeline-range mt-2 h-11 w-full"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				className: "mt-4 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/map",
					children: "Inspect on live map"
				})
			})
		]
	});
}
function ContactTable() {
	const contacts = useOps((s) => s.contacts);
	const removeContact = useOps((s) => s.removeContact);
	const pushActivity = useOps((s) => s.pushActivity);
	const send = (c) => {
		console.info("[Nimbus SMS mock]", {
			to: c.phone,
			zone: c.zone,
			body: `NIMBUS TEST: Duty desk check for ${c.zone}. This is a prototype dispatch.`
		});
		pushActivity(`Test SMS · ${c.name} · ${c.phone} · ${c.zone}`, "sms");
		toast(`Test SMS queued to ${c.phone}`, { description: `${c.name} · ${c.zone}` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-x-auto rounded-xl bg-surface shadow-[0_0_0_1px_var(--color-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-base font-semibold",
				children: "Directory"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[40rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-y border-border text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-medium",
						children: "Name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-medium",
						children: "Phone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-medium",
						children: "Zone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-medium",
						children: "Role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-medium",
						children: " "
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 text-fg",
						children: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 font-mono tabular-nums",
						children: c.phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: c.zone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 text-muted",
						children: c.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => send(c),
								children: "Send test SMS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "ghost",
								onClick: () => removeContact(c.id),
								children: "Remove"
							})]
						})
					})
				]
			}, c.id)), contacts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 5,
				className: "px-4 py-8 text-center text-muted",
				children: "No contacts yet."
			}) }) : null] })]
		})]
	});
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
//#endregion
export { AdminPage as component };
