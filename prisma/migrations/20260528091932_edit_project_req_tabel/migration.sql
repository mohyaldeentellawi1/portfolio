/*
  Warnings:

  - Changed the type of `projectType` on the `ProjectRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SCH_PROJECT"."ProjectRequest" DROP COLUMN "projectType",
ADD COLUMN     "projectType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "SCH_PROJECT"."ProjectTypeForRequest";
