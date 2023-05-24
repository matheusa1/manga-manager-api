/*
  Warnings:

  - A unique constraint covering the columns `[myAnimeListID]` on the table `manga` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "manga_myAnimeListID_key" ON "manga"("myAnimeListID");
