/*
  Warnings:

  - Added the required column `budget` to the `ProjectRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SCH_PROJECT"."ProjectRequest" ADD COLUMN     "budget" TEXT NOT NULL;
