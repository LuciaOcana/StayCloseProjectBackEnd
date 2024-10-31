"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Ruta para obtener todos los usuarios
router.get("/getUsers/:page/:limit", userController_1.getUsers);
// Ruta per crear usuari
router.post("/", userController_1.createUser);
//Ruta per obtenir usuari per id
router.get("/getUser/:id", userController_1.getUser);
//Ruta per actialitzar usuari per id
router.put("/update/:id", userController_1.updateUser);
//Ruta per eliminar user per id
router.delete("/:id", userController_1.deleteUser);
//Ruta per fer el login
router.put("/login", userController_1.login);
// Ruta para verificar si el usuario existe
router.get('/check-username/:username', userController_1.checkUsername);
exports.default = router;
