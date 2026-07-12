"use client";

import { useEffect, useRef, useState } from "react";
import {
  ProjectCaseStudyCard,
  type ProjectCaseStudyCardProps,
} from "@/components/project-case-study-card";

type Project = Omit<
  ProjectCaseStudyCardProps,
  "isOpen" | "onOpen" | "onClose" | "showMobileHint"
>;

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [showMobileHint, setShowMobileHint] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      sessionStorage.getItem("portfolio-project-card-hint") ||
      !window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    const element = showcaseRef.current;
    if (!element) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        sessionStorage.setItem("portfolio-project-card-hint", "shown");
        setShowMobileHint(true);
        timer = window.setTimeout(() => setShowMobileHint(false), 1800);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={showcaseRef} className="grid gap-8 xl:grid-cols-2">
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
            showMobileHint={showMobileHint}
          />
        </div>
      ))}
    </div>
  );
}
