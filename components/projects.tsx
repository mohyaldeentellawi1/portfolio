import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SKILLS = [
  // Languages
  { src: "/html.svg", label: "HTML" },
  { src: "/tailwindcss.svg", label: "Tailwind CSS" },
  { src: "/javascript.svg", label: "JavaScript" },
  { src: "/typescript.svg", label: "TypeScript" },
  { src: "/dart.svg", label: "Dart" },
  { src: "/python.svg", label: "Python" },
  // Frameworks & Libraries
  { src: "/node.svg", label: "Node.js" },
  { src: "/express.svg", label: "Express" },
  { src: "/nest.svg", label: "NestJS" },
  { src: "/react.svg", label: "React" },
  { src: "/next.svg", label: "Next.js" },
  { src: "/flutter.svg", label: "Flutter" },

  // Databases & Tools
  { src: "/postgres.svg", label: "PostgreSQL" },
  { src: "/mysql.svg", label: "MySQL" },
  { src: "/mongo.svg", label: "MongoDB" },
  { src: "/prisma.svg", label: "Prisma" },
  { src: "/github.svg", label: "GitHub" },
] as const;

const FEATURED_PROJECTS = [
  {
    slug: "project-alpha",
    title: "Project Alpha",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    slug: "project-beta",
    title: "Project Beta",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    slug: "project-gamma",
    title: "Project Gamma",
    tags: ["React", "D3.js", "REST API"],
    github: "https://github.com",
    live: null,
  },
] as const;

export default function Projects() {
  return (
    <section
      id="project"
      className="flex items-center py-14 px-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          {/* ── Skills scroll strip ── */}
          <div className="mb-10">
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                Skills
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Technologies I work with
              </h3>
            </div>

            <div className="overflow-x-auto scrollbar-none">
              <div className="flex gap-3 w-max">
                {SKILLS.map(({ src, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 h-20 w-20 shrink-0
                               rounded-lg bg-background justify-center
                               transition-colors duration-200 hover:bg-muted"
                  >
                    <Image
                      src={src}
                      alt={label}
                      width={36}
                      height={36}
                      className={
                        label === "GitHub" ||
                        label === "Next.js" ||
                        label === "Express"
                          ? "dark:invert"
                          : ""
                      }
                    />
                    <span className="text-[10px] font-medium text-muted-foreground text-center leading-none whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-border/40 mb-10" />

          {/* ── Section header ── */}
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
            {FEATURED_PROJECTS.map(({ slug, title, tags, github, live }) => (
              <article
                key={slug}
                className="group flex flex-col rounded-lg border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md overflow-hidden"
              >
                {/* ── Image — full width, flush to card edges ── */}
                <div className="relative">
                  {/* Placeholder image */}
                  <div className="aspect-square w-full bg-linear-to-br from-primary/10 via-muted to-muted/60" />

                  {/* Tech tags — overlaid top-left */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded bg-card/90 backdrop-blur-sm
                                   border border-border/40 px-2 py-0.5
                                   text-[11px] font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Creative "Go to Link" — overlaid top-right */}
                  <a
                    href={live ?? github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${title}`}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center
                               rounded-full bg-card/90 backdrop-blur-sm border border-border/40
                               text-foreground transition-all duration-200
                               hover:bg-foreground hover:text-background hover:border-foreground hover:scale-110
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </a>

                  {/* Title — overlaid bottom-left */}
                  <Link
                    href={`/projects/${slug}`}
                    className="absolute bottom-3 left-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    <h3
                      className="inline-flex items-center rounded bg-card/90 backdrop-blur-sm
                                   border border-border/40 px-2.5 py-1
                                   text-sm font-semibold text-foreground transition-colors duration-200
                                   group-hover:text-primary"
                    >
                      {title}
                    </h3>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
