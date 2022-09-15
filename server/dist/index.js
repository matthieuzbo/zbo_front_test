"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));

// src/config.ts
var config = {
  API_PORT: 8081
};

// src/resources/entities/entities.controller.ts
var import_express = require("express");

// data/users.json
var users_default = [
  {
    id: 1,
    email: "sophie_ramos@mail.com",
    role: "trader",
    firstname: "Sophie",
    lastname: "Ramos"
  },
  {
    id: 2,
    email: "remy_dijoux@mail.com",
    role: "contact",
    firstname: "R\xE9my",
    lastname: "Dijoux"
  },
  {
    id: 3,
    email: "jerome_lecomte@mail.com",
    role: "sale",
    firstname: "J\xE9r\xF4me",
    lastname: "Lecomte"
  },
  {
    id: 4,
    email: "aime_labbe-thibault@mail.com",
    role: "account-manager",
    firstname: "Aim\xE9",
    lastname: "Labbe-Thibault"
  },
  {
    id: 5,
    email: "margaret_brun@mail.com",
    role: "contact",
    firstname: "Margaret",
    lastname: "Brun"
  },
  {
    id: 6,
    email: "ines_de_marques@mail.com",
    role: "trader",
    firstname: "In\xE8s",
    lastname: "de Marques"
  },
  {
    id: 7,
    email: "sebastien_fernandez-bertrand@mail.com",
    role: "client",
    firstname: "S\xE9bastien",
    lastname: "Fernandez-Bertrand"
  },
  {
    id: 8,
    email: "edith-louise_pottier@mail.com",
    role: "account-manager",
    firstname: "\xC9dith-Louise",
    lastname: "Pottier"
  },
  {
    id: 9,
    email: "isaac_benoit_du_jean@mail.com",
    role: "trader",
    firstname: "Isaac",
    lastname: "Benoit du Jean"
  },
  {
    id: 10,
    email: "vincent_lebreton@mail.com",
    role: "sale",
    firstname: "Vincent",
    lastname: "Lebreton"
  },
  {
    id: 11,
    email: "michele_brun@mail.com",
    role: "client",
    firstname: "Mich\xE8le",
    lastname: "Brun"
  },
  {
    id: 12,
    email: "jerome_petitjean@mail.com",
    role: "trader",
    firstname: "J\xE9r\xF4me",
    lastname: "Petitjean"
  },
  {
    id: 13,
    email: "alphonse_olivier@mail.com",
    role: "client",
    firstname: "Alphonse",
    lastname: "Olivier"
  },
  {
    id: 14,
    email: "alexandria_maillet@mail.com",
    role: "account-manager",
    firstname: "Alexandria",
    lastname: "Maillet"
  },
  {
    id: 15,
    email: "louise_chevalier@mail.com",
    role: "account-manager",
    firstname: "Louise",
    lastname: "Chevalier"
  },
  {
    id: 16,
    email: "laurence_baron@mail.com",
    role: "account-manager",
    firstname: "Laurence",
    lastname: "Baron"
  },
  {
    id: 17,
    email: "renee-elodie_fontaine@mail.com",
    role: "sale",
    firstname: "Ren\xE9e-\xC9lodie",
    lastname: "Fontaine"
  },
  {
    id: 18,
    email: "colette_bertin@mail.com",
    role: "client",
    firstname: "Colette",
    lastname: "Bertin"
  },
  {
    id: 19,
    email: "laetitia_barbe@mail.com",
    role: "trader",
    firstname: "Laetitia",
    lastname: "Barbe"
  },
  {
    id: 20,
    email: "yves_thomas@mail.com",
    role: "contact",
    firstname: "Yves",
    lastname: "Thomas"
  },
  {
    id: 21,
    email: "mj2@mail.com",
    role: "account-manager",
    firstname: "Mj",
    lastname: "Jm"
  }
];

