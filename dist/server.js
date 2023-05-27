"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@16.0.3/node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config2(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config: config2,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// src/server.ts
var import_express5 = __toESM(require("express"));
var dotenv = __toESM(require_main());

// src/routes/index.ts
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

// src/server.ts
var import_cors = __toESM(require("cors"));
dotenv.config();
var app = (0, import_express5.default)();
app.use(import_express5.default.json());
app.use((0, import_cors.default)());
app.use(routes_default);
app.listen(
  Number(process.env.PORT) || 3333,
  "0.0.0.0",
  () => console.log(`Server listening on port ${process.env.PORT}`)
);
