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

// src/Helpers/GetToken.ts
var GetToken_exports = {};
__export(GetToken_exports, {
  default: () => GetToken_default
});
module.exports = __toCommonJS(GetToken_exports);
var getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== void 0) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  return null;
};
var GetToken_default = getToken;
