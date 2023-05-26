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

// src/Helpers/VerifyToken.ts
var VerifyToken_exports = {};
__export(VerifyToken_exports, {
  default: () => VerifyToken_default
});
module.exports = __toCommonJS(VerifyToken_exports);
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

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/Helpers/VerifyToken.ts
var checkToken = async (req, res, next) => {
  const token = GetToken_default(req);
  const id = Number(req.params.id);
  if (!token)
    return res.status(401).send({ error: "No token provided" });
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
      return res.status(401).send({ error: "Access Denied" });
    next();
  } catch (error) {
    return res.status(500).send("Token invalido");
  }
};
var VerifyToken_default = checkToken;
