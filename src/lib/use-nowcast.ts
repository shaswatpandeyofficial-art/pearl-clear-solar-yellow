import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CITIES,
  FORECAST_MIN,
  computeAlerts,
  getCity,
  getFrames,
  sampleDbz,
  type CellAlert,
  type City,
  type ModelId,
} from "@/lib/nimbus";

export function useNowcast(initialCity = CITIES[0].id, initialModel: ModelId = "dgmr") {
  const [cityId, setCityId] = useState(initialCity);
  const [model, setModel] = useState<ModelId>(initialModel);
  const [timeMin, setTimeMin] = useState(52);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);
  const [threshold, setThreshold] = useState(45);
  const [vulnMin, setVulnMin] = useState(0.35);
  const [warming, setWarming] = useState(false);
  const warmRef = useRef<number | null>(null);

  const city: City = useMemo(() => getCity(cityId), [cityId]);
  const frames = useMemo(() => getFrames(city.id, model), [city.id, model]);
  const alerts: CellAlert[] = useMemo(
    () => computeAlerts(city, frames, threshold, vulnMin),
    [city, frames, threshold, vulnMin],
  );

  useEffect(() => {
    setWarming(true);
    if (warmRef.current) window.clearTimeout(warmRef.current);
    const wait = model === "optical" ? 420 : model === "convlstm" ? 900 : 1400;
    warmRef.current = window.setTimeout(() => setWarming(false), wait);
    return () => {
      if (warmRef.current) window.clearTimeout(warmRef.current);
    };
  }, [city.id, model]);

  useEffect(() => {
    if (!playing || warming) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      acc += dt;
      if (acc >= 0.05) {
        const step = acc * 8;
        acc = 0;
        setTimeMin((t) => {
          const next = t + step;
          return next >= FORECAST_MIN ? 0 : next;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, warming]);

  const dbzAt = useCallback(
    (x: number, y: number) => sampleDbz(frames, timeMin, x, y),
    [frames, timeMin],
  );

  const activeAlerts = useMemo(
    () => alerts.filter((a) => a.t <= timeMin),
    [alerts, timeMin],
  );

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
    activeAlerts,
    dbzAt,
  };
}
