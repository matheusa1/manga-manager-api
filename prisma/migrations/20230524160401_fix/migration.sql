/*
  Warnings:

  - The primary key for the `manga` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `manga` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - Added the required column `MangaID` to the `manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserID` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_manga" (
    "MangaID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "volumes" INTEGER NOT NULL,
    "volumesOwned" TEXT,
    "myAnimeListID" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "manga_MangaID_fkey" FOREIGN KEY ("MangaID") REFERENCES "user" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_manga" ("createdAt", "image_url", "myAnimeListID", "title", "updatedAt", "volumes", "volumesOwned") SELECT "createdAt", "image_url", "myAnimeListID", "title", "updatedAt", "volumes", "volumesOwned" FROM "manga";
DROP TABLE "manga";
ALTER TABLE "new_manga" RENAME TO "manga";
CREATE UNIQUE INDEX "manga_MangaID_key" ON "manga"("MangaID");
CREATE TABLE "new_user" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("createdAt", "email", "name", "password", "updatedAt") SELECT "createdAt", "email", "name", "password", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_UserID_key" ON "user"("UserID");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
