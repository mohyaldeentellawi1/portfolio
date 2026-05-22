import { Project } from "@/lib/interfaces/project.interface";
import Image from "next/image";
import Link from "next/link";

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <article
      key={project.id}
      className="group flex flex-col rounded-lg border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md overflow-hidden"
    >
      {/* ── Image — full width, flush to card edges ── */}
      <div className="relative">
        {(() => {
          const main = project.media?.find((m) => m.isMain);
          return main ? (
            <Link href={`/projects/${project.id}`} className="block">
              <div className="aspect-square w-full relative overflow-hidden">
                <Image
                  src={main.thumbnailUrl ?? main.url}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                />
              </div>
            </Link>
          ) : (
            <div className="aspect-square w-full bg-linear-to-br from-primary/10 via-muted to-muted/60" />
          );
        })()}

        {/* Tech tags — overlaid top-left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {(project.tags ?? []).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center rounded bg-card/90 backdrop-blur-sm
                                   border border-border/40 px-2 py-0.5
                                   text-[11px] font-medium text-foreground"
            >
              {tag.tag.name}
            </span>
          ))}
        </div>

        {/* Title + project types — overlaid bottom-left */}
        <div
          dir="ltr"
          className="absolute bottom-3 left-3 right-3 flex items-center gap-2 justify-between"
        >
          <Link
            href={`/projects/${project.id}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <h3
              className="inline-flex items-center rounded bg-card/90 backdrop-blur-sm
                         border border-border/40 px-2.5 py-1
                         text-sm font-semibold text-foreground transition-colors duration-200
                         group-hover:text-primary"
            >
              {project.title}
            </h3>
          </Link>
          <div className="flex items-center gap-0.5">
            {project.projectTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center rounded bg-primary/90 backdrop-blur-sm
                         px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground"
              >
                {type.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
