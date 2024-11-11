import express from 'express';

import { getUsers, createUser, getUser, updateUser, deleteUser, login, checkUsername, changeRol, disableUser, enableUser } from '../controllers/userController';
import { TokenValidation } from '../middlewares/verifyJWT';
//import { verifyOwnership } from '../middlewares/verifyOwner';
import { AdminValidation } from '../middlewares/verifyAdmin';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/getUsers/:page/:limit", TokenValidation, AdminValidation, getUsers);

// Ruta per crear usuari
router.post("/", TokenValidation, AdminValidation,createUser);

//Ruta per obtenir usuari per id
router.get("/getUser/:id", TokenValidation, AdminValidation, getUser);

//Ruta per actialitzar usuari per id
router.put("/update/:id", TokenValidation, AdminValidation, updateUser);

//Ruta per eliminar user per id
router.delete("/:id", TokenValidation, AdminValidation, deleteUser);

//Ruta per fer el login
router.post("/login", login);

// Ruta para verificar si el usuario existe
router.get('/check-username/:username', checkUsername);

//Ruta per canviar rol d'usuari 
router.put("/changeRol/:id", changeRol);

//Ruta para habilitar un usuario por ID
router.patch("/enable/:id", TokenValidation, AdminValidation, enableUser );

//Ruta para Deshabilitar un usuario por ID
router.patch("/disable/:id", TokenValidation, AdminValidation, disableUser);


export default router 

