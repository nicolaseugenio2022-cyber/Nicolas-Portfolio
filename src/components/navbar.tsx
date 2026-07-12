"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, profile } from "@/data/profile";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="nav-open sticky top-0 z-50 border-b border-border bg-[var(--nav-background)] px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-6">
        <a
          href="#home"
          className="flex min-h-11 items-center gap-3 rounded-lg text-foreground outline-none transition hover:text-violet-600 dark:hover:text-violet-200 focus-visible:ring-3 focus-visible:ring-violet-400/60"
          aria-label="Go to home section"
        >
          <span className="grid size-9 place-items-center rounded-lg border border-violet-400/40 bg-violet-100 text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200">
            <Code2 className="size-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-sm font-bold sm:text-base">
            {profile.shortName}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition duration-300 ease-out hover:bg-muted hover:text-foreground active:scale-[0.97] focus-visible:ring-3 focus-visible:ring-violet-400/60"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <div className="relative md:hidden">
            <button
              ref={mobileMenuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="relative grid size-11 place-items-center rounded-xl border border-border bg-card text-foreground shadow-sm outline-none transition duration-300 ease-out hover:border-violet-400/45 hover:bg-muted active:scale-95 focus-visible:ring-3 focus-visible:ring-violet-400/60"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <Menu
                className={`absolute size-5 transition duration-200 ${
                  mobileMenuOpen ? "scale-75 opacity-0" : "scale-100 opacity-100"
                }`}
                aria-hidden="true"
              />
              <X
                className={`absolute size-5 transition duration-200 ${
                  mobileMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                aria-hidden="true"
              />
            </button>
            <nav
              id="mobile-navigation-menu"
              className={`absolute right-0 top-[calc(100%+0.5rem)] z-30 grid w-56 origin-top-right gap-1 rounded-2xl border border-border bg-popover/95 p-2.5 text-popover-foreground shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-200 ease-out ${
                mobileMenuOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-2 scale-[0.97] opacity-0"
              }`}
              aria-label="Mobile navigation"
              aria-hidden={!mobileMenuOpen}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="flex min-h-11 items-center rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground outline-none transition duration-200 ease-out hover:bg-violet-500/15 hover:text-foreground active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-violet-400/60"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={mobileMenuOpen ? 0 : -1}
        onClick={() => {
          setMobileMenuOpen(false);
          mobileMenuButtonRef.current?.focus();
        }}
        className={`fixed inset-x-0 bottom-0 top-[77px] z-10 bg-black/15 backdrop-blur-[2px] transition duration-200 dark:bg-black/35 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <ScrollProgress />
    </header>
  );
}
