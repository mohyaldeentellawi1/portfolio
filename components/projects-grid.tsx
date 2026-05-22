"use client";

import { useState, useTransition } from "react";
import { getProjectsAction } from "@/lib/actions/projects/action";
import { Project } from "@/lib/interfaces/project.interface";
import { PaginationResult } from "@/lib/interfaces/pagination.interface";
import ProjectItem from "./project-item";
import CustomPagination from "./custom-pagination";

const LIMIT = 3;

export default function ProjectsGrid({
  initialProjects,
  initialPagination,
}: {
  initialProjects: Project[];
  initialPagination: PaginationResult | null;
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [pagination, setPagination] = useState(initialPagination);
  const [isPending, startTransition] = useTransition();

  function handlePageChange(page: number) {
    startTransition(async () => {
      const { data, pagination: next } = await getProjectsAction({
        page,
        limit: LIMIT,
      });
      setProjects(data);
      setPagination(next ?? null);
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        className={[
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          "transition-opacity duration-200",
          isPending ? "opacity-50 pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      {pagination && (
        <CustomPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
