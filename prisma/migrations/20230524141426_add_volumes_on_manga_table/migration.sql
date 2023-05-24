/*
  Warnings:

  - Added the required column `volumes` to the `manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumesOwned` to the `manga` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_manga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "volumes" INTEGER NOT NULL,
    "volumesOwned" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "manga_id_fkey" FOREIGN KEY ("id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_manga" ("createdAt", "id", "image_url", "title", "updatedAt") SELECT "createdAt", "id", "image_url", "title", "updatedAt" FROM "manga";
DROP TABLE "manga";
ALTER TABLE "new_manga" RENAME TO "manga";
CREATE UNIQUE INDEX "manga_id_key" ON "manga"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
