-- CreateEnum
CREATE TYPE "SCH_BLOG"."BlogMediaType" AS ENUM ('NORMAL', 'FEATURED');

-- AlterTable
ALTER TABLE "SCH_BLOG"."BlogPost" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "SCH_BLOG"."BlogPostMedia" (
    "id" SERIAL NOT NULL,
    "blogPostId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "cloudId" TEXT NOT NULL,
    "type" "SCH_BLOG"."BlogMediaType" NOT NULL DEFAULT 'NORMAL',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPostMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SCH_BLOG"."BlogPostMedia" ADD CONSTRAINT "BlogPostMedia_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "SCH_BLOG"."BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
