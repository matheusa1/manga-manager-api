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

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express4 = require("express");

// src/routes/Auth/AuthRoutes.ts
var import_express = require("express");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/Auth/AuthController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var Register = async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  if (!name || !email || !password)
    return res.status(422).send({ error: "Missing body parameter(s)" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (user)
      return res.status(409).send({ error: "User already exists" });
    const salt = await import_bcrypt.default.genSalt(12);
    const passwordHash = await import_bcrypt.default.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    });
    return res.status(201).send({
      message: "User created",
      user: { id: newUser.UserID, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
var Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ error: "Missing body parameter(s)" });
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user)
      return res.status(404).send({ error: "User not found" });
    const isPasswordValid = await import_bcrypt.default.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ error: "Invalid password" });
    const token = import_jsonwebtoken.default.sign(user, "mangaManager");
    return res.status(200).send({
      user: { id: user.UserID, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// src/routes/Auth/AuthRoutes.ts
var router = (0, import_express.Router)();
router.post("/register", Register);
router.post("/login", Login);
var AuthRoutes_default = router;

// src/routes/Mangas/MangaRoutes.ts
var import_express2 = require("express");

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
        volumesOwned: "",
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
        volumesOwned
      }
    });
    return res.status(200).send({ message: "Manga updated successfully" });
  } catch (error) {
    res.status(500).send({ error });
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
    return res.status(401).send({ error: "No token provided" });
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
      return res.status(401).send({ error: "Access Denied" });
    next();
  } catch (error) {
    return res.status(500).send("Token invalido");
  }
};
var VerifyToken_default = checkToken;

// src/routes/Mangas/MangaRoutes.ts
var router2 = (0, import_express2.Router)();
router2.post("/:id", VerifyToken_default, CreateManga);
router2.put("/:id", VerifyToken_default, updateManga);
router2.delete("/:id", VerifyToken_default, updateManga);
var MangaRoutes_default = router2;

// src/routes/User/UserRoutes.ts
var import_express3 = require("express");

// src/routes/User/UserController.ts
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

// src/routes/User/UserRoutes.ts
var router3 = (0, import_express3.Router)();
router3.get("/mangas/:id", VerifyToken_default, GetMangas);
var UserRoutes_default = router3;

// src/routes/index.ts
var router4 = (0, import_express4.Router)();
router4.use("/auth", AuthRoutes_default);
router4.use("/manga", MangaRoutes_default);
router4.use("/user", UserRoutes_default);
var routes_default = router4;
