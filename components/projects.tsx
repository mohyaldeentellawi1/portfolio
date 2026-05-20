import Link from "next/link";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURED_PROJECTS = [
  {
    slug: "project-alpha",
    index: "01",
    title: "Project Alpha",
    description:
      "A modern web application built with Next.js and TypeScript, featuring real-time data updates and a fully accessible UI.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    slug: "project-beta",
    index: "02",
    title: "Project Beta",
    description:
      "Full-stack e-commerce platform with seamless checkout, inventory management, and a powerful admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    slug: "project-gamma",
    index: "03",
    title: "Project Gamma",
    description:
      "Mobile-first data dashboard with interactive charts, advanced filters, and one-click export capabilities.",
    tags: ["React", "D3.js", "REST API"],
    github: "https://github.com",
    live: null,
  },
] as const;

export default function Projects() {
  return (
    <section
      id="project"
      className="min-h-screen flex items-center py-24 px-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* ── Container — same pattern as About ── */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">

          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                Projects
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                A new way to showcase software
              </h2>
              <p className="text-base text-muted-foreground max-w-xl">
                Selected work — each project is a problem solved, a skill
                sharpened, and a story worth telling.
              </p>
            </div>

            {/* View All button */}
            <Button
              render={<Link href="/projects" />}
              nativeButton={false}
              variant="outline"
              size="sm"
              className="shrink-0 self-start"
            >
              View All
              <ArrowRight />
            </Button>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map(
              ({ slug, index, title, description, tags, github, live }) => (
                <article
                  key={slug}
                  className="group relative flex flex-col bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Stretched card link — covers the whole card */}
                  <Link
                    href={`/projects/${slug}`}
                    className="absolute inset-0 z-0"
                    aria-label={`View ${title} details`}
                  />

                  {/* ── Card header: index + action links ── */}
                  <div className="relative flex items-start justify-between p-5 border-b border-border/60 bg-muted/40">
                    <span className="text-4xl font-bold tracking-tighter text-border select-none">
                      {index}
                    </span>

                    {/* Action links — z-10 to sit above the stretched card link */}
                    <div className="relative z-10 flex gap-1">
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${title} source on GitHub`}
                        className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground
                                   hover:text-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Code2 size={15} />
                      </a>
                      {live && (
                        <a
                          href={live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${title} live demo`}
                          className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground
                                     hover:text-foreground hover:bg-muted transition-colors duration-200"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <h3 className="text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
