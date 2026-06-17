import { BlogMediaMode, BlogType } from "@/app/generated/prisma/enums";

export interface Post {
  id: number;
  type: BlogType;
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  excerpt?: string;
  excerptEn?: string;
  readingTime: number;
  readerCount: number;
  createdAt: Date; // ISO date string
  updatedAt: Date; // ISO date string
  media: BlogMedia[];
}

interface BlogMedia {
  id: number;
  blogPostId: number;
  url: string;
  cloudId: string;
  mode: BlogMediaMode;
  order: number;
  createdAt: Date; // ISO date string
  updatedAt: Date; // ISO date string
}
