import express from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser, login } from '../controllers/userController';
import { TokenValidation } from '../middlewares/verifyJWT';
import { verifyOwnership } from '../middlewares/verifyOwner';
//import { AdminValidation } from '../middlewares/verifyAdmin';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/getUsers/:page/:limit", getUsers);

// Ruta per crear usuari
router.post("/", createUser);

//Ruta per obtenir usuari per id
router.get("/getUser/:id", TokenValidation, verifyOwnership, getUser);

//Ruta per actialitzar usuari per id
router.put("/update/:id", TokenValidation, verifyOwnership, updateUser);

//Ruta per eliminar user per id
router.delete("/:id", deleteUser);

//Ruta per fer el login
router.post("/login", login);


export default router 