// src/resources/entities/users.service.ts
var import_fs = require("fs");
var userRoles = ["sale", "account-manager", "trader", "client", "contact"];
var UserService = class {
  constructor() {
    this.maxUser = 0;
    this.usersMap = new Map(
      users_default.map((user) => {
        return [user.id, user];
      })
    );
  }
  init() {
    this.maxUser = 0;
    for (const [id] of this.usersMap) {
      if (id > this.maxUser) {
        this.maxUser = id;
      }
    }
  }
  checkUser(user) {
    const errors = [];
    if (user.firstname.length == 0 || user.firstname.length > 55) {
      errors.push({
        field: "firstname",
        error: "invalid size (must be beetween >= 0 and < 55)"
      });
    }
    if (user.lastname.length == 0 || user.lastname.length > 55) {
      errors.push({
        field: "lastname",
        error: "invalid size (must be beetween >= 0 and < 55)"
      });
    }
    if (user.email.length == 0 || user.email.length > 55) {
      errors.push({
        field: "email",
        error: "invalid size (must be beetween >= 0 and < 55)"
      });
    }
    if (!userRoles.includes(user.role)) {
      errors.push({ field: "role", error: "invalid value" });
    }
    return errors;
  }
  findAll() {
    return Array.from(this.usersMap.values());
  }
  findOne(id) {
    return this.usersMap.get(id);
  }
  create(user) {
    user.id = 0;
    if (this.usersMap.get(user.id)) {
      return user;
    }
    this.maxUser++;
    user.id = this.maxUser;
    this.usersMap.set(user.id, user);
    (0, import_fs.writeFileSync)(
      "./data/users.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w"
      }
    );
    return user;
  }
  update(user) {
    this.usersMap.set(user.id, user);
    (0, import_fs.writeFileSync)(
      "./data/users.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w"
      }
    );
    return user;
  }
};
var userService = new UserService();

// src/utils/utils.ts
var randomError = 10;
function generateError() {
  return Math.floor(Math.random() * randomError) == 0;
}

// src/utils/exceptions.ts
var invalid_value = "invalid_value";
var not_found = "not_found";
var unexpected_error = "unexpected_error";
var Exception = class {
  constructor(timestamp, status, code, detail, path, method) {
    this.timestamp = timestamp;
    this.status = status;
    this.code = code;
    this.detail = detail;
    this.path = path;
    this.method = method;
  }
};
var InvalidValueException = class extends Exception {
  constructor(path, method, detail) {
    super(
      Date.now().toString(),
      400,
      "400-" + invalid_value,
      detail != void 0 ? detail : invalid_value,
      path,
      method
    );
  }
};
var NotFoundException = class extends Exception {
  constructor(path, method) {
    super(
      Date.now().toString(),
      404,
      "404-" + not_found,
      not_found,
      path,
      method
    );
  }
};
var RandomException = class extends Exception {
  constructor(path, method) {
    super(
      Date.now().toString(),
      500,
      "500-" + unexpected_error,
      unexpected_error,
      path,
      method
    );
  }
};

// src/resources/entities/users.controller.ts
function registerController(EntitiesController2) {
  EntitiesController2.get("/users", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    res.status(200).json(userService.findAll());
  });
  EntitiesController2.get("/users/:id", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      throw new InvalidValueException(req.path, req.method, void 0);
    }
    const user = userService.findOne(id);
    if (user) {
      return res.status(200).json(user);
    }
    throw new NotFoundException(req.path, req.method);
  });
  EntitiesController2.post("/users", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    const errs = userService.checkUser(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }
    res.status(201).json(userService.create(req.body));
  });
  EntitiesController2.put("/users/:id", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      throw new InvalidValueException(req.path, req.method, void 0);
    }
    if (req.body.id != id) {
      throw new InvalidValueException(req.path, req.method, [
        { field: "id", error: "invalid id" }
      ]);
    }
    const errs = userService.checkUser(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }
    res.status(200).json(userService.update(req.body));
  });
}

