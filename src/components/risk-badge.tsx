import { Badge } from "@/components/ui/badge";
import { riskLevel, type RiskLevel } from "@/lib/nimbus";

const VARIANT: Record<RiskLevel, "ok" | "moderate" | "warn" | "danger"> = {
  low: "ok",
  moderate: "moderate",
  high: "warn",
  severe: "danger",
};

export function RiskBadge({
  dbz,
  vuln = 0.5,
  level,
}: {
  dbz?: number;
  vuln?: number;
  level?: RiskLevel;
}) {
  const lv = level ?? riskLevel(dbz ?? 0, vuln);
  return <Badge variant={VARIANT[lv]}>{lv}</Badge>;
}
