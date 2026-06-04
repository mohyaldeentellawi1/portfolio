"use server";

import { PaginationResult } from "@/lib/interfaces/pagination.interface";
import { Review } from "@/lib/interfaces/review.interface";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

const reviewSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
});

// THIS ACTION TO ADD NEW REVIEW TO THE DATABASE
export async function addNewReviewAction({
  name,
  content,
}: {
  name: string;
  content: string;
}): Promise<{ success: boolean; message?: string }> {
  const t = await getTranslations("Actions");
  try {
    const parsedData = reviewSchema.safeParse({ name, content });

    if (!parsedData.success) {
      return {
        success: false,
      };
    }

    const res = await prisma.review.create({
      data: {
        name: parsedData.data.name,
        content: parsedData.data.content,
      },
    });

    if (!res) {
      return {
        success: false,
        message: `${t("Failedtoaddreview")}`,
      };
    }

    return {
      success: true,
      message: `${t("Reviewaddedsuccessfully")}`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : `${t("Anerroroccurred")}`,
    };
  }
}

// THIS ACTION TO GET ALL REVIEWS FROM THE DATABASE
export async function getAllReviewsAction({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}): Promise<{
  success: boolean;
  data?: Review[];
  pagination?: PaginationResult | null;
  message?: string;
}> {
  const t = await getTranslations("Actions");
  try {
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 50));
    const totalItems = await prisma.review.count({
      orderBy: { createdAt: "desc" },
    });
    const result = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });

    const totalPages = Math.ceil(totalItems / limitNum);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)) as Review[],
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
    return {
      success: false,
      message:
        error instanceof Error ? error.message : `${t("Anerroroccurred")}`,
    };
  }
}
