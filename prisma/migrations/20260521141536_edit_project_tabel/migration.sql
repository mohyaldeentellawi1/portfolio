/*
  Warnings:

  - You are about to drop the column `projectType` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SCH_PROJECT"."Project" DROP COLUMN "projectType",
ADD COLUMN     "projectTypes" "SCH_PROJECT"."ProjectType"[];
