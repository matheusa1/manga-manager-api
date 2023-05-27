"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/Mangas/MangaController.ts
var MangaController_exports = {};
__export(MangaController_exports, {
  CreateManga: () => CreateManga,
  deleteManga: () => deleteManga,
  updateManga: () => updateManga
});
module.exports = __toCommonJS(MangaController_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/Mangas/MangaController.ts
var CreateManga = async (req, res) => {
  const id = Number(req.params.id);
  const { title, image_url, volumes, myAnimeListID } = req.body;
  if (!title || !image_url || !volumes || !myAnimeListID)
    return res.status(400).send({ error: "Missing body parameter" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        UserID: id
      }
    });
    if (!user)
      return res.status(404).send({ error: "User not found" });
    const manga = await prisma.manga.findMany({
      where: {
        myAnimeListID,
        user: {
          UserID: id
        }
      }
    });
    console.log({ manga });
    if (manga.length > 0)
      return res.status(400).send({ error: "Manga already exists" });
    const newManga = await prisma.manga.create({
      data: {
        title,
        image_url,
        volumes,
        volumesOwned: [],
        myAnimeListID,
        user: {
          connect: {
            UserID: id
          }
        }
      }
    });
    return res.status(200).send({ manga: newManga });
  } catch (error) {
    res.status(500).send({ error });
  }
};
var updateManga = async (req, res) => {
  const { volumesOwned, MangaID } = req.body;
  if (!volumesOwned)
    return res.status(400).send({ error: "Missing volumesOwned parameter" });
  try {
    await prisma.manga.update({
      where: {
        MangaID
      },
      data: {
        volumesOwned,
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return res.status(200).send({ message: "Manga updated successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};
var deleteManga = async (req, res) => {
  const { MangaID } = req.body;
  if (!MangaID)
    return res.status(400).send({ error: "Missing id parameter" });
  try {
    await prisma.manga.delete({
      where: {
        MangaID
      }
    });
    return res.status(200).send({ message: "Manga deleted successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateManga,
  deleteManga,
  updateManga
});
