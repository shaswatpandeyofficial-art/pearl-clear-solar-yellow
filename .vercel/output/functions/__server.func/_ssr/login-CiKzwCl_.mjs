import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useSession, g as cn, i as Button, k as useOps, n as ADMIN_PASSWORD, r as AppShell, t as ADMIN_EMAIL } from "./app-shell-giFZj0HH.mjs";
import { n as Label, t as Input } from "./label-1YDkY0nw.mjs";
import { n as Route$1 } from "./router-BZhFo6v1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CiKzwCl_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { next } = Route$1.useSearch();
	const navigate = useNavigate();
	const user = useSession((s) => s.user);
	const ready = useSession((s) => s.ready);
	const login = useSession((s) => s.login);
	const register = useSession((s) => s.register);
	const hydrate = useSession((s) => s.hydrate);
	const pushActivity = useOps((s) => s.pushActivity);
	const [mode, setMode] = (0, import_react.useState)("login");
	const [error, setError] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		password: ""
	});
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (ready && user) {
			const dest = user.role === "admin" && next === "/" ? "/admin" : next;
			navigate({ to: dest });
		}
	}, [
		navigate,
		next,
		ready,
		user
	]);
	const onSubmit = (e) => {
		e.preventDefault();
		setError(null);
		if (mode === "login") {
			const res = login(form.email || form.phone, form.password);
			if (!res.ok) {
				setError(res.error);
				return;
			}
			pushActivity("Authority session opened", "auth");
			return;
		}
		const res = register(form);
		if (!res.ok) {
			setError(res.error);
			return;
		}
		pushActivity("Citizen account created", "auth");
	};
	const set = (key) => (e) => setForm((f) => ({
		...f,
		[key]: e.target.value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		footer: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-[calc(100dvh-4rem)] max-w-sm flex-col justify-center px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-center",
					children: "Nimbus access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-center font-display text-3xl font-semibold",
					children: mode === "login" ? "Sign in" : "Create account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm text-muted",
					children: "Prototype session is stored on this device. Authority demo uses elevated credentials."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-6 flex w-full rounded-lg bg-surface p-1 shadow-[0_0_0_1px_var(--color-border)]",
					children: ["login", "register"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode(m);
							setError(null);
						},
						className: cn("h-10 flex-1 rounded-md text-sm capitalize", mode === m ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
						children: m === "login" ? "Login" : "Register"
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-4",
					onSubmit,
					children: [
						mode === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							htmlFor: "name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								autoComplete: "name",
								value: form.name,
								onChange: set("name"),
								required: true
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							htmlFor: "email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "text",
								autoComplete: "username",
								placeholder: mode === "login" ? "email or phone" : "you@example.com",
								value: form.email,
								onChange: set("email"),
								required: true
							})
						}),
						mode === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							htmlFor: "phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "phone",
								type: "tel",
								autoComplete: "tel",
								value: form.phone,
								onChange: set("phone")
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							htmlFor: "password",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								autoComplete: mode === "login" ? "current-password" : "new-password",
								value: form.password,
								onChange: set("password"),
								required: true
							})
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							children: mode === "login" ? "Sign in" : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 rounded-lg bg-surface p-3 text-center text-xs text-muted shadow-[0_0_0_1px_var(--color-border)]",
					children: [
						"Admin demo · ",
						ADMIN_EMAIL,
						" / ",
						ADMIN_PASSWORD
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-fg",
						children: "Back to overview"
					})
				})
			]
		})
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
export { LoginPage as component };
