"use server";

import { Post } from "@/lib/interfaces/blog.interface";
import { BlogType } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@/lib/interfaces/pagination.interface";

// THIS ACTION TO GET ALL BLOG POSTS
export async function getBlogsAction({
  page,
  limit,
  type,
}: {
  page?: number;
  limit?: number;
  type?: string;
}): Promise<{
  success: boolean;
  data: Post[];
  pagination?: PaginationResult | null;
  message?: string;
}> {
  const t = await getTranslations("Actions");
  try {
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
    const totalItems = await prisma.blogPost.count({
      orderBy: { createdAt: "desc" },
      where: type ? { type: type as BlogType } : undefined,
    });
    const result = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      where: type ? { type: type as BlogType } : undefined,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      include: { media: true },
    });

    const totalPages = Math.ceil(totalItems / limitNum);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)) as Post[],
      pagination: JSON.parse(
        JSON.stringify({
          currentPage: pageNum,
          limit: limitNum,
          totalPages,
          totalItems,
          next: pageNum < totalPages ? pageNum + 1 : null,
          prev: pageNum > 1 ? pageNum - 1 : null,
        }),
      ) as PaginationResult,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      success: false,
      data: [],
      message: `${t("Failedtofetchblogposts")}`,
    };
  }
}

// THIS ACTION TO GET POST COUNTS PER CATEGORY
export async function getCategoryCountsAction(): Promise<{
  success: boolean;
  data: Record<string, number>;
}> {
  try {
    const grouped = await prisma.blogPost.groupBy({
      by: ["type"],
      _count: { id: true },
    });

    const data: Record<string, number> = {};
    let total = 0;
    for (const { type, _count } of grouped) {
      data[type] = _count.id;
      total += _count.id;
    }
    data["All"] = total;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching category counts:", error);
    return { success: false, data: {} };
  }
}

// THIS ACTION TO INCREMENT READER COUNT
export async function incrementReaderCountAction({
  id,
}: {
  id: number;
}): Promise<void> {
  try {
    await prisma.blogPost.update({
      where: { id },
      data: { readerCount: { increment: 1 } },
    });
  } catch {
    // silent — not critical
  }
}

// THIS ACTION TO GET A SINGLE BLOG POST BY ID
export async function getBlogByIdAction({
  id,
}: {
  id: number;
}): Promise<{ success: boolean; data?: Post; message?: string }> {
  const t = await getTranslations("Actions");
  try {
    const result = await prisma.blogPost.findUnique({
      where: { id },
      include: { media: true },
    });

    if (!result) {
      return {
        success: false,
        message: `${t("Blogpostnotfound")}`,
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)) as Post,
    };
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    return {
      success: false,
      message: `${t("Failedtofetchblogpost")}`,
    };
  }
}