// data/briefs.json
var briefs_default = [
  {
    id: 1,
    name: "NUTRAPIE - vague 3",
    startDate: "2022-06-21T12:16:04.861Z",
    endDate: "2022-08-05T12:16:04.861Z",
    budget: 894.36,
    amId: null,
    traderId: null,
    status: "ending"
  },
  {
    id: 2,
    name: "Anti-Slip Treatment - vague 3",
    startDate: "2022-05-10T12:16:04.861Z",
    endDate: "2022-06-18T12:16:04.861Z",
    budget: 311.52,
    amId: 1,
    traderId: 10,
    status: "ending"
  },
  {
    id: 3,
    name: "Maxonaut - vague 3",
    startDate: "2022-07-14T12:16:04.861Z",
    endDate: "2022-08-04T12:16:04.861Z",
    budget: 896.99,
    amId: 2,
    traderId: 8,
    status: "to_setup"
  },
  {
    id: 4,
    name: "IMPERA - vague 3",
    startDate: "2022-05-15T12:16:04.861Z",
    endDate: "2022-07-02T12:16:04.861Z",
    budget: 954.95,
    amId: null,
    traderId: 19,
    status: "ending"
  },
  {
    id: 5,
    name: "Comnirex - vague 3",
    startDate: "2022-08-06T12:16:04.861Z",
    endDate: "2022-08-22T12:16:04.861Z",
    budget: 755.82,
    amId: 3,
    traderId: 12,
    status: "ending"
  },
  {
    id: 6,
    name: "LONDON PUFFS - vague 3",
    startDate: "2022-06-06T12:16:04.861Z",
    endDate: "2022-06-10T12:16:04.861Z",
    budget: 644.54,
    amId: 16,
    traderId: 2,
    status: "to_setup"
  },
  {
    id: 7,
    name: "GOURMENU - vague 3",
    startDate: "2022-06-16T12:16:04.861Z",
    endDate: "2022-08-14T12:16:04.861Z",
    budget: 187.25,
    amId: 3,
    traderId: 2,
    status: "to_setup"
  },
  {
    id: 8,
    name: "H SELECTION - vague 3",
    startDate: "2022-06-25T12:16:04.861Z",
    endDate: "2022-08-02T12:16:04.861Z",
    budget: 625.1,
    amId: 15,
    traderId: 7,
    status: "to_assign"
  },
  {
    id: 9,
    name: "Circule Ecotrain - vague 3",
    startDate: "2022-06-25T12:16:04.861Z",
    endDate: "2022-07-08T12:16:04.861Z",
    budget: 399.98,
    amId: 7,
    traderId: null,
    status: "to_assign"
  },
  {
    id: 10,
    name: "WOW - vague 3",
    startDate: "2022-07-24T12:16:04.861Z",
    endDate: "2022-09-06T12:16:04.861Z",
    budget: 915.82,
    amId: 17,
    traderId: 12,
    status: "to_setup"
  },
  {
    id: 11,
    name: "INNOJOA - vague 3",
    startDate: "2022-06-05T12:16:04.861Z",
    endDate: "2022-06-05T12:16:04.861Z",
    budget: 26.27,
    amId: 4,
    traderId: 16,
    status: "report_to_send"
  },
  {
    id: 12,
    name: "MOUSTACHE ARTISAN GLACIER - vague 3",
    startDate: "2022-07-12T12:16:04.861Z",
    endDate: "2022-09-06T12:16:04.861Z",
    budget: 814.39,
    amId: 2,
    traderId: null,
    status: "ending"
  },
  {
    id: 13,
    name: "Vesabuild - vague 3",
    startDate: "2022-07-01T12:16:04.861Z",
    endDate: "2022-08-06T12:16:04.861Z",
    budget: 150.96,
    amId: 9,
    traderId: 3,
    status: "production"
  },
  {
    id: 14,
    name: "GRIMVALLON - vague 3",
    startDate: "2022-06-25T12:16:04.861Z",
    endDate: "2022-07-06T12:16:04.861Z",
    budget: 25.19,
    amId: 14,
    traderId: 15,
    status: "production"
  },
  {
    id: 15,
    name: "NATURA VILLAGE \u2013 Vilamoura - vague 3",
    startDate: "2022-06-29T12:16:04.861Z",
    endDate: "2022-07-05T12:16:04.861Z",
    budget: 552.58,
    amId: 19,
    traderId: 14,
    status: "to_setup"
  },
  {
    id: 16,
    name: "Beat the Beat - vague 3",
    startDate: "2022-07-13T12:16:04.861Z",
    endDate: "2022-09-06T12:16:04.861Z",
    budget: 130.41,
    amId: 8,
    traderId: 17,
    status: "ending"
  },
  {
    id: 17,
    name: "NOVA THERM - vague 3",
    startDate: "2022-07-24T12:16:04.861Z",
    endDate: "2022-09-06T12:16:04.861Z",
    budget: 76.19,
    amId: 8,
    traderId: 18,
    status: "report_to_send"
  },
  {
    id: 18,
    name: "WebOpti - vague 3",
    startDate: "2022-06-15T12:16:04.861Z",
    endDate: "2022-06-22T12:16:04.861Z",
    budget: 512.78,
    amId: 4,
    traderId: 12,
    status: "to_setup"
  },
  {
    id: 19,
    name: "Maestro - vague 3",
    startDate: "2022-07-28T12:16:04.861Z",
    endDate: "2022-09-22T12:16:04.861Z",
    budget: 12.83,
    amId: 13,
    traderId: null,
    status: "to_assign"
  },
  {
    id: 20,
    name: "Meditation Invest - vague 3",
    startDate: "2022-06-12T12:16:04.861Z",
    endDate: "2022-06-15T12:16:04.861Z",
    budget: 253,
    amId: null,
    traderId: 10,
    status: "to_assign"
  },
  {
    id: 21,
    name: "LOSANZ beauty - vague 3",
    startDate: "2022-07-04T12:16:04.861Z",
    endDate: "2022-07-21T12:16:04.861Z",
    budget: 999.16,
    amId: null,
    traderId: 6,
    status: "ending"
  },
  {
    id: 22,
    name: "Tintenheld - vague 3",
    startDate: "2022-06-11T12:16:04.861Z",
    endDate: "2022-07-30T12:16:04.861Z",
    budget: 250.76,
    amId: 20,
    traderId: null,
    status: "production"
  },
  {
    id: 23,
    name: "Snito - vague 3",
    startDate: "2022-07-16T12:16:04.861Z",
    endDate: "2022-08-14T12:16:04.861Z",
    budget: 645.83,
    amId: 3,
    traderId: 13,
    status: "production"
  },
  {
    id: 24,
    name: "INIMINI - vague 3",
    startDate: "2022-05-06T12:16:04.861Z",
    endDate: "2022-05-21T12:16:04.861Z",
    budget: 900.28,
    amId: 2,
    traderId: null,
    status: "to_setup"
  },
  {
    id: 25,
    name: "F - vague 3",
    startDate: "2022-08-05T12:16:04.861Z",
    endDate: "2022-09-30T12:16:04.861Z",
    budget: 428.69,
    amId: 20,
    traderId: null,
    status: "ending"
  },
  {
    id: 26,
    name: "CRYO C-LIFE 21 - vague 3",
    startDate: "2022-06-27T12:16:04.861Z",
    endDate: "2022-07-02T12:16:04.861Z",
    budget: 625.84,
    amId: 4,
    traderId: 11,
    status: "production"
  },
  {
    id: 27,
    name: "FONTANARA - vague 3",
    startDate: "2022-06-02T12:16:04.861Z",
    endDate: "2022-07-02T12:16:04.861Z",
    budget: 247.84,
    amId: 1,
    traderId: 6,
    status: "report_to_send"
  },
  {
    id: 28,
    name: "CINQUE FOGLIE - vague 3",
    startDate: "2022-06-19T12:16:04.861Z",
    endDate: "2022-07-15T12:16:04.861Z",
    budget: 96.93,
    amId: 8,
    traderId: 11,
    status: "to_setup"
  },
  {
    id: 29,
    name: "ENJOY PHOENIX - vague 3",
    startDate: "2022-06-09T12:16:04.861Z",
    endDate: "2022-07-13T12:16:04.861Z",
    budget: 332.06,
    amId: 15,
    traderId: 12,
    status: "report_to_send"
  },
  {
    id: 30,
    name: "Alinwave - vague 3",
    startDate: "2022-06-12T12:16:04.861Z",
    endDate: "2022-07-27T12:16:04.861Z",
    budget: 309.55,
    amId: 18,
    traderId: null,
    status: "to_assign"
  },
  {
    id: 31,
    name: "- vague 3",
    startDate: "2022-07-27T12:16:04.861Z",
    endDate: "2022-08-09T12:16:04.861Z",
    budget: 18.71,
    amId: 13,
    traderId: null,
    status: "report_to_send"
  },
  {
    id: 32,
    name: "STEAKHOLDER FOOD - vague 3",
    startDate: "2022-05-31T12:16:04.861Z",
    endDate: "2022-07-01T12:16:04.861Z",
    budget: 42.92,
    amId: 18,
    traderId: 6,
    status: "to_assign"
  },
  {
    id: 33,
    name: "HTC GLOBAL SERVICES - vague 3",
    startDate: "2022-06-11T12:16:04.861Z",
    endDate: "2022-08-03T12:16:04.861Z",
    budget: 261.18,
    amId: 17,
    traderId: 1,
    status: "production"
  },
  {
    id: 34,
    name: "Dot.Weighing - vague 3",
    startDate: "2022-08-31T12:16:04.861Z",
    endDate: "2022-10-27T12:16:04.861Z",
    budget: 643.2,
    amId: 6,
    traderId: null,
    status: "production"
  },
  {
    id: 35,
    name: "Quanta ENERGY - vague 3",
    startDate: "2022-06-01T12:16:04.861Z",
    endDate: "2022-06-08T12:16:04.861Z",
    budget: 351.13,
    amId: 9,
    traderId: 17,
    status: "to_setup"
  },
  {
    id: 36,
    name: "TIMANA - vague 3",
    startDate: "2022-06-13T12:16:04.861Z",
    endDate: "2022-07-30T12:16:04.861Z",
    budget: 228.92,
    amId: 9,
    traderId: null,
    status: "ending"
  },
  {
    id: 37,
    name: "WANM! CHE PIZZA - vague 3",
    startDate: "2022-07-23T12:16:04.861Z",
    endDate: "2022-08-22T12:16:04.861Z",
    budget: 207.94,
    amId: 14,
    traderId: 8,
    status: "to_setup"
  },
  {
    id: 38,
    name: "RIDER CONNECT - vague 3",
    startDate: "2022-07-19T12:16:04.861Z",
    endDate: "2022-08-16T12:16:04.861Z",
    budget: 953.26,
    amId: 7,
    traderId: null,
    status: "to_setup"
  },
  {
    id: 39,
    name: "Berg san mei dahoam - vague 3",
    startDate: "2022-06-12T12:16:04.861Z",
    endDate: "2022-08-03T12:16:04.861Z",
    budget: 710.74,
    amId: 16,
    traderId: 1,
    status: "to_setup"
  },
  {
    id: 40,
    name: "LES VIGNOBLES D\u2019EXEA - vague 3",
    startDate: "2022-07-21T12:16:04.861Z",
    endDate: "2022-08-11T12:16:04.861Z",
    budget: 975.9,
    amId: 12,
    traderId: 14,
    status: "production"
  },
  {
    id: 41,
    name: "A.S.S.E.S.S. - vague 3",
    startDate: "2022-05-14T12:16:04.861Z",
    endDate: "2022-07-02T12:16:04.861Z",
    budget: 669.71,
    amId: 9,
    traderId: 11,
    status: "production"
  },
  {
    id: 42,
    name: "WW WIDZISZWSZYSTKO.PL MONITORING GPS POJAZD\xD3W - vague 3",
    startDate: "2022-08-16T12:16:04.861Z",
    endDate: "2022-09-21T12:16:04.861Z",
    budget: 509.87,
    amId: 15,
    traderId: 20,
    status: "ending"
  },
  {
    id: 43,
    name: "Zero Connect - vague 3",
    startDate: "2022-07-11T12:16:04.861Z",
    endDate: "2022-08-29T12:16:04.861Z",
    budget: 409.42,
    amId: 6,
    traderId: 20,
    status: "to_assign"
  },
  {
    id: 44,
    name: "SxPREVENTIVE - vague 3",
    startDate: "2022-07-15T12:16:04.861Z",
    endDate: "2022-07-21T12:16:04.861Z",
    budget: 926.41,
    amId: 8,
    traderId: 6,
    status: "ending"
  },
  {
    id: 45,
    name: "RAPALA ELITE - vague 3",
    startDate: "2022-07-07T12:16:04.861Z",
    endDate: "2022-07-25T12:16:04.861Z",
    budget: 4.88,
    amId: 8,
    traderId: 2,
    status: "production"
  },
  {
    id: 46,
    name: "RE-SSENTIEL - vague 3",
    startDate: "2022-06-24T12:16:04.861Z",
    endDate: "2022-07-04T12:16:04.861Z",
    budget: 43,
    amId: 6,
    traderId: 15,
    status: "ending"
  },
  {
    id: 47,
    name: "MPM - vague 3",
    startDate: "2022-07-11T12:16:04.861Z",
    endDate: "2022-08-09T12:16:04.861Z",
    budget: 260.12,
    amId: 5,
    traderId: 11,
    status: "production"
  },
  {
    id: 48,
    name: "ANVIL - vague 3",
    startDate: "2022-06-15T12:16:04.861Z",
    endDate: "2022-07-28T12:16:04.861Z",
    budget: 362.33,
    amId: 20,
    traderId: 19,
    status: "ending"
  },
  {
    id: 49,
    name: "SOPHOMER - vague 3",
    startDate: "2022-08-21T12:16:04.861Z",
    endDate: "2022-10-13T12:16:04.861Z",
    budget: 657.51,
    amId: 9,
    traderId: 7,
    status: "report_to_send"
  },
  {
    id: 50,
    name: "COYOTE SECURE & DRIVE - vague 3",
    startDate: "2022-06-28T12:16:04.861Z",
    endDate: "2022-07-10T12:16:04.861Z",
    budget: 455.44,
    amId: 15,
    traderId: 14,
    status: "production"
  }
];

