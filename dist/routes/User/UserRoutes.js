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

// src/routes/User/UserRoutes.ts
var UserRoutes_exports = {};
__export(UserRoutes_exports, {
  default: () => UserRoutes_default
});
module.exports = __toCommonJS(UserRoutes_exports);
var import_express = require("express");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/User/UserController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var GetMangas = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const response = await prisma.manga.findMany({
      where: {
        userRelation: id
      }
    });
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
var deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  if (!id)
    return res.status(422).send({ error: "Missing body parameter(s)" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        UserID: id
      }
    });
    if (!user)
      return res.status(404).send({ error: "User not found" });
    const mangas = await prisma.manga.findMany({
      where: {
        userRelation: id
      }
    });
    await mangas.forEach(async (manga) => {
      await prisma.manga.delete({
        where: {
          MangaID: manga.MangaID
        }
      });
    });
    const response = await prisma.user.delete({
      where: {
        UserID: id
      }
    });
    return res.status(200).send({ message: "User deleted" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
var updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, password } = req.body;
  if (!id || !name || !password)
    return res.status(422).send({ error: "Missing body parameter(s)" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        UserID: id
      }
    });
    if (!user)
      return res.status(404).send({ error: "User not found" });
    const salt = await import_bcrypt.default.genSalt(12);
    const passwordHash = await import_bcrypt.default.hash(password, salt);
    const response = await prisma.user.update({
      where: {
        UserID: id
      },
      data: {
        name,
        password: passwordHash
      }
    });
    const token = import_jsonwebtoken.default.sign(response, "mangaManager");
    return res.status(200).send({
      user: { id: response.UserID, name: response.name, email: response.email },
      token
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// src/Helpers/VerifyToken.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));

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
    const verified = import_jsonwebtoken2.default.verify(token, "mangaManager");
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

// src/routes/User/UserRoutes.ts
var router = (0, import_express.Router)();
router.get("/mangas/:id", VerifyToken_default, GetMangas);
router.delete("/:id", VerifyToken_default, deleteUser);
router.put("/:id", VerifyToken_default, updateUser);
var UserRoutes_default = router;
