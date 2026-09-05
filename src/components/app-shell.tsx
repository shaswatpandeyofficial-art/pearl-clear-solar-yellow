import { useEffect, type ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useOps } from "@/lib/ops-store";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  bleed = false,
  footer = true,
}: {
  children: ReactNode;
  bleed?: boolean;
  footer?: boolean;
}) {
  const hydrateSession = useSession((s) => s.hydrate);
  const hydrateOps = useOps((s) => s.hydrate);

  useEffect(() => {
    hydrateSession();
    hydrateOps();
  }, [hydrateOps, hydrateSession]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader />
      <main className={cn(bleed ? "relative" : undefined)}>{children}</main>
      {footer ? <SiteFooter /> : null}
    </div>
  );
}
