import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as riskLevel } from "./app-shell-giFZj0HH.mjs";
import { t as Badge } from "./use-nowcast-Bybk_IiO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/risk-badge-BTh2oE9x.js
var import_jsx_runtime = require_jsx_runtime();
var VARIANT = {
	low: "ok",
	moderate: "moderate",
	high: "warn",
	severe: "danger"
};
function RiskBadge({ dbz, vuln = .5, level }) {
	const lv = level ?? riskLevel(dbz ?? 0, vuln);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: VARIANT[lv],
		children: lv
	});
}
//#endregion
export { RiskBadge as t };
