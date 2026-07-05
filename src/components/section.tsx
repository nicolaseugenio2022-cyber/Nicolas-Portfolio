import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase text-violet-300">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-8 text-zinc-300">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
