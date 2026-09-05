import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as sampleDbz, b as formatDbz, g as cn, w as getVulnerability, y as dbzToRgba } from "./app-shell-giFZj0HH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/radar-nowcast-BPM1t_fY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RadarNowcast({ city, model, timeMin, frames, selected, onSelect, alerts = [], userCell = null, showVuln = false, variant = "console", className }) {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const stateRef = (0, import_react.useRef)({
		city,
		model,
		timeMin,
		frames,
		selected,
		alerts,
		userCell,
		showVuln,
		variant
	});
	stateRef.current = {
		city,
		model,
		timeMin,
		frames,
		selected,
		alerts,
		userCell,
		showVuln,
		variant
	};
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let cancelled = false;
		const paint = () => {
			if (cancelled) return;
			const rect = wrap.getBoundingClientRect();
			const css = Math.max(160, Math.floor(Math.min(rect.width, rect.height || rect.width)));
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			if (canvas.width !== Math.floor(css * dpr) || canvas.height !== Math.floor(css * dpr)) {
				canvas.width = Math.floor(css * dpr);
				canvas.height = Math.floor(css * dpr);
				canvas.style.width = `${css}px`;
				canvas.style.height = `${css}px`;
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			drawRadar(ctx, css, stateRef.current);
		};
		const ro = new ResizeObserver(() => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(paint);
		});
		ro.observe(wrap);
		paint();
		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [
		city.id,
		model,
		timeMin,
		selected,
		showVuln,
		userCell?.x,
		userCell?.y,
		alerts.length,
		variant,
		frames
	]);
	const handlePointer = (e) => {
		if (!onSelect) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		onSelect(eventToCell(e, canvas, variant));
	};
	const hoverDbz = selected != null ? sampleDbz(frames, timeMin, selected.x, selected.y) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: cn("relative aspect-square w-full overflow-hidden rounded-lg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block size-full touch-none",
			onPointerDown: handlePointer,
			role: "img",
			"aria-label": `${city.name} nowcast radar, ${model}, t+${Math.round(timeMin)} minutes`
		}), selected && hoverDbz != null && variant !== "hero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute bottom-3 left-3 rounded-md bg-bg/90 px-2.5 py-1.5 font-mono text-xs text-fg shadow-[0_0_0_1px_var(--color-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [
						selected.x,
						",",
						selected.y
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-2 text-subtle",
					children: "·"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-accent",
					children: formatDbz(hoverDbz)
				})
			]
		}) : null]
	});
}
function eventToCell(e, canvas, variant) {
	const rect = canvas.getBoundingClientRect();
	const pad = variant === "hero" ? rect.width * .08 : 10;
	const size = Math.min(rect.width, rect.height) - pad * 2;
	const x = (e.clientX - rect.left - pad) / size * 32;
	const y = (e.clientY - rect.top - pad) / size * 32;
	if (x < 0 || y < 0 || x >= 32 || y >= 32) return null;
	if (variant === "hero" && Math.hypot(x - 16, y - 16) > 15.6) return null;
	return {
		x: Math.floor(x),
		y: Math.floor(y)
	};
}
function drawRadar(ctx, css, s) {
	const { city, timeMin, frames, selected, alerts, userCell, showVuln, variant } = s;
	ctx.clearRect(0, 0, css, css);
	const pad = variant === "hero" ? css * .08 : 10;
	const size = css - pad * 2;
	const cell = size / 32;
	const cx = css / 2;
	const cy = css / 2;
	ctx.fillStyle = "#0a1420";
	ctx.fillRect(0, 0, css, css);
	ctx.save();
	if (variant === "hero") {
		ctx.beginPath();
		ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
		ctx.clip();
	} else {
		roundRect(ctx, pad - 1, pad - 1, size + 2, size + 2, 10);
		ctx.clip();
	}
	ctx.fillStyle = "#0e1a2a";
	ctx.fillRect(0, 0, css, css);
	drawRiver(ctx, city, pad, size);
	if (showVuln) {
		const vuln = getVulnerability(city);
		for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
			const v = vuln[y * 32 + x] ?? 0;
			if (v < .4) continue;
			ctx.fillStyle = `rgba(232,93,76,${(v - .35) * .22})`;
			ctx.fillRect(pad + x * cell, pad + y * cell, cell, cell);
		}
	}
	const gap = variant === "hero" ? 0 : Math.max(.6, cell * .08);
	for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
		const dbz = sampleDbz(frames, timeMin, x, y);
		if (dbz < 11) continue;
		const [r, g, b, a] = dbzToRgba(dbz);
		ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a / 255})`;
		const rx = pad + x * cell + gap / 2;
		const ry = pad + y * cell + gap / 2;
		const rw = Math.max(1, cell - gap);
		ctx.fillRect(rx, ry, rw, rw);
	}
	if (variant !== "hero") {
		ctx.strokeStyle = "rgba(232,237,242,0.05)";
		ctx.lineWidth = 1;
		for (let i = 0; i <= 32; i += 4) {
			ctx.beginPath();
			ctx.moveTo(pad + i * cell, pad);
			ctx.lineTo(pad + i * cell, pad + size);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(pad, pad + i * cell);
			ctx.lineTo(pad + size, pad + i * cell);
			ctx.stroke();
		}
	}
	const fired = new Set(alerts.filter((a) => a.t <= timeMin).map((a) => `${a.x}:${a.y}`));
	if (variant !== "hero") {
		ctx.strokeStyle = "rgba(232,93,76,0.7)";
		ctx.lineWidth = 1.2;
		for (const a of alerts) {
			if (a.t > timeMin) continue;
			ctx.strokeRect(pad + a.x * cell + 1, pad + a.y * cell + 1, cell - 2, cell - 2);
		}
	}
	if (selected) {
		ctx.strokeStyle = "#4a90a8";
		ctx.lineWidth = 2;
		ctx.strokeRect(pad + selected.x * cell, pad + selected.y * cell, cell, cell);
	}
	if (userCell) {
		const ux = pad + (userCell.x + .5) * cell;
		const uy = pad + (userCell.y + .5) * cell;
		const hot = fired.has(`${userCell.x}:${userCell.y}`);
		ctx.beginPath();
		ctx.arc(ux, uy, Math.max(5, cell * .42), 0, Math.PI * 2);
		ctx.fillStyle = hot ? "#c45c4a" : "#e8eef4";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(ux, uy, Math.max(8, cell * .7), 0, Math.PI * 2);
		ctx.strokeStyle = hot ? "rgba(196,92,74,0.9)" : "rgba(74,144,168,0.9)";
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	if (variant === "hero") {
		ctx.strokeStyle = "rgba(62,200,192,0.22)";
		ctx.lineWidth = 1;
		for (const r of [
			.28,
			.52,
			.78,
			1
		]) {
			ctx.beginPath();
			ctx.arc(cx, cy, size / 2 * r, 0, Math.PI * 2);
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.moveTo(cx, pad);
		ctx.lineTo(cx, pad + size);
		ctx.moveTo(pad, cy);
		ctx.lineTo(pad + size, cy);
		ctx.stroke();
	}
	ctx.restore();
	if (variant === "hero") {
		ctx.strokeStyle = "rgba(62,200,192,0.45)";
		ctx.lineWidth = 1.4;
		ctx.beginPath();
		ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "#8b95a1";
		ctx.font = "500 11px 'IBM Plex Mono', monospace";
		ctx.textAlign = "center";
		ctx.fillText("N", cx, pad - 4);
	}
	ctx.fillStyle = "#8b95a1";
	ctx.font = "500 10px 'IBM Plex Mono', monospace";
	ctx.textAlign = "left";
	ctx.fillText(city.name.toUpperCase(), 12, css - 10);
	ctx.textAlign = "right";
	ctx.fillText(`T+${String(Math.round(timeMin)).padStart(3, "0")}m`, css - 12, css - 10);
}
function drawRiver(ctx, city, pad, size) {
	if (city.river.length < 2) return;
	ctx.beginPath();
	city.river.forEach((p, i) => {
		const x = pad + p.x * size;
		const y = pad + p.y * size;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});
	ctx.strokeStyle = "rgba(62,200,192,0.28)";
	ctx.lineWidth = 7;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.stroke();
	ctx.strokeStyle = "rgba(62,200,192,0.55)";
	ctx.lineWidth = 2.4;
	ctx.stroke();
	ctx.fillStyle = "rgba(232,237,242,0.45)";
	ctx.font = "500 9px 'IBM Plex Sans', sans-serif";
	ctx.textAlign = "left";
	for (const lm of city.landmarks) {
		const x = pad + (lm.x + .5) / 32 * size;
		const y = pad + (lm.y + .5) / 32 * size;
		ctx.fillRect(x - 1, y - 1, 2, 2);
		ctx.fillText(lm.name, x + 5, y + 3);
	}
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
//#endregion
export { RadarNowcast as t };
