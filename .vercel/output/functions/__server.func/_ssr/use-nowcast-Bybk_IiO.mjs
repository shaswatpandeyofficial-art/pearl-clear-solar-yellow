import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { C as getFrames, O as sampleDbz, S as getCity, _ as computeAlerts, a as CITIES, g as cn } from "./app-shell-giFZj0HH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-nowcast-Bybk_IiO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-accent/15 text-accent",
		muted: "bg-surface-2 text-muted",
		danger: "bg-danger/15 text-danger",
		warn: "bg-warn/15 text-warn",
		moderate: "bg-moderate/15 text-moderate",
		ok: "bg-ok/15 text-ok",
		outline: "text-muted shadow-[0_0_0_1px_var(--color-border)]"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function useNowcast(initialCity = CITIES[0].id, initialModel = "dgmr") {
	const [cityId, setCityId] = (0, import_react.useState)(initialCity);
	const [model, setModel] = (0, import_react.useState)(initialModel);
	const [timeMin, setTimeMin] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(true);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [threshold, setThreshold] = (0, import_react.useState)(45);
	const [vulnMin, setVulnMin] = (0, import_react.useState)(.35);
	const [warming, setWarming] = (0, import_react.useState)(false);
	const warmRef = (0, import_react.useRef)(null);
	const city = (0, import_react.useMemo)(() => getCity(cityId), [cityId]);
	const frames = (0, import_react.useMemo)(() => getFrames(city.id, model), [city.id, model]);
	const alerts = (0, import_react.useMemo)(() => computeAlerts(city, frames, threshold, vulnMin), [
		city,
		frames,
		threshold,
		vulnMin
	]);
	(0, import_react.useEffect)(() => {
		setWarming(true);
		setTimeMin(0);
		if (warmRef.current) window.clearTimeout(warmRef.current);
		const wait = model === "optical" ? 420 : model === "convlstm" ? 900 : 1400;
		warmRef.current = window.setTimeout(() => setWarming(false), wait);
		return () => {
			if (warmRef.current) window.clearTimeout(warmRef.current);
		};
	}, [city.id, model]);
	(0, import_react.useEffect)(() => {
		if (!playing || warming) return;
		let raf = 0;
		let last = performance.now();
		let acc = 0;
		const loop = (now) => {
			const dt = (now - last) / 1e3;
			last = now;
			acc += dt;
			if (acc >= .05) {
				const step = acc * 8;
				acc = 0;
				setTimeMin((t) => {
					const next = t + step;
					return next >= 120 ? 0 : next;
				});
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [playing, warming]);
	const dbzAt = (0, import_react.useCallback)((x, y) => sampleDbz(frames, timeMin, x, y), [frames, timeMin]);
	return {
		city,
		cityId,
		setCityId,
		model,
		setModel,
		timeMin,
		setTimeMin,
		playing,
		setPlaying,
		selected,
		setSelected,
		threshold,
		setThreshold,
		vulnMin,
		setVulnMin,
		warming,
		frames,
		alerts,
		activeAlerts: (0, import_react.useMemo)(() => alerts.filter((a) => a.t <= timeMin), [alerts, timeMin]),
		dbzAt
	};
}
//#endregion
export { useNowcast as n, Badge as t };
