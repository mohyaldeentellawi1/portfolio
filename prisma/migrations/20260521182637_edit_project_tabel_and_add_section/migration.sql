-- AlterTable
ALTER TABLE "SCH_PROJECT"."ProjectMedia" ADD COLUMN     "sectionId" INTEGER;

-- CreateTable
CREATE TABLE "SCH_PROJECT"."ProjectSection" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "imageRight" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SCH_PROJECT"."ProjectSection" ADD CONSTRAINT "ProjectSection_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "SCH_PROJECT"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCH_PROJECT"."ProjectMedia" ADD CONSTRAINT "ProjectMedia_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SCH_PROJECT"."ProjectSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
