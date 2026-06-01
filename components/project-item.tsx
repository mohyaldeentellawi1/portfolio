import { Project } from "@/lib/interfaces/project.interface";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function ProjectItem({ project }: { project: Project }) {
  const t = useTranslations("Home");
  const main = project.media?.find((m) => m.isMain);

  return (
    <div
      style={{ borderRadius: "4px" }}
      className="group relative cursor-pointer overflow-hidden border border-border bg-card p-2.5 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_4px] hover:shadow-primary/20 dark:hover:shadow-primary/35"
    >
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden flex items-center justify-center aspect-square">
        {main ? (
          <div className="relative w-4/5 h-full">
            <Image
              src={main.thumbnailUrl ?? main.url}
              alt={project.title}
              fill
              className="object-contain scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
              loading="eager"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-muted to-muted/60" />
        )}

        {/* Tags — top right */}
        <div className="absolute top-3 right-3 flex flex-row flex-wrap gap-1.5 pointer-events-none z-10 justify-end">
          {(project.tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="bg-muted dark:bg-background backdrop-blur-md border border-border/50 text-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-center"
            >
              {tag.tag.name}
            </span>
          ))}
        </div>

        {/* Hover overlay — slides up from bottom */}
        <Link
          style={{ borderRadius: "4px" }}
          href={`/projects/${project.id}`}
          className="absolute inset-x-3 bottom-3 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            bg-card/90 backdrop-blur-md border border-border/50
            p-3.5"
        >
          <h3 className="text-sm font-bold text-foreground mb-1 truncate">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
            <span>{t("Discovertheproject")}</span>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </div>
        </Link>
      </div>

      {/* Project types — below image */}
      {project.projectTypes.length > 0 && (
        <div dir="ltr" className="flex flex-wrap gap-1.5 px-1 pt-3 pb-1">
          {project.projectTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
            >
              {type.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
