"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  addNewProjectAction,
  getProjectByIdAction,
  updateProjectAction,
} from "../actions/projects/action";
import { Project } from "../interfaces/project.interface";

export interface MediaItem {
  _key: string;
  url: string;
  cloudId: string;
  type: "IMAGE" | "VIDEO";
  fileName: string;
  thumbnailUrl: string;
  order: number;
  isMain: boolean;
}

export interface SectionItem {
  _key: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  imageRight: boolean;
  order: number;
  media: MediaItem[];
  collapsed: boolean;
}

function uid() {
  return Math.random().toString(36).slice(2);
}

export function emptyMedia(order = 0): MediaItem {
  return {
    _key: uid(),
    url: "",
    cloudId: "",
    type: "IMAGE",
    fileName: "",
    thumbnailUrl: "",
    order,
    isMain: false,
  };
}

function emptySection(order = 0): SectionItem {
  return {
    _key: uid(),
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    imageRight: true,
    order,
    media: [],
    collapsed: false,
  };
}

function toMediaItem(m: {
  url: string;
  cloudId: string;
  type: string;
  fileName?: string;
  thumbnailUrl?: string;
  order: number;
  isMain: boolean;
}): MediaItem {
  return {
    _key: uid(),
    url: m.url,
    cloudId: m.cloudId,
    type: m.type === "VIDEO" ? "VIDEO" : "IMAGE",
    fileName: m.fileName ?? "",
    thumbnailUrl: m.thumbnailUrl ?? "",
    order: m.order,
    isMain: m.isMain,
  };
}

