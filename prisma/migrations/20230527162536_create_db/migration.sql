-- CreateTable
CREATE TABLE "user" (
    "UserID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "manga" (
    "MangaID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "volumes" INTEGER NOT NULL,
    "volumesOwned" INTEGER[],
    "myAnimeListID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRelation" INTEGER DEFAULT 0,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("MangaID")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_UserID_key" ON "user"("UserID");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "manga_MangaID_key" ON "manga"("MangaID");

-- AddForeignKey
ALTER TABLE "manga" ADD CONSTRAINT "manga_userRelation_fkey" FOREIGN KEY ("userRelation") REFERENCES "user"("UserID") ON DELETE SET NULL ON UPDATE CASCADE;
