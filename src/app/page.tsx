import { Award, GraduationCap } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";
import { ContactPanel } from "@/components/contact-panel";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { LocationMapButton } from "@/components/location-map-button";
import { Navbar } from "@/components/navbar";
import { ProjectCaseStudyCard } from "@/components/project-case-study-card";
import { Section } from "@/components/section";
import { SkillGroup } from "@/components/skill-group";
import { TimelineItem } from "@/components/timeline-item";
import { Badge } from "@/components/ui/badge";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/data/profile";

const skillSections = [
  {
    title: "Languages & Core Technologies",
    groups: ["Programming Languages", "Database"],
  },
  {
    title: "Frameworks & Libraries",
    groups: ["Libraries & Frameworks"],
  },
  {
    title: "Tools",
    groups: ["Tools"],
  },
  {
    title: "Support & Professional Skills",
    groups: ["Technical Support", "Soft Skills"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(139,92,246,0.1)_0%,rgba(5,5,8,0)_28%),linear-gradient(135deg,rgba(6,182,212,0.08)_0%,rgba(5,5,8,0)_36%),#050508] text-white">
      <Navbar />
      <main>
        <Hero />

        <Section
          id="about"
          eyebrow="About"
          title="Developer foundation with IT support discipline."
          description="I focus on practical software systems, database-backed workflows, and reliable technical support for teams that need organized, maintainable tools."
        >
          <div className="grid gap-6 border-y border-white/10 py-6 lg:grid-cols-3">
            {profile.highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="flex gap-4 lg:border-r lg:border-white/10 lg:pr-6 lg:last:border-r-0"
              >
                <span className="font-heading text-sm font-bold text-violet-300">
                  0{index + 1}
                </span>
                <p className="leading-8 text-zinc-200">{highlight}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="skills"
          eyebrow="Skills"
          title="Technical stack and support strengths."
          description="A focused overview of the languages, frameworks, databases, tools, and support skills I use when building practical systems."
        >
          <div className="grid gap-12">
            {skillSections.map((section) => (
              <div key={section.title}>
                <div className="mb-6 flex items-center justify-center gap-3 border-b border-white/10 pb-4">
                  <span className="grid size-9 place-items-center rounded-xl bg-violet-500/15 text-violet-200">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-center font-heading text-2xl font-bold text-white sm:text-3xl">
                    {section.title}
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-5">
                  {skillGroups
                    .filter((group) => section.groups.includes(group.title))
                    .map((group) => (
                      <SkillGroup key={group.title} {...group} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="experience"
          eyebrow="Experience"
          title="Hands-on technical support experience."
          className="bg-white/[0.015]"
        >
          <div className="grid gap-6">
            {experience.map((item) => (
              <TimelineItem key={item.organization} {...item} />
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          eyebrow="Projects"
          title="Selected systems I've built."
          description="Each project is presented around the problem, the system built, and the practical features that supported administrative or public-sector workflows."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            {projects.map((project) => (
              <ProjectCaseStudyCard key={project.title} {...project} />
            ))}
          </div>
        </Section>

        <Section
          id="certifications"
          eyebrow="Certifications"
          title="Certifications and learning milestones."
          className="bg-white/[0.015]"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {certifications.map((certification) => (
              <article
                key={`${certification.title}-${certification.date}`}
                className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.055] hover:shadow-xl hover:shadow-violet-950/25"
              >
                <div className="flex gap-4">
                  <Award
                    className="mt-1 size-5 shrink-0 text-violet-200"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {certification.title}
                    </h3>
                    {certification.detail ? (
                      <p className="mt-1 text-sm text-zinc-400">
                        {certification.detail}
                      </p>
                    ) : null}
                    {certification.date ? (
                      <Badge
                        variant="outline"
                        className="mt-3 border-violet-400/30 bg-violet-500/10 text-violet-100"
                      >
                        {certification.date}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="education"
          eyebrow="Education"
          title="Academic background."
        >
          <div className="grid gap-4">
            {education.map((item) => (
              <article
                key={item.school}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#111116] p-5 transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-[#14141b] hover:shadow-xl hover:shadow-cyan-950/20 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <GraduationCap
                    className="mt-1 size-5 shrink-0 text-cyan-200"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {item.school}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="text-zinc-400">{item.program}</span>
                      <LocationMapButton
                        name={item.locationName}
                        address={item.address}
                        embedUrl={item.embedUrl}
                        mapUrl={item.mapUrl}
                        variant="inline"
                        className="-ml-1"
                      />
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="w-fit border-cyan-300/25 bg-cyan-400/10 text-cyan-100"
                >
                  {item.date}
                </Badge>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          eyebrow="Contact"
          title="Ready to discuss software development opportunities."
          description="Send a short message about the role, project, or collaboration you have in mind."
        >
          <ContactPanel />
        </Section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
