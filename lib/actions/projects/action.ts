"use server";

import { Project } from "@/lib/interfaces/project.interface";
import prisma from "@/lib/prisma";

// THIS ACTION TO GET ALL PROJECTS
export async function getProjectsAction(): Promise<{
  success: boolean;
  data: Project[];
  error: string | null;
}> {
  try {
    const result = await prisma.project.findMany({
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

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)) as Project[],
      error: null,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      data: [],
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
        sections: true,
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