// src/resources/entities/briefs.service.ts
var import_fs2 = require("fs");
var statuses = [
  "to_assign",
  "to_setup",
  "production",
  "ending",
  "report_to_send"
];
var BriefService = class {
  constructor() {
    this.maxBrief = 0;
    this.briefsMap = new Map(
      briefs_default.map((brief) => {
        return [brief.id, brief];
      })
    );
  }
  init() {
    this.maxBrief = 0;
    for (const [id] of this.briefsMap) {
      if (id > this.maxBrief) {
        this.maxBrief = id;
      }
    }
  }
  checkBrief(brief) {
    const errors = [];
    if (brief.name.length == 0 || brief.name.length > 255) {
      errors.push({
        field: "name",
        error: "invalid size (must be beetween >= 0 and < 255)"
      });
    }
    if (brief.budget < 0) {
      errors.push({ field: "budget", error: "must be >= 0" });
    }
    if (brief.amId !== null && brief.amId > 0 && !userService.findOne(brief.amId)) {
      errors.push({ field: "amId", error: "cannot get it" });
    }
    if (brief.traderId !== null && brief.traderId > 0 && !userService.findOne(brief.traderId)) {
      errors.push({ field: "traderId", error: "cannot get it" });
    }
    if (!statuses.includes(brief.status)) {
      errors.push({ field: "status", error: "invalid value" });
    }
    if (!this.validDate(brief.startDate)) {
      errors.push({ field: "startDate", error: "invalid value" });
    }
    if (!this.validDate(brief.endDate)) {
      errors.push({ field: "endDate", error: "invalid value" });
    }
    return errors;
  }
  findAll() {
    return Array.from(this.briefsMap.values());
  }
  findOne(id) {
    return this.briefsMap.get(id);
  }
  create(brief) {
    brief.id = 0;
    if (this.briefsMap.get(brief.id)) {
      return brief;
    }
    this.maxBrief++;
    brief.id = this.maxBrief;
    this.briefsMap.set(brief.id, brief);
    (0, import_fs2.writeFileSync)(
      "./data/briefs.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w"
      }
    );
    return brief;
  }
  update(brief) {
    this.briefsMap.set(brief.id, brief);
    (0, import_fs2.writeFileSync)(
      "./data/briefs.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w"
      }
    );
    return brief;
  }
  validDate(date) {
    return date != void 0 && date != "" && !isNaN(new Date(date).getTime());
  }
};
var briefService = new BriefService();

