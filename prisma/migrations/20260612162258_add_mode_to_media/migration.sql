-- CreateEnum
CREATE TYPE "SCH_BLOG"."BlogMediaMode" AS ENUM ('DARK', 'LIGHT');

-- AlterTable
ALTER TABLE "SCH_BLOG"."BlogPostMedia" ADD COLUMN     "mode" "SCH_BLOG"."BlogMediaMode" NOT NULL DEFAULT 'LIGHT';
