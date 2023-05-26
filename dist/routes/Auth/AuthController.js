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

// src/routes/Auth/AuthController.ts
var AuthController_exports = {};
__export(AuthController_exports, {
  Login: () => Login,
  Register: () => Register
});
module.exports = __toCommonJS(AuthController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Login,
  Register
});
