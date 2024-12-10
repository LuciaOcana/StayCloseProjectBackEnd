import express from 'express';
import { getAll, findById, create, update, deleteEntry } from '../controllers/eventController';


const router = express.Router();

// Ruta para obtener todos los eventos
router.get("/", getAll);

// Ruta para obtener un evento por ID
router.get("/:id", findById);

// Ruta para crear un nuevo evento
router.post("/", create);

// Ruta para actualizar un evento por ID
router.put("/:id", update);

// Ruta para eliminar un evento por ID
router.delete("/:id", deleteEntry);

export default router; 