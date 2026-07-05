import type { LucideIcon } from "lucide-react";
import {
  siBootstrap,
  siComposer,
  siCplusplus,
  siGit,
  siGithub,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siOpenjdk,
  siPhp,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siWordpress,
  siXampp,
  type SimpleIcon,
} from "simple-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SkillGroupProps = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

const stackIcons: Record<string, SimpleIcon> = {
  PHP: siPhp,
  Python: siPython,
  Java: siOpenjdk,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  "Next.js": siNextdotjs,
  "C++": siCplusplus,
  Laravel: siLaravel,
  Bootstrap: siBootstrap,
  React: siReact,
  Tailwind: siTailwindcss,
  WordPress: siWordpress,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Supabase: siSupabase,
  Git: siGit,
  GitHub: siGithub,
  XAMPP: siXampp,
  Composer: siComposer,
};

const textOnlyGroups = new Set(["Soft Skills", "Technical Support"]);

export function SkillGroup({ title, icon: Icon, skills }: SkillGroupProps) {
  const textOnly = textOnlyGroups.has(title);

  return (
    <Card
      className={cn(
        "w-full border-white/10 bg-white/[0.035] text-white ring-white/10",
        textOnly ? "max-w-2xl" : "max-w-[22rem]"
      )}
    >
      <CardHeader className="border-b border-white/10 text-center">
        <CardTitle className="flex items-center justify-center gap-3 text-sm font-bold uppercase text-violet-200">
          <Icon className="size-4" aria-hidden="true" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={
          textOnly
            ? "flex flex-wrap justify-center gap-2.5"
            : "flex flex-wrap justify-center gap-4"
        }
      >
        {skills.map((skill) => (
          textOnly ? (
            <span
              key={skill}
              className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-50 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-300/45 hover:bg-violet-500/20 hover:shadow-lg hover:shadow-violet-950/25"
            >
              {skill}
            </span>
          ) : (
            <div
              key={skill}
              className="flex min-h-28 w-24 flex-col items-center justify-center rounded-xl border border-white/10 bg-black/25 p-3 text-center transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/10"
            >
              <SkillLogo skill={skill} />
              <p className="mt-3 text-xs font-semibold leading-5 text-zinc-100">
                {skill}
              </p>
            </div>
          )
        ))}
      </CardContent>
    </Card>
  );
}

function SkillLogo({ skill }: { skill: string }) {
  const icon = stackIcons[skill];

  if (!icon) {
    return (
      <div className="grid size-14 place-items-center rounded-xl border border-white/10 bg-white/[0.04] font-heading text-sm font-bold text-violet-100">
        {skill
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 3)}
      </div>
    );
  }

  return (
    <div className="flex size-14 items-center justify-center rounded-xl border border-white/10 bg-white p-3 shadow-lg shadow-black/25">
      <svg
        role="img"
        aria-label={icon.title}
        viewBox="0 0 24 24"
        className="block size-9"
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    </div>
  );
}
