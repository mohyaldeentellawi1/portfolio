import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getProjectsAction } from "@/lib/actions/projects/action";
import ProjectsGrid from "./projects-grid";

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

export default async function Projects() {
  const t = await getTranslations("Home");

  const { data: projects, pagination } = await getProjectsAction({
    page: 1,
    limit: 3,
  });
  return (
    <section id="project" className="p-8 md:p-10 lg:p-14 scroll-mt-24">
          {/* ── Skills scroll strip ── */}
          <div className="mb-10">
            <div className="flex flex-col gap-1 mb-4">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {t("TechnologiesIworkwith")}
              </h3>
            </div>

            <div dir="ltr" className="overflow-x-auto scrollbar-none">
              <div className="flex gap-3 w-max">
                {SKILLS.map(({ src, label }) => (
                  <div
                    key={label}
                    className="bg-muted dark:bg-background rounded-sm flex flex-col items-center gap-2 h-20 w-20 shrink-0
                               justify-center
                               transition-colors duration-200 hover:scale-105"
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
                      loading="eager"
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
              <p className="text-3xl font-bold tracking-tight text-foreground max-w-2xl leading-relaxed">
                {t(
                  "eachprojectisaproblemsolvedaskillsharpenedandastoryworthtelling",
                )}
              </p>
            </div>
          </div>

          {/* ── Cards grid + pagination ── */}
          <ProjectsGrid
            initialProjects={projects}
            initialPagination={pagination ?? null}
          />
    </section>
  );
}
