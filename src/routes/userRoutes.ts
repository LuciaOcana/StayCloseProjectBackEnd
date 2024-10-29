import express from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser, login, checkUsername } from '../controllers/userController';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/getUsers/:page/:limit", getUsers);

// Ruta per crear usuari
router.post("/", createUser);

//Ruta per obtenir usuari per id
router.get("/getUser/:id", getUser);

//Ruta per actialitzar usuari per id
router.put("/update/:id", updateUser);

//Ruta per eliminar user per id
router.delete("/:id", deleteUser);

//Ruta per fer el login
router.put("/login", login);

// Ruta para verificar si el usuario existe
router.get('/users/check-exists/:username', checkUsername);

export default router 

