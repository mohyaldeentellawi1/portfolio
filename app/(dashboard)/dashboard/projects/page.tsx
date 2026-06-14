"use client";

import { useEffect } from "react";

import { Plus, Pencil, Trash2, Loader2, FolderOpen } from "lucide-react";
import { useGetAllProjects } from "@/lib/helpers/use-get-all-projects";
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

export default function DashboardProjectsPage() {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const { getLocalizedText } = useArabicText();
  const { isLoading, projects, pagination, getAllProjects } =
    useGetAllProjects();

  useEffect(() => {
    getAllProjects(1);
  }, [getAllProjects]);

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-b">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            {t("ProjectManagement")}
          </h1>
        </div>

        <Button
          onClick={() => router.push("/dashboard/projects/new")}
          size="sm"
        >
          <Plus />
          {t("AddProject")}
        </Button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 size={18} className="animate-spin text-muted-foreground" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 h-64">
            <FolderOpen size={28} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              {t("NoProjectsYet")}
            </p>
            <Button
              onClick={() => router.push("/dashboard/projects/new")}
              size="sm"
              variant="outline"
            >
              <Plus />
              {t("AddProject")}
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-14 ps-6 text-start!">ID</TableHead>
                <TableHead className="w-48 text-start!">{t("Title")}</TableHead>
                <TableHead className="w-72 text-start!">{t("Types")}</TableHead>
                <TableHead className="text-start!">{t("Tags")}</TableHead>
                <TableHead className="w-32 text-start!">
                  {t("CreatedAt")}
                </TableHead>
                <TableHead className="w-20 pe-6 text-center">
                  {t("Actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  {/* ID */}
                  <TableCell className="w-14 ps-6 text-xs text-muted-foreground font-mono">
                    {project.id}
                  </TableCell>

                  {/* Title */}
                  <TableCell className="w-48">
                    <span className="text-sm font-medium text-foreground line-clamp-2">
                      {getLocalizedText(project.titleEn, project.title)}
                    </span>
                  </TableCell>

                  {/* Types */}
                  <TableCell className="w-72">
                    <div className="flex flex-wrap gap-1">
                      {project.projectTypes.slice(0, 3).map((type) => (
                        <span
                          key={type}
                          className="inline-flex items-center rounded bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary whitespace-nowrap"
                        >
                          {type.replace(/_/g, " ")}
                        </span>
                      ))}
                      {project.projectTypes.length > 3 && (
                        <span className="text-[11px] text-muted-foreground self-center">
                          +{project.projectTypes.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Tags */}
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(project.tags ?? []).slice(0, 4).map((pt) => (
                        <span
                          key={pt.id}
                          className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground whitespace-nowrap"
                        >
                          {pt.tag.name}
                        </span>
                      ))}
                      {(project.tags ?? []).length > 4 && (
                        <span className="text-[11px] text-muted-foreground self-center">
                          +{(project.tags ?? []).length - 4}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="w-32 text-xs text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="w-20 pe-6">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        onClick={() =>
                          router.push(`/dashboard/projects/${project.id}/edit`)
                        }
                        style={{
                          borderRadius: "4px",
                        }}
                        aria-label={`Edit project ${project.id}`}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        aria-label={`Delete project ${project.id}`}
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
        )}
      </div>

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="border-t border-border px-6 py-4">
          <CustomPagination
            pagination={pagination}
            onPageChange={(page) => getAllProjects(page)}
          />
        </div>
      )}
    </div>
  );
}
