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

// THIS ACTION TO ADD A NEW PROJECT BY ADMIN
const mediaInputSchema = z.object({
  url: z.url(),
  cloudId: z.string().min(1),
  type: z.enum(["IMAGE", "VIDEO"]),
  fileName: z.string().optional(),
  thumbnailUrl: z.union([z.url(), z.literal("")]).optional(),
  order: z.number().int().min(0),
  isMain: z.boolean(),
});

const sectionInputSchema = z.object({
  title: z.string().min(1),
  titleEn: z.string().optional(),
  description: z.string().min(1),
  descriptionEn: z.string().optional(),
  imageRight: z.boolean(),
  order: z.number().int().min(0),
  media: z.array(mediaInputSchema),
});

const newProjectSchema = z.object({
  title: z.string().min(1),
  titleEn: z.string().min(1),
  description: z.string().min(1),
  descriptionEn: z.string().min(1),
  liveUrl: z.union([z.url(), z.literal("")]).optional(),
  githubUrl: z.union([z.url(), z.literal("")]).optional(),
  techType: z.enum([
    "WEB_FRONTEND",
    "WEB_BACKEND",
    "WEB_FULLSTACK",
    "MOBILE",
    "TOOL",
    "OTHER",
  ]),
  projectTypes: z
    .array(
      z.enum([
        "MARKETPLACE",
        "ECOMMERCE",
        "BLOG",
        "COMMUNITY",
        "PORTFOLIO",
        "SOCIALMEDIA",
        "TRADING",
        "PRODUCTIVITY",
        "BUSINESS",
        "UTILITY",
        "STREAMING",
        "MEDIA",
      ]),
    )
    .min(1),
  tagIds: z.array(z.number().int().positive()),
  media: z.array(mediaInputSchema),
  sections: z.array(sectionInputSchema),
});

export async function addNewProjectAction(
  input: z.infer<typeof newProjectSchema>,
): Promise<{ success: boolean; message?: string; projectId?: number }> {
  try {
    const parsed = newProjectSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, message: "Invalid project data." };
    }

    const {
      title,
      titleEn,
      description,
      descriptionEn,
      liveUrl,
      githubUrl,
      techType,
      projectTypes,
      tagIds,
      media,
      sections,
    } = parsed.data;

    // Reset sequences that may be out of sync after seeding with explicit IDs.
    // setval is non-transactional so it must run outside the $transaction block.
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SCH_PROJECT"."Project"', 'id'), COALESCE((SELECT MAX(id) FROM "SCH_PROJECT"."Project"), 0) + 1, false)`;
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SCH_PROJECT"."ProjectMedia"', 'id'), COALESCE((SELECT MAX(id) FROM "SCH_PROJECT"."ProjectMedia"), 0) + 1, false)`;
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SCH_PROJECT"."ProjectSection"', 'id'), COALESCE((SELECT MAX(id) FROM "SCH_PROJECT"."ProjectSection"), 0) + 1, false)`;
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SCH_PROJECT"."ProjectTag"', 'id'), COALESCE((SELECT MAX(id) FROM "SCH_PROJECT"."ProjectTag"), 0) + 1, false)`;

    const project = await prisma.$transaction(async (tx) => {
      // 1. Create the project
      const p = await tx.project.create({
        data: {
          title,
          titleEn,
          description,
          descriptionEn,
          liveUrl: liveUrl || null,
          githubUrl: githubUrl || null,
          techType:
            techType as import("@/app/generated/prisma/client").TechType,
          projectTypes:
            projectTypes as import("@/app/generated/prisma/client").ProjectType[],
        },
      });

      // 2. Create tag relations
      if (tagIds.length > 0) {
        await tx.projectTag.createMany({
          data: tagIds.map((tagId) => ({ projectId: p.id, tagId })),
          skipDuplicates: true,
        });
      }

      // 3. Create project-level media (no section)
      if (media.length > 0) {
        await tx.projectMedia.createMany({
          data: media.map((m) => ({
            projectId: p.id,
            sectionId: null,
            url: m.url,
            cloudId: m.cloudId,
            type: m.type as import("@/app/generated/prisma/client").ProjectMediaType,
            fileName: m.fileName || null,
            thumbnailUrl: m.thumbnailUrl || null,
            order: m.order,
            isMain: m.isMain,
          })),
        });
      }

      // 4. Create sections and their media
      for (const sec of sections) {
        const created = await tx.projectSection.create({
          data: {
            projectId: p.id,
            title: sec.title,
            titleEn: sec.titleEn || null,
            description: sec.description,
            descriptionEn: sec.descriptionEn || null,
            imageRight: sec.imageRight,
            order: sec.order,
          },
        });

        if (sec.media.length > 0) {
          await tx.projectMedia.createMany({
            data: sec.media.map((m) => ({
              projectId: p.id,
              sectionId: created.id,
              url: m.url,
              cloudId: m.cloudId,
              type: m.type as import("@/app/generated/prisma/client").ProjectMediaType,
              fileName: m.fileName || null,
              thumbnailUrl: m.thumbnailUrl || null,
              order: m.order,
              isMain: m.isMain,
            })),
          });
        }
      }

      return p;
    });

    return {
      success: true,
      projectId: project.id,
      message: "Project created successfully.",
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create project.",
    };
  }
}

