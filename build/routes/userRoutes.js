"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import * as userServices from '../services/userServices'
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Ruta para obtener todos los usuarios
router.get("/", userController_1.getUsers);
// Ruta per crear usuari
router.post("/", userController_1.createUser);
//Ruta per obtenir usuari per id
router.get("/:id", userController_1.getUser);
//Ruta per actialitzar usuari per id
router.put("/:id", userController_1.updateUser);
//Ruta per eliminar user per id
router.delete("/:id", userController_1.deleteUser);
// Ruta para eliminar un usuario por ID
/*router.delete('/:id', async(req, res) => {
    const data = await userServices.getEntries.delete(req.params.id)
    return res.json(data);
})*/
exports.default = router;
// Ruta para obtener todos los usuarios
/*userRoutes.get('/', async(_req, res) => {
    const data = await userServices.getEntries.getAll()
    return res.json(data);
})
    */
// Ruta para crear un nuevo usuario
/*router.post('/', async(req, res) => {
    const data = await userServices.getEntries.create(req.body)
    return res.json(data);
})*/
// Ruta para obtener un usuario por ID
/*router.get('/:id', async(req, res) => {
    const data = await userServices.getEntries.findById(req.params.id)
    return res.json(data);
})*/
// Ruta para actualizar un usuario por ID
/*router.put('/:id', async(req, res) => {
    const data = await userServices.getEntries.update(req.params.id,req.body)
    return res.json(data);
})*/ 