export const useAddNewProject = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [techType, setTechType] = useState<string>("OTHER");
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [sections, setSections] = useState<SectionItem[]>([]);

  function toggleProjectType(type: string) {
    setProjectTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  function toggleTag(id: number) {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  function addSection() {
    setSections((prev) => [...prev, emptySection(prev.length)]);
  }

  function removeSection(key: string) {
    setSections((prev) => prev.filter((s) => s._key !== key));
  }

  function updateSection(key: string, patch: Partial<SectionItem>) {
    setSections((prev) =>
      prev.map((s) => (s._key === key ? { ...s, ...patch } : s)),
    );
  }

  function toggleSectionCollapse(key: string) {
    setSections((prev) =>
      prev.map((s) => (s._key === key ? { ...s, collapsed: !s.collapsed } : s)),
    );
  }

  async function handleSubmit() {
    if (!title || !titleEn || !description || !descriptionEn) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (projectTypes.length === 0) {
      toast.error("Select at least one project type.");
      return;
    }

    startTransition(async () => {
      const result = await addNewProjectAction({
        input: {
          title,
          titleEn,
          description,
          descriptionEn,
          liveUrl: liveUrl || undefined,
          githubUrl: githubUrl || undefined,
          techType: techType as never,
          projectTypes: projectTypes as never,
          tagIds,
          media: media.map((m) => ({
            url: m.url,
            cloudId: m.cloudId,
            type: m.type,
            fileName: m.fileName || undefined,
            thumbnailUrl: m.thumbnailUrl || undefined,
            order: m.order,
            isMain: m.isMain,
          })),
          sections: sections.map((s) => ({
            title: s.title,
            titleEn: s.titleEn || undefined,
            description: s.description,
            descriptionEn: s.descriptionEn || undefined,
            imageRight: s.imageRight,
            order: s.order,
            media: s.media.map((m) => ({
              url: m.url,
              cloudId: m.cloudId,
              type: m.type,
              fileName: m.fileName || undefined,
              thumbnailUrl: m.thumbnailUrl || undefined,
              order: m.order,
              isMain: m.isMain,
            })),
          })),
        },
      });

      if (result.success) {
        toast.success("Project created successfully");
        router.back();
      } else {
        toast.error(result.message ?? "Something went wrong.");
      }
    });
  }

  return {
    isPending,
    title,
    setTitle,
    titleEn,
    setTitleEn,
    description,
    setDescription,
    descriptionEn,
    setDescriptionEn,
    liveUrl,
    setLiveUrl,
    githubUrl,
    setGithubUrl,
    techType,
    setTechType,
    projectTypes,
    toggleProjectType,
    tagIds,
    toggleTag,
    media,
    setMedia,
    sections,
    addSection,
    removeSection,
    updateSection,
    toggleSectionCollapse,
    handleSubmit,
  };
};

export const useEditProject = (projectId: number) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  // ── Form state ──
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [techType, setTechType] = useState("OTHER");
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [sections, setSections] = useState<SectionItem[]>([]);

  useEffect(() => {
    if (!projectId) return;
    setIsLoading(true);
    getProjectByIdAction({ id: Number(projectId) }).then(({ data }) => {
      if (!data) {
        setIsLoading(false);
        return;
      }
      setProject(data);

      // Pre-fill basic fields
      setTitle(data.title);
      setTitleEn(data.titleEn);
      setDescription(data.description);
      setDescriptionEn(data.descriptionEn);
      setLiveUrl(data.liveUrl ?? "");
      setGithubUrl(data.githubUrl ?? "");
      setTechType(data.techType);
      setProjectTypes(data.projectTypes);
      setTagIds((data.tags ?? []).map((pt) => pt.tagId));

      // Project-level media (no section)
      const sectionMediaIds = new Set(
        (data.sections ?? []).flatMap((s) => s.media.map((m) => m.id)),
      );
      setMedia(
        (data.media ?? [])
          .filter((m) => !sectionMediaIds.has(m.id))
          .map(toMediaItem),
      );

      // Sections
      setSections(
        (data.sections ?? []).map((s) => ({
          _key: uid(),
          title: s.title,
          titleEn: s.titleEn ?? "",
          description: s.description,
          descriptionEn: s.descriptionEn ?? "",
          imageRight: s.imageRight,
          order: s.order,
          media: s.media.map(toMediaItem),
          collapsed: true,
        })),
      );

      setIsLoading(false);
    });
  }, [projectId]);

  function toggleProjectType(type: string) {
    setProjectTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  function toggleTag(id: number) {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  function addSection() {
    setSections((prev) => [...prev, emptySection(prev.length)]);
  }
  function removeSection(key: string) {
    setSections((prev) => prev.filter((s) => s._key !== key));
  }
  function updateSection(key: string, patch: Partial<SectionItem>) {
    setSections((prev) =>
      prev.map((s) => (s._key === key ? { ...s, ...patch } : s)),
    );
  }
  function toggleSectionCollapse(key: string) {
    setSections((prev) =>
      prev.map((s) => (s._key === key ? { ...s, collapsed: !s.collapsed } : s)),
    );
  }

  async function handleSubmit() {
    if (!title || !titleEn || !description || !descriptionEn) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (projectTypes.length === 0) {
      toast.error("Select at least one project type.");
      return;
    }

    startTransition(async () => {
      const result = await updateProjectAction({
        projectId: Number(projectId),
        input: {
          title,
          titleEn,
          description,
          descriptionEn,
          liveUrl: liveUrl || undefined,
          githubUrl: githubUrl || undefined,
          techType: techType as never,
          projectTypes: projectTypes as never,
          tagIds,
          media: media.map((m) => ({
            url: m.url,
            cloudId: m.cloudId,
            type: m.type,
            fileName: m.fileName || undefined,
            thumbnailUrl: m.thumbnailUrl || undefined,
            order: m.order,
            isMain: m.isMain,
          })),
          sections: sections.map((s) => ({
            title: s.title,
            titleEn: s.titleEn || undefined,
            description: s.description,
            descriptionEn: s.descriptionEn || undefined,
            imageRight: s.imageRight,
            order: s.order,
            media: s.media.map((m) => ({
              url: m.url,
              cloudId: m.cloudId,
              type: m.type,
              fileName: m.fileName || undefined,
              thumbnailUrl: m.thumbnailUrl || undefined,
              order: m.order,
              isMain: m.isMain,
            })),
          })),
        },
      });

      if (result.success) {
        toast.success("Project updated successfully");
        router.back();
      } else {
        toast.error(result.message ?? "Something went wrong.");
      }
    });
  }

  return {
    project,
    router,
    isLoading,
    isPending,
    title,
    setTitle,
    titleEn,
    setTitleEn,
    description,
    setDescription,
    descriptionEn,
    setDescriptionEn,
    liveUrl,
    setLiveUrl,
    githubUrl,
    setGithubUrl,
    techType,
    setTechType,
    projectTypes,
    toggleProjectType,
    tagIds,
    toggleTag,
    media,
    setMedia,
    sections,
    addSection,
    removeSection,
    updateSection,
    toggleSectionCollapse,
    handleSubmit,
  };
};
