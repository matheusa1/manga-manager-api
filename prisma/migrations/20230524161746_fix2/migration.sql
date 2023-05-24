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
    "userRelation" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "manga_userRelation_fkey" FOREIGN KEY ("userRelation") REFERENCES "user" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_manga" ("MangaID", "createdAt", "image_url", "myAnimeListID", "title", "updatedAt", "volumes", "volumesOwned") SELECT "MangaID", "createdAt", "image_url", "myAnimeListID", "title", "updatedAt", "volumes", "volumesOwned" FROM "manga";
DROP TABLE "manga";
ALTER TABLE "new_manga" RENAME TO "manga";
CREATE UNIQUE INDEX "manga_MangaID_key" ON "manga"("MangaID");
CREATE UNIQUE INDEX "manga_userRelation_key" ON "manga"("userRelation");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
