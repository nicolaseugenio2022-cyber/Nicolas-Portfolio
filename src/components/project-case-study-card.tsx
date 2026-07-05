import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectCaseStudyCardProps = {
  title: string;
  label: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  features: string[];
};

export function ProjectCaseStudyCard({
  title,
  label,
  problem,
  solution,
  role,
  stack,
  features,
}: ProjectCaseStudyCardProps) {
  return (
    <Card className="group border-white/10 bg-[#111116] text-white ring-white/10 transition duration-300 ease-out hover:-translate-y-1 hover:border-violet-300/35 hover:bg-[#14141b] hover:shadow-2xl hover:shadow-violet-950/30">
      <CardHeader>
        <ProjectPreview title={title} label={label} role={role} />
        <CardTitle className="font-heading text-2xl font-bold text-white">
          {title}
        </CardTitle>
        <p className="text-sm font-semibold text-violet-200">{label}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase text-zinc-400">
              Problem
            </p>
            <p className="leading-7 text-zinc-300">{problem}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase text-zinc-400">
              Solution
            </p>
            <p className="leading-7 text-zinc-300">{solution}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-zinc-400">
            Key Features
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm text-zinc-300">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-violet-300"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="border-cyan-300/25 bg-cyan-400/10 text-cyan-100"
            >
              {item}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-violet-200 transition group-hover:text-violet-100">
          View project overview
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectPreview({
  title,
  label,
  role,
}: {
  title: string;
  label: string;
  role: string;
}) {
  const isLexVerdict = title === "LexVerdict";
  const rows = isLexVerdict
    ? ["Subpoena intake", "Case lookup", "Resolution tracking"]
    : ["Resident profile", "Search records", "CRUD workflow"];
  const metrics = isLexVerdict
    ? [
        ["Records", "Cases"],
        ["Flow", "Tracking"],
      ]
    : [
        ["Access", "Auth"],
        ["Data", "CRUD"],
      ];

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-violet-400/20 bg-[#09090d] transition duration-300 group-hover:border-violet-300/40 group-hover:shadow-lg group-hover:shadow-violet-950/25">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 transition group-hover:bg-violet-500/10">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-yellow-300" />
          <span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <div className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[0.7rem] text-violet-100">
          {role} / {label}
        </div>
      </div>

      <div className="grid min-h-40 gap-4 p-4 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-2">
          {rows.map((row, index) => (
            <div
              key={row}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5 transition group-hover:border-violet-300/20 group-hover:bg-white/[0.055]"
            >
              <span className="grid size-7 place-items-center rounded-md bg-violet-500/15 text-xs font-bold text-violet-100">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-zinc-100">{row}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          {metrics.map(([labelText, value]) => (
            <div
              key={labelText}
              className="rounded-lg border border-cyan-300/15 bg-cyan-400/10 p-3 transition group-hover:border-cyan-200/30 group-hover:bg-cyan-400/15"
            >
              <p className="text-[0.68rem] uppercase text-cyan-100/70">
                {labelText}
              </p>
              <p className="mt-1 font-heading text-lg font-bold text-cyan-50">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
