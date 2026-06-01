import { BlogType } from "@/app/generated/prisma/enums";

export interface Post {
  id: number;
  type: BlogType;
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  readingTime: number;
  readerCount: number;
  createdAt: Date; // ISO date string
  updatedAt: Date; // ISO date string
}
