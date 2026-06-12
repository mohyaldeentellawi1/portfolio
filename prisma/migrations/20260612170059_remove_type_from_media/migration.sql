/*
  Warnings:

  - You are about to drop the column `type` on the `BlogPostMedia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SCH_BLOG"."BlogPostMedia" DROP COLUMN "type";

-- DropEnum
DROP TYPE "SCH_BLOG"."BlogMediaType";
