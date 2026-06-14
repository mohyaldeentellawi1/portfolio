"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addNewBlogAction, getBlogByIdAction, updateBlogAction } from "@/lib/actions/blog/action";
import { Post } from "@/lib/interfaces/blog.interface";

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

export function useEditBlog(blogId: number) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState<Post | null>(null);

  const [type, setType] = useState("OTHER");
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [content, setContent] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const [media, setMedia] = useState<BlogMediaItem[]>([]);

  useEffect(() => {
    if (!blogId) return;
    setIsLoading(true);
    getBlogByIdAction({ id: blogId }).then(({ success, data }) => {
      if (!success || !data) { setIsLoading(false); return; }
      setBlog(data);
      setType(data.type);
      setTitle(data.title);
      setTitleEn(data.titleEn ?? "");
      setContent(data.content);
      setContentEn(data.contentEn ?? "");
      setReadingTime(data.readingTime);
      setMedia(
        [...data.media]
          .sort((a, b) => a.order - b.order)
          .map((m) => ({
            _key: uid(),
            url: m.url,
            cloudId: m.cloudId,
            mode: m.mode as "DARK" | "LIGHT",
            order: m.order,
          })),
      );
      setIsLoading(false);
    });
  }, [blogId]);

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
      const result = await updateBlogAction({
        blogId,
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
        toast.success("Blog post updated.");
        router.back();
      } else {
        toast.error(result.message ?? "Something went wrong.");
      }
    });
  }

  return {
    blog, isLoading, isPending,
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
