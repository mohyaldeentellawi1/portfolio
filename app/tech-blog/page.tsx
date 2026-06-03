"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import BlogItem from "@/components/Blog-Item";
import { useGetAllBlogs } from "@/lib/helpers/use-get-all-blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import CustomPagination from "@/components/custom-pagination";
import BackButton from "@/components/back-button";

const CATEGORIES = [
  "All",
  "FRONTEND",
  "BACKEND",
  "FLUTTER",
  "MOBILE",
  "DEVOPS",
  "AI",
  "SOFTWARE_ENGINEERING",
  "PRODUCT_DEVELOPMENT",
  "CAREER",
  "CASE_STUDY",
  "OTHER",
];

export default function TechBlogPage() {
  const t = useTranslations("Home");

  const [activeCategory, setActiveCategory] = useState("All");

  const {
    isLoading,
    isPending,
    blogs: POSTS,
    pagination,
    fetchBlogs,
    handlePageChange,
  } = useGetAllBlogs();

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.type === activeCategory);

  useEffect(() => {
    fetchBlogs(1, 10, activeCategory === "All" ? undefined : activeCategory);
  }, [fetchBlogs, activeCategory]);

  return (
    <main className="pt-25 pb-14 px-6 sm:px-8 lg:px-10 min-h-screen flex flex-col">
      <div className="mx-auto max-w-7xl w-full flex flex-col flex-1 gap-6">
        {/* ── Header ── */}
        <div className="sm:-mx-8 lg:-mx-10 px-6 sm:px-8 lg:px-10 py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          {/* Back button — first on mobile, end on sm+ */}
          <div className="flex justify-end sm:order-2 shrink-0">
            <BackButton />
          </div>

          {/* Categories — second on mobile, start on sm+ */}
          <div
            dir="ltr"
            className="flex items-center gap-2 flex-wrap sm:order-1"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {cat.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* ── Articles ── */}
        <div className="bg-card border rounded-sm shadow-2xl shadow-slate-400 dark:shadow-slate-800 p-8 md:p-10 lg:p-14 flex flex-col flex-1 gap-8">
          {isLoading ? (
            <div className="flex flex-col">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10 py-8
                  ${i === 0 ? "border-t border-border/60" : ""}
                  border-b border-border/60`}
                >
                  <div className="sm:w-40 shrink-0 flex sm:flex-col gap-3 sm:gap-1.5 flex-wrap">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-3 w-14 rounded" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5">
                    <Skeleton className="h-5 w-3/4 rounded" />
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-2/3 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div
              className={`flex flex-col transition-opacity duration-200 ${
                isPending ? "opacity-40 pointer-events-none" : "opacity-100"
              }`}
            >
              {filtered.map((post) => (
                <BlogItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-center min-h-64">
              <p className="text-sm font-medium text-foreground">
                {t("Noarticlesinthiscategoryyet")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("Checkbacksoon")}
              </p>
            </div>
          )}

          {/* ── Pagination — always at the bottom ── */}
          {pagination && (
            <div className="mt-auto">
              <CustomPagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
