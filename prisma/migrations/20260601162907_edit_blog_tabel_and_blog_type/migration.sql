-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SCH_BLOG"."BlogType" ADD VALUE 'MOBILE';
ALTER TYPE "SCH_BLOG"."BlogType" ADD VALUE 'SOFTWARE_ENGINEERING';
ALTER TYPE "SCH_BLOG"."BlogType" ADD VALUE 'PRODUCT_DEVELOPMENT';
ALTER TYPE "SCH_BLOG"."BlogType" ADD VALUE 'CAREER';
ALTER TYPE "SCH_BLOG"."BlogType" ADD VALUE 'CASE_STUDY';

-- AlterTable
ALTER TABLE "SCH_BLOG"."BlogPost" ADD COLUMN     "readingTime" INTEGER NOT NULL DEFAULT 0;
