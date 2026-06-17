"use client";

import { Post } from "@/lib/interfaces/blog.interface";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";

export const TYPE_LABELS: Record<string, string> = {
  All: "All Topics",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  FLUTTER: "Flutter",
  MOBILE: "Mobile",
  DEVOPS: "DevOps",
  AI: "AI & ML",
  SOFTWARE_ENGINEERING: "System Design",
  PRODUCT_DEVELOPMENT: "Product",
  CAREER: "Career",
  CASE_STUDY: "Case Study",
  OTHER: "Other",
};

export function BlogItem({ post }: { post: Post }) {
  const t = useTranslations("Home");
  const router = useRouter();
  const { getLocalizedText } = useArabicText();
  const { resolvedTheme } = useTheme();

  const mode = resolvedTheme === "dark" ? "DARK" : "LIGHT";
  const normals = post.media.sort((a, b) => a.order - b.order);
  const coverImage = normals.find((m) => m.mode === mode) ?? normals[0] ?? null;

  return (
    <article
      onClick={() => router.push(`/tech-blog/${post.id}`)}
      style={{ borderRadius: "4px" }}
      className="group flex flex-col shadow-sm
      group relative cursor-pointer overflow-hidden
      bg-card transition-all duration-500 hover:border-primary/50
      hover:shadow-[0_0_30px_4px] hover:shadow-primary/20 dark:hover:shadow-primary/35"
    >
      {/* Cover image */}
      <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-primary/10 via-muted to-muted/60">
        {coverImage && (
          <Image
            src={coverImage.url}
            alt={getLocalizedText(post.titleEn ?? "", post.title)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="eager"
          />
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            {post.type.replace(/_/g, " ")}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={11} />
            {post.readingTime} {t("minread")}
          </span>
        </div>

        <h2 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {getLocalizedText(post.titleEn ?? "", post.title)}
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {getLocalizedText(
            post.excerptEn ?? post.contentEn ?? "",
            post.excerpt ?? post.content ?? "",
          )}
        </p>

        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {t("Readarticle")} →
        </span>
      </div>
    </article>
  );
}

export function FeaturedPost({ post }: { post: Post }) {
  const t = useTranslations("Home");
  const { getLocalizedText } = useArabicText();
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const mode = resolvedTheme === "dark" ? "DARK" : "LIGHT";
  const normals = post.media.sort((a, b) => a.order - b.order);
  const coverImage = normals.find((m) => m.mode === mode) ?? normals[0] ?? null;

  return (
    <article
      style={{ borderRadius: "4px" }}
      onClick={() => router.push(`/tech-blog/${post.id}`)}
      className="group cursor-pointer bg-card overflow-hidden shadow-sm transition-shadow duration-300 hover:border-primary/50 
      hover:shadow-[0_0_30px_4px] hover:shadow-primary/20 dark:hover:shadow-primary/35"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full overflow-hidden sm:w-3/5 aspect-video sm:aspect-auto min-h-32 bg-linear-to-br from-primary/15 via-accent to-muted/80">
          {coverImage && (
            <Image
              src={coverImage.url}
              alt={getLocalizedText(post.titleEn ?? "", post.title)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="eager"
            />
          )}
        </div>

        <div className="sm:w-2/5 p-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              {TYPE_LABELS[post.type] ?? post.type.replace(/_/g, " ")}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={11} />
              {post.readingTime} {t("minread")}
            </span>
          </div>

          <h2 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {getLocalizedText(post.titleEn ?? "", post.title)}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6 flex-1">
            {getLocalizedText(
              post.excerptEn ?? post.contentEn ?? "",
              post.excerpt ?? post.content ?? "",
            )}
          </p>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {t("Readarticle")} →
          </span>
        </div>
      </div>
    </article>
  );
}
