/*
  Warnings:

  - You are about to drop the column `image` on the `Blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "image",
ADD COLUMN     "imageURL" TEXT NOT NULL DEFAULT '';
