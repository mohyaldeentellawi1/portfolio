"use server";

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

    if (res) {
      return {
        success: true,
        message: `${t("Reviewaddedsuccessfully")}`,
      };
    }

    return {
      success: false,
      message: `${t("Failedtoaddreview")}`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : `${t("Anerroroccurred")}`,
    };
  }
}