// THIS ACTION TO UPDATE AN EXISTING PROJECT BY ADMIN
export async function updateProjectAction(
  projectId: number,
  input: z.infer<typeof newProjectSchema>,
): Promise<{ success: boolean; message?: string }> {
  try {
    const parsed = newProjectSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, message: "Invalid project data." };
    }

    const { title, titleEn, description, descriptionEn, liveUrl, githubUrl,
            techType, projectTypes, tagIds, media, sections } = parsed.data;

    // Reset sequences (same reason as addNewProjectAction)
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SCH_PROJECT"."ProjectMedia"', 'id'), COALESCE((SELECT MAX(id) FROM "SCH_PROJECT"."ProjectMedia"), 0) + 1, false)`;
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SCH_PROJECT"."ProjectSection"', 'id'), COALESCE((SELECT MAX(id) FROM "SCH_PROJECT"."ProjectSection"), 0) + 1, false)`;
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"SCH_PROJECT"."ProjectTag"', 'id'), COALESCE((SELECT MAX(id) FROM "SCH_PROJECT"."ProjectTag"), 0) + 1, false)`;

    await prisma.$transaction(async (tx) => {
      // 1. Update project base fields
      await tx.project.update({
        where: { id: projectId },
        data: {
          title, titleEn, description, descriptionEn,
          liveUrl: liveUrl || null,
          githubUrl: githubUrl || null,
          techType: techType as import("@/app/generated/prisma/client").TechType,
          projectTypes: projectTypes as import("@/app/generated/prisma/client").ProjectType[],
        },
      });

      // 2. Replace tags
      await tx.projectTag.deleteMany({ where: { projectId } });
      if (tagIds.length > 0) {
        await tx.projectTag.createMany({
          data: tagIds.map((tagId) => ({ projectId, tagId })),
          skipDuplicates: true,
        });
      }

      // 3. Replace all media — delete project-level media, then sections (cascade deletes section media)
      await tx.projectMedia.deleteMany({ where: { projectId, sectionId: null } });
      await tx.projectSection.deleteMany({ where: { projectId } });

      // 4. Re-create project-level media
      if (media.length > 0) {
        await tx.projectMedia.createMany({
          data: media.map((m) => ({
            projectId, sectionId: null,
            url: m.url, cloudId: m.cloudId,
            type: m.type as import("@/app/generated/prisma/client").ProjectMediaType,
            fileName: m.fileName || null,
            thumbnailUrl: m.thumbnailUrl || null,
            order: m.order, isMain: m.isMain,
          })),
        });
      }

      // 5. Re-create sections and their media
      for (const sec of sections) {
        const created = await tx.projectSection.create({
          data: {
            projectId,
            title: sec.title, titleEn: sec.titleEn || null,
            description: sec.description, descriptionEn: sec.descriptionEn || null,
            imageRight: sec.imageRight, order: sec.order,
          },
        });
        if (sec.media.length > 0) {
          await tx.projectMedia.createMany({
            data: sec.media.map((m) => ({
              projectId, sectionId: created.id,
              url: m.url, cloudId: m.cloudId,
              type: m.type as import("@/app/generated/prisma/client").ProjectMediaType,
              fileName: m.fileName || null,
              thumbnailUrl: m.thumbnailUrl || null,
              order: m.order, isMain: m.isMain,
            })),
          });
        }
      }
    });

    return { success: true, message: "Project updated successfully." };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update project.",
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
