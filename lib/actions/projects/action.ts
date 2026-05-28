"use server";

import { z } from "zod";
import { PaginationResult } from "@/lib/interfaces/pagination.interface";
import { Project } from "@/lib/interfaces/project.interface";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

const projectRequestSchema = z.object({
  projectType: z.string().min(1),
  vision: z.string().min(20),
  isMvp: z.boolean(),
  budget: z.string().min(1),
  timeLine: z.string().min(1),
  name: z.string().min(1),
  email: z.email(),
  note: z.string().optional().nullable(),
});

// THIS ACTION TO GET ALL PROJECTS
export async function getProjectsAction({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}): Promise<{
  success: boolean;
  data: Project[];
  pagination?: PaginationResult | null;
  error: string | null;
}> {
  try {
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 50));
    const totalItems = await prisma.project.count();
    const result = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      include: {
        media: true,
        sections: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalItems / limitNum);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)) as Project[],
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
      error: null,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      data: [],
      pagination: null,
      error: "Failed to fetch projects",
    };
  }
}

// THIS ACTION TO GET A SINGLE PROJECT BY ID
export async function getProjectByIdAction({ id }: { id: number }): Promise<{
  success: boolean;
  data: Project | null;
  error: string | null;
}> {
  try {
    const result = await prisma.project.findUnique({
      where: { id },
      include: {
        media: true,
        sections: {
          include: {
            media: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!result) {
      return {
        success: false,
        data: null,
        error: "Project not found",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)) as Project,
      error: null,
    };
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return {
      success: false,
      data: null,
      error: "Failed to fetch project",
    };
  }
}

// THIS ACTION TO ADD A NEW PROJECT REQUEST
export async function addProjectRequestAction({
  projectType,
  vision,
  isMvp,
  budget,
  timeLine,
  name,
  email,
  note,
}: {
  projectType: string;
  vision: string;
  isMvp: boolean;
  budget: string;
  timeLine: string;
  name: string;
  email: string;
  note?: string | null;
}): Promise<{
  success: boolean;
  message?: string;
}> {
  const t = await getTranslations("Actions");
  try {
    const data = projectRequestSchema.safeParse({
      projectType,
      vision,
      isMvp,
      budget,
      timeLine,
      name,
      email,
      note,
    });

    if (!data.success) {
      return {
        success: false,
      };
    }

    const res = await prisma.projectRequest.create({
      data: {
        projectType: data.data.projectType,
        vision: data.data.vision,
        isMvp: data.data.isMvp,
        budget: data.data.budget,
        timeLine: data.data.timeLine,
        name: data.data.name.trim(),
        email: data.data.email.trim(),
        note: data.data.note ? String(data.data.note).trim() : null,
      },
    });

    if (!res) {
      return {
        success: false,
        message: `${t("Failedtoaddprojectrequest")}`,
      };
    }

    return {
      success: true,
      message: `${t("Projectrequestadded")}`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : `${t("Anerroroccurred")}`,
    };
  }
}
