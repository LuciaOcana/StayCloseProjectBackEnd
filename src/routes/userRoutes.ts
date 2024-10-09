import express from 'express';
import * as userServices from '../services/userServices'
import { getUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userController';


const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", getUsers);

// Ruta per crear usuari
router.post("/", createUser);

//Ruta per obtenir usuari per id
router.get("/:id", getUser);

//Ruta per actialitzar usuari per id
router.put("/:id", updateUser);

//Ruta per eliminar user per id
router.delete("/:id", deleteUser);

// Ruta para eliminar un usuario por ID
/*router.delete('/:id', async(req, res) => {
    const data = await userServices.getEntries.delete(req.params.id)
    return res.json(data);
})*/


export default router 


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