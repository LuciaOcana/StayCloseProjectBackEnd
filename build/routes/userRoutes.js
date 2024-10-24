"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyJWT_1 = require("../middlewares/verifyJWT");
//import { verifyOwnership } from '../middlewares/verifyOwner';
const verifyAdmin_1 = require("../middlewares/verifyAdmin");
const router = express_1.default.Router();
// Ruta para obtener todos los usuarios
router.get("/getUsers/:page/:limit", verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, userController_1.getUsers);
// Ruta per crear usuari
router.post("/", verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, userController_1.createUser);
//Ruta per obtenir usuari per id
router.get("/getUser/:id", verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, userController_1.getUser);
//Ruta per actialitzar usuari per id
router.put("/update/:id", verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, userController_1.updateUser);
//Ruta per eliminar user per id
router.delete("/:id", verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, userController_1.deleteUser);
//Ruta per fer el login
router.post("/login", userController_1.login);
exports.default = router;
