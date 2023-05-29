"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/Mangas/MangaRoutes.ts
var MangaRoutes_exports = {};
__export(MangaRoutes_exports, {
  default: () => MangaRoutes_default
});
module.exports = __toCommonJS(MangaRoutes_exports);
var import_express = require("express");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/Mangas/MangaController.ts
var CreateManga = async (req, res) => {
  const id = Number(req.params.id);
  const { title, image_url, volumes, myAnimeListID } = req.body;
  if (!title || !image_url || !volumes || !myAnimeListID)
    return res.status(422).send({ error: "Missing body parameter" });
  try {
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
      return res.status(409).send({ error: "Manga already exists" });
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
  const MangaID = Number(req.params.MangaID);
  const id = Number(req.params.id);
  if (!MangaID)
    return res.status(400).send({ error: "Missing id parameter" });
  try {
    const manga = await prisma.manga.findMany({
      where: {
        myAnimeListID: MangaID,
        user: {
          UserID: id
        }
      }
    });
    if (manga.length < 1)
      return res.status(404).send({ error: "Manga doesnt exist" });
    await prisma.manga.delete({
      where: {
        MangaID: manga[0].MangaID
      }
    });
    return res.status(200).send({ message: "Manga deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// src/Helpers/VerifyToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/Helpers/GetToken.ts
var getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== void 0) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  return null;
};
var GetToken_default = getToken;

// src/Helpers/VerifyToken.ts
var checkToken = async (req, res, next) => {
  const token = GetToken_default(req);
  const id = Number(req.params.id);
  if (!token)
    return res.status(401).send({ error: "Invalid Token" });
  try {
    const verified = import_jsonwebtoken.default.verify(token, "mangaManager");
    const user = prisma.user.findUnique({
      where: {
        //eslint-disable-next-line
        //@ts-ignore
        UserID: verified.id
      }
    });
    if (!user)
      return res.status(401).send({ error: "Invalid Token" });
    if (id !== verified.UserID)
      return res.status(403).send({ error: "Access Denied" });
    next();
  } catch (error) {
    return res.status(500).send({ error });
  }
};
var VerifyToken_default = checkToken;

// src/routes/Mangas/MangaRoutes.ts
var router = (0, import_express.Router)();
router.post("/:id", VerifyToken_default, CreateManga);
router.put("/:id", VerifyToken_default, updateManga);
router.delete("/:id/:MangaID", VerifyToken_default, deleteManga);
var MangaRoutes_default = router;
