"use server";

import { Tag } from "@/lib/interfaces/project.interface";
import prisma from "@/lib/prisma";

// THIS ACTION TO GET ALL THE TAGS
export async function getTagsAction(): Promise<{
  success: boolean;
  data: Tag[];
  message?: string;
}> {
  try {
    const res = await prisma.tag.findMany();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(res)) as Tag[],
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: (error as Error).message,
    };
  }
}
