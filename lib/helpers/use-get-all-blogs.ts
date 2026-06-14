"use client";

import { useCallback, useState, useTransition } from "react";
import { Post } from "../interfaces/blog.interface";
import { getBlogsAction } from "../actions/blog/action";
import { PaginationResult } from "../interfaces/pagination.interface";
import { toast } from "sonner";

export const useGetAllBlogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationResult | null>(null);

  const fetchBlogs = useCallback(
    async (page: number, limit: number, type?: string) => {
      setIsLoading(true);
      try {
        const { success, data, pagination, message } = await getBlogsAction({
          page,
          limit,
          type,
        });
        if (success) {
          setBlogs(data);
          setPagination(pagination || null);
        } else {
          toast.error(message || "Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  function handlePageChange(page: number, limit: number = 5) {
    startTransition(async () => {
      const {
        data,
        pagination: next,
        success,
        message,
      } = await getBlogsAction({
        page,
        limit,
      });
      if (success) {
        setBlogs(data);
        setPagination(next ?? null);
        // Scroll to top after page change
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(message || "Failed to fetch blogs");
      }
    });
  }

  return {
    isLoading,
    isPending,
    blogs,
    pagination,
    fetchBlogs,
    handlePageChange,
  };
};
