import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { LandingPage } from "@/components/landing";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <LandingPage />
    </AppShell>
  );
}
