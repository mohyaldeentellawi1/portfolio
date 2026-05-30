"use client";

import { useCallback, useState } from "react";
import { Project } from "../interfaces/project.interface";
import { PaginationResult } from "../interfaces/pagination.interface";
import { getProjectsAction } from "../actions/projects/action";

const LIMIT = 10;

export const useGetAllProjects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<PaginationResult | null>(null);

  const getAllProjects = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const { success, data, pagination: pg } = await getProjectsAction({
        page,
        limit: LIMIT,
      });
      if (success) {
        setProjects(data ?? []);
        setPagination(pg ?? null);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, projects, pagination, getAllProjects };
};
