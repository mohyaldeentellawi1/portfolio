"use client";

import { useCallback, useEffect, useState } from "react";
import { Post } from "../interfaces/blog.interface";
import { getBlogByIdAction } from "../actions/blog/action";
import { toast } from "sonner";

export const useGetBlogById = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<Post | null>(null);

  const fetchBlogById = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, data, message } = await getBlogByIdAction({ id });
      if (success && data) {
        setBlog(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setBlog(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBlogById();
    }
  }, [fetchBlogById, id]);

  return { isLoading, blog };
};
