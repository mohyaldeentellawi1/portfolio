"use client";

import { useCallback, useState } from "react";
import { Tag } from "../interfaces/project.interface";
import { getTagsAction } from "../actions/tags/action";

export const useGetAllTags = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  const getAllTags = useCallback(async () => {
    setLoading(true);
    try {
      const { success, data } = await getTagsAction();
      if (success) setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", (error as Error).message);
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, tags, getAllTags };
};
