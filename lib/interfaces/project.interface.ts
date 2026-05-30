export interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;

  projectTags: ProjectTag[];
}

interface ProjectTag {
  id: number;
  projectId: number;
  tagId: number;
  createdAt: Date;
  updatedAt: Date;
  tag: Tag;
}

interface ProjectSection {
  id: number;
  projectId: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageRight: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  media: ProjectMedia[];
}
interface ProjectMedia {
  id: number;
  projectId: number;
  sectionId?: number | null;
  url: string;
  type: string;
  cloudId: string;
  fileName?: string;
  thumbnailUrl?: string;
  order: number;
  isMain: boolean;
  createdAt: Date;
  updatedAt: Date;

  section?: ProjectSection;
}

export interface Project {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  liveUrl?: string;
  githubUrl?: string;
  techType: string; // Consider using an enum for better type safety
  projectTypes: string[]; // Consider using an enum for better type safety
  createdAt: Date;
  updatedAt: Date;
  media?: ProjectMedia[];
  sections?: ProjectSection[];
  tags?: ProjectTag[];
}
