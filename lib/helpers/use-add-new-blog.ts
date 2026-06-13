"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addNewBlogAction } from "@/lib/actions/blog/action";

function uid() {
  return Math.random().toString(36).slice(2);
}

export interface BlogMediaItem {
  _key: string;
  url: string;
  cloudId: string;
  mode: "DARK" | "LIGHT";
  order: number;
}

export function useAddNewBlog() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [type, setType] = useState("OTHER");
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [content, setContent] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const [media, setMedia] = useState<BlogMediaItem[]>([]);

  function addMedia() {
    setMedia((prev) => [
      ...prev,
      { _key: uid(), url: "", cloudId: "", mode: "LIGHT", order: prev.length },
    ]);
  }

  function removeMedia(key: string) {
    setMedia((prev) => prev.filter((m) => m._key !== key));
  }

  function updateMedia(key: string, patch: Partial<BlogMediaItem>) {
    setMedia((prev) =>
      prev.map((m) => (m._key === key ? { ...m, ...patch } : m)),
    );
  }

  function handleSubmit() {
    if (!title || !content) {
      toast.error("Title and content (AR) are required.");
      return;
    }

    startTransition(async () => {
      const result = await addNewBlogAction({
        input: {
          type,
          title,
          titleEn: titleEn || undefined,
          content,
          contentEn: contentEn || undefined,
          readingTime,
          media: media.map((m, i) => ({
            url: m.url,
            cloudId: m.cloudId,
            mode: m.mode,
            order: i,
          })),
        },
      });

      if (result.success) {
        toast.success("Blog post created.");
        router.back();
      } else {
        toast.error(result.message ?? "Something went wrong.");
      }
    });
  }

  return {
    isPending,
    type, setType,
    title, setTitle,
    titleEn, setTitleEn,
    content, setContent,
    contentEn, setContentEn,
    readingTime, setReadingTime,
    media, addMedia, removeMedia, updateMedia,
    handleSubmit,
  };
}
