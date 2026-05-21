-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_PROJECT";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_REVIEW";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "SCH_USER";

-- CreateEnum
CREATE TYPE "SCH_PROJECT"."ProjectType" AS ENUM ('MARKETPLACE', 'ECOMMERCE', 'BLOG', 'COMMUNITY', 'PORTFOLIO', 'SOCIALMEDIA', 'TRADING');

-- CreateEnum
CREATE TYPE "SCH_PROJECT"."TechType" AS ENUM ('WEB_FRONTEND', 'WEB_BACKEND', 'WEB_FULLSTACK', 'MOBILE', 'OTHER');

-- CreateEnum
CREATE TYPE "SCH_PROJECT"."ProjectMediaType" AS ENUM ('IMAGE', 'VIDEO');

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
CREATE TABLE "SCH_PROJECT"."Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "liveUrl" TEXT,
    "techType" "SCH_PROJECT"."TechType" NOT NULL DEFAULT 'OTHER',
    "projectType" "SCH_PROJECT"."ProjectType" NOT NULL DEFAULT 'MARKETPLACE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_PROJECT"."ProjectTag" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCH_PROJECT"."ProjectMedia" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" "SCH_PROJECT"."ProjectMediaType" NOT NULL DEFAULT 'IMAGE',
    "cloudId" TEXT NOT NULL,
    "fileName" TEXT,
    "thumbnailUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMedia_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "ProjectTag_projectId_tagId_key" ON "SCH_PROJECT"."ProjectTag"("projectId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_key" ON "SCH_REVIEW"."Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "SCH_USER"."Subscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "SCH_USER"."Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "SCH_USER"."User"("email");

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
