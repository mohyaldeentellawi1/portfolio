/*
  Warnings:

  - You are about to drop the column `email` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_BLOG";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_MESSAGE";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_SUBSCRIPTION";

-- CreateEnum
CREATE TYPE "SCH_PROJECT"."ProjectTypeForRequest" AS ENUM ('MARKETPLACE', 'ECOMMERCE', 'BLOG', 'PORTFOLIO', 'MEDIA', 'OTHER');

-- CreateEnum
CREATE TYPE "SCH_BLOG"."BlogType" AS ENUM ('FRONTEND', 'BACKEND', 'FLUTTER', 'DEVOPS', 'AI', 'OTHER');

-- DropForeignKey
ALTER TABLE "SCH_REVIEW"."Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "SCH_USER"."Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropIndex
DROP INDEX "SCH_REVIEW"."Review_userId_key";

-- AlterTable
ALTER TABLE "SCH_REVIEW"."Review" DROP COLUMN "email",
DROP COLUMN "userId";

-- DropTable
DROP TABLE "SCH_USER"."Subscription";

-- DropTable
DROP TABLE "SCH_USER"."User";

-- CreateTable
CREATE TABLE "SCH_PROJECT"."ProjectRequest" (
    "id" SERIAL NOT NULL,
    "projectType" "SCH_PROJECT"."ProjectTypeForRequest" NOT NULL DEFAULT 'OTHER',
    "vision" TEXT NOT NULL,
    "timeLine" TEXT NOT NULL,
    "isMvp" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_MESSAGE"."Message" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_SUBSCRIPTION"."Subscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_BLOG"."BlogPost" (
    "id" SERIAL NOT NULL,
    "type" "SCH_BLOG"."BlogType" NOT NULL DEFAULT 'OTHER',
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "content" TEXT NOT NULL,
    "contentEn" TEXT,
    "readerCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "SCH_SUBSCRIPTION"."Subscription"("email");
