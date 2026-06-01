"use client";

import { Post } from "@/lib/interfaces/blog.interface";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function BlogItem({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const t = useTranslations("Home");
  const router = useRouter();

  const { getLocalizedText } = useArabicText();
  return (
    <div
      key={post.id}
      onClick={() => router.push(`/tech-blog/${post.id}`)}
      className={`group flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10 py-8
                  ${index === 0 ? "border-t border-border/60" : ""}
                  border-b border-border/60
                  transition-colors duration-200 hover:bg-muted/30
                  -mx-4 px-4 rounded
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer`}
    >
      {/* Left — meta */}
      <div className="sm:w-40 shrink-0 flex sm:flex-col gap-3 sm:gap-1.5 flex-wrap">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
          {post.type}
        </span>
        <span className="text-xs text-muted-foreground">
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—"}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={11} />
          {post.readingTime} {t("minread")}
        </span>
      </div>

      {/* Right — content */}
      <div className="flex-1 flex flex-col gap-2.5">
        <h2 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
          {getLocalizedText(post.titleEn ?? "", post.title)}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {getLocalizedText(post.contentEn ?? "", post.content)}
        </p>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {t("Readarticle")}
        </span>
      </div>
    </div>
  );
}
