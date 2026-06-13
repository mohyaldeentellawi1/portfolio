"use client";

import CustomPagination from "@/components/custom-pagination";
import { Button } from "@/components/ui/button";
import { useGetAllBlogs } from "@/lib/helpers/use-get-all-blogs";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardBlogsPage() {
  const router = useRouter();
  const t = useTranslations("Dashboard");

  const {
    isLoading,
    isPending,
    blogs,
    pagination,
    fetchBlogs,
    handlePageChange,
  } = useGetAllBlogs();

  useEffect(() => {
    fetchBlogs(1, 10);
  }, [fetchBlogs]);

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            {t("BlogManagement")}
          </h1>
        </div>

        <Button onClick={() => router.push("/dashboard/blogs/new")} size="sm">
          <Plus />
          {t("AddBlog")}
        </Button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1"></div>

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="border-t border-border px-6 py-4">
          <CustomPagination
            pagination={pagination}
            onPageChange={(page) => handlePageChange(page)}
          />
        </div>
      )}
    </div>
  );
}
