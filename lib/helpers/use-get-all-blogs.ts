"use client";

import { useCallback, useState, useTransition } from "react";
import { Post } from "../interfaces/blog.interface";
import { getBlogsAction } from "../actions/blog/action";
import { PaginationResult } from "../interfaces/pagination.interface";

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
          console.error("Error fetching blogs:", message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  function handlePageChange(page: number) {
    startTransition(async () => {
      const {
        data,
        pagination: next,
        success,
        message,
      } = await getBlogsAction({
        page,
        limit: 10,
      });
      if (success) {
        setBlogs(data);
        setPagination(next ?? null);
      } else {
        console.error("Error fetching blogs:", message);
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
