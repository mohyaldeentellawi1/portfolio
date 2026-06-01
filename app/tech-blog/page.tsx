"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import BlogItem from "@/components/Blog-Item";
import { useGetAllBlogs } from "@/lib/helpers/use-get-all-blogs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomPagination from "@/components/custom-pagination";

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
    <main className="pt-24 pb-14 px-6 sm:px-8 lg:px-10 min-h-screen flex flex-col">
      <div className="mx-auto max-w-5xl w-full flex flex-col flex-1 gap-12">
        {/* ── Header ── */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Select
            value={activeCategory}
            onValueChange={(val) => setActiveCategory(val ?? "All")}
          >
            <SelectTrigger
              dir="ltr"
              className="w-44 shrink-0 border-border bg-background px-3 rounded-lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent dir="ltr">
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ── Articles ── */}
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
            {filtered.map((post, i) => (
              <BlogItem key={post.id} post={post} index={i} />
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
    </main>
  );
}
