/*
  Warnings:

  - A unique constraint covering the columns `[notionDocsId]` on the table `Blogs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blogs_notionDocsId_key" ON "Blogs"("notionDocsId");
