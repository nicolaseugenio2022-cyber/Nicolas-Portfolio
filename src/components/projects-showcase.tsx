"use client";

import { useState } from "react";
import {
  ProjectCaseStudyCard,
  type ProjectCaseStudyCardProps,
} from "@/components/project-case-study-card";

type Project = Omit<
  ProjectCaseStudyCardProps,
  "isOpen" | "onOpen" | "onClose"
>;

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [openProject, setOpenProject] = useState<number | null>(null);

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      {projects.map((project, index) => (
        <div
          key={project.title}
          className={`reveal-delay-${Math.min(index + 1, 4)} h-full`}
          data-reveal="slide-up"
        >
          <ProjectCaseStudyCard
            {...project}
            isOpen={openProject === index}
            onOpen={() => setOpenProject(index)}
            onClose={() => setOpenProject(null)}
          />
        </div>
      ))}
    </div>
  );
}
