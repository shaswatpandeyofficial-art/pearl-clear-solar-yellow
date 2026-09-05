import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-wide flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">Nimbus</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            An AI-driven hyper-local early warning system for severe weather nowcasting.
            Team CloudNine · SRM University AP · Smart India Hackathon.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-kicker text-subtle">
          <Link to="/" className="hover:text-fg">
            Overview
          </Link>
          <Link to="/map" className="hover:text-fg">
            Live Map
          </Link>
          <Link to="/citizen" className="hover:text-fg">
            Citizen
          </Link>
          <Link to="/console" className="hover:text-fg">
            Command
          </Link>
          <a href="https://mausam.imd.gov.in/" className="hover:text-fg" target="_blank" rel="noreferrer">
            IMD
          </a>
        </div>
      </div>
    </footer>
  );
}
