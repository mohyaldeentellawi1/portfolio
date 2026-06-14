"use client";

import { useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FolderOpen,
  Clock,
  Eye,
} from "lucide-react";
import { useGetAllBlogs } from "@/lib/helpers/use-get-all-blogs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "@/components/custom-pagination";
import { Button } from "@/components/ui/button";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function DashboardBlogsPage() {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const { getLocalizedText } = useArabicText();

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
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-b">
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          {t("BlogManagement")}
        </h1>
        <Button onClick={() => router.push("/dashboard/blogs/new")} size="sm">
          <Plus size={14} />
          {t("AddBlog")}
        </Button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 size={18} className="animate-spin text-muted-foreground" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 h-64">
            <FolderOpen size={28} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No blog posts yet.</p>
            <Button
              onClick={() => router.push("/dashboard/blogs/new")}
              size="sm"
              variant="outline"
            >
              <Plus size={14} />
              {t("AddBlog")}
            </Button>
          </div>
        ) : (
          <div
            className={
              isPending
                ? "opacity-50 pointer-events-none transition-opacity"
                : ""
            }
          >
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 ps-6 text-start!">ID</TableHead>
                  <TableHead className="w-48 text-start!">Title</TableHead>
                  <TableHead className="w-40 text-start!">Type</TableHead>
                  <TableHead className="w-24 text-start!">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      Read
                    </span>
                  </TableHead>
                  <TableHead className="w-24 text-start!">
                    <span className="flex items-center gap-1.5">
                      <Eye size={12} />
                      Readers
                    </span>
                  </TableHead>
                  <TableHead className="w-32 text-start!">Created</TableHead>
                  <TableHead className="w-20 pe-6 text-center!">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="w-12 ps-6 text-xs text-muted-foreground font-mono">
                      {blog.id}
                    </TableCell>

                    <TableCell className="w-48">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {getLocalizedText(blog.titleEn ?? "", blog.title)}
                      </p>
                      {blog.titleEn && blog.title && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {blog.title}
                        </p>
                      )}
                    </TableCell>

                    <TableCell className="w-40">
                      <span className="inline-flex items-center rounded bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary whitespace-nowrap">
                        {blog.type.replace(/_/g, " ")}
                      </span>
                    </TableCell>

                    <TableCell className="w-24 text-sm text-muted-foreground">
                      {blog.readingTime} min
                    </TableCell>

                    <TableCell className="w-24 text-sm text-muted-foreground">
                      {blog.readerCount.toLocaleString()}
                    </TableCell>

                    <TableCell className="w-32 text-xs text-muted-foreground">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="w-20 pe-6">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          onClick={() =>
                            router.push(`/dashboard/blogs/${blog.id}/edit`)
                          }
                          style={{
                            borderRadius: "4px",
                          }}
                          aria-label={`Edit blog ${blog.id}`}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil size={13} />
                        </Button>
                        <Button
                          aria-label={`Delete blog ${blog.id}`}
                          style={{
                            borderRadius: "4px",
                          }}
                          variant="destructive"
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="border-t border-border px-6 py-4">
          <CustomPagination
            pagination={pagination}
            onPageChange={(page) => handlePageChange(page, 10)}
          />
        </div>
      )}
    </div>
  );
}
