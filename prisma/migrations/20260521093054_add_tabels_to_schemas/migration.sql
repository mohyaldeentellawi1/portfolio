/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProjectMedia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProjectMedia` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProjectTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tag` on the `ProjectTag` table. All the data in the column will be lost.
  - The `id` column on the `ProjectTag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[projectId,tagId]` on the table `ProjectTag` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `projectId` on the `ProjectMedia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `tagId` to the `ProjectTag` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `projectId` on the `ProjectTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_REVIEW";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_USER";

-- AlterEnum
ALTER TYPE "SCH_PROJECT"."ProjectType" ADD VALUE 'WEB_FULLSTACK';

-- DropForeignKey
ALTER TABLE "SCH_PROJECT"."ProjectMedia" DROP CONSTRAINT "ProjectMedia_projectId_fkey";

-- DropForeignKey
ALTER TABLE "SCH_PROJECT"."ProjectTag" DROP CONSTRAINT "ProjectTag_projectId_fkey";

-- AlterTable
ALTER TABLE "SCH_PROJECT"."Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SCH_PROJECT"."ProjectMedia" DROP CONSTRAINT "ProjectMedia_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD CONSTRAINT "ProjectMedia_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SCH_PROJECT"."ProjectTag" DROP CONSTRAINT "ProjectTag_pkey",
DROP COLUMN "tag",
ADD COLUMN     "tagId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "SCH_PROJECT"."Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_REVIEW"."Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" TEXT NOT NULL,
    "nameEn" TEXT,
    "email" TEXT,
    "content" TEXT NOT NULL,
    "contentEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_USER"."Subscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_USER"."User" (
    "id" SERIAL NOT NULL,
    "googleId" INTEGER,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "SCH_PROJECT"."Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_key" ON "SCH_REVIEW"."Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "SCH_USER"."Subscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "SCH_USER"."Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "SCH_USER"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTag_projectId_tagId_key" ON "SCH_PROJECT"."ProjectTag"("projectId", "tagId");

-- AddForeignKey
ALTER TABLE "SCH_PROJECT"."ProjectTag" ADD CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "SCH_PROJECT"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCH_PROJECT"."ProjectTag" ADD CONSTRAINT "ProjectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "SCH_PROJECT"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCH_PROJECT"."ProjectMedia" ADD CONSTRAINT "ProjectMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "SCH_PROJECT"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCH_REVIEW"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCH_USER"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SCH_USER"."Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCH_USER"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
