"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Ruta para obtener todos los post
router.get("/");
// Ruta per crear post
router.post("/");
//Ruta per obtenir post per id
router.get("/:id");
//Ruta per obtenir tots els post d'un usuari
router.get("/:id/:author");
//Ruta per eliminar post per id
router.delete("/:id");
exports.default = router;
