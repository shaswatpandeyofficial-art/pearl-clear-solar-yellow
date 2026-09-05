import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { LiveMap } from "@/components/live-map";
import { useNowcast } from "@/lib/use-nowcast";
import { useOps } from "@/lib/ops-store";

export const Route = createFileRoute("/map")({ component: MapPage });

function MapPage() {
  const opsCity = useOps((s) => s.cityId);
  const setOpsCity = useOps((s) => s.setCityId);
  const threshold = useOps((s) => s.threshold);
  const vulnMin = useOps((s) => s.vulnMin);
  const n = useNowcast(opsCity, "dgmr");

  useEffect(() => {
    n.setThreshold(threshold);
    n.setVulnMin(vulnMin);
    // setters from useState are stable; nowcast object is not
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, vulnMin]);

  useEffect(() => {
    if (n.cityId !== opsCity) n.setCityId(opsCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opsCity]);

  return (
    <AppShell bleed footer={false}>
      <LiveMap
        city={n.city}
        timeMin={n.timeMin}
        frames={n.frames}
        selected={n.selected}
        onSelect={n.setSelected}
        alerts={n.alerts}
        activeAlerts={n.activeAlerts}
        playing={n.playing}
        onPlaying={n.setPlaying}
        onTimeMin={n.setTimeMin}
        cityId={n.cityId}
        onCityId={(id) => {
          n.setCityId(id);
          setOpsCity(id);
        }}
        threshold={n.threshold}
      />
    </AppShell>
  );
}
