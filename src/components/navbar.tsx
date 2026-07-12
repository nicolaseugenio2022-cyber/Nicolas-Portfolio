"use client";

import { useRef } from "react";
import { Code2, Menu } from "lucide-react";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, profile } from "@/data/profile";

export function Navbar() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  function closeMobileMenu() {
    window.setTimeout(() => {
      if (mobileMenuRef.current) {
        mobileMenuRef.current.open = false;
      }
    }, 0);
  }

  return (
    <header className="nav-open sticky top-0 z-50 border-b border-border bg-[var(--nav-background)] px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
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

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <details ref={mobileMenuRef} className="group relative md:hidden">
            <summary
              className="grid size-11 list-none place-items-center rounded-lg border border-border bg-card text-foreground outline-none transition duration-300 ease-out hover:bg-muted active:scale-95 focus-visible:ring-3 focus-visible:ring-violet-400/60 [&::-webkit-details-marker]:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </summary>
            <nav
              className="absolute right-0 mt-3 grid min-w-48 gap-1 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl shadow-black/20"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground outline-none transition duration-300 ease-out hover:bg-violet-500/15 hover:text-foreground active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-violet-400/60"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