// src/resources/entities/briefs.controller.ts
function registerController2(EntitiesController2) {
  EntitiesController2.get("/briefs", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    res.status(200).json(briefService.findAll());
  });
  EntitiesController2.get("/briefs/:id", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      throw new InvalidValueException(req.path, req.method, void 0);
    }
    const brief = briefService.findOne(id);
    if (brief) {
      return res.status(200).json(brief);
    }
    throw new NotFoundException(req.path, req.method);
  });
  EntitiesController2.post("/briefs", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    const errs = briefService.checkBrief(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }
    res.status(201).json(briefService.create(req.body));
  });
  EntitiesController2.put("/briefs/:id", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      throw new InvalidValueException(req.path, req.method, void 0);
    }
    if (req.body.id != id) {
      throw new InvalidValueException(req.path, req.method, [
        { field: "id", error: "invalid id" }
      ]);
    }
    const errs = briefService.checkBrief(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }
    res.status(200).json(briefService.update(req.body));
  });
}

// src/resources/entities/entities.controller.ts
var EntitiesController = (0, import_express.Router)();
registerController(EntitiesController);
registerController2(EntitiesController);

// src/middlewares/exceptions.handler.ts
var ExceptionsHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.status && err.detail) {
    return res.status(err.status).json(err);
  }
  return res.status(500).json({ error: "Internal error" });
};

// src/middlewares/unknownRoutes.handler.ts
var UnknownRoutesHandler = (err, req) => {
  throw new NotFoundException(req.path, req.method);
};

// src/index.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use("/entity", EntitiesController);
app.get("/", (req, res) => {
  res.json({ message: "Ok" });
});
app.all("*", UnknownRoutesHandler);
app.use(ExceptionsHandler);
app.listen(config.API_PORT, () => {
  userService.init();
  briefService.init();
  console.log("Server running on port", config.API_PORT);
});
