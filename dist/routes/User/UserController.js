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

// src/routes/User/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  GetMangas: () => GetMangas
});
module.exports = __toCommonJS(UserController_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetMangas
});
