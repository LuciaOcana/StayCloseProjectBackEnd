import express from 'express';
import { getAll, findById, create, update, deleteEntry } from '../controllers/ubiController';


const ubiRouter = express.Router();

// Ruta per obtenir totes les ubis
ubiRouter.get("/", getAll);

// Ruta per obtenir una ubi per ID
ubiRouter.get("/:id", findById);

// Ruta per crec una nova ubi
ubiRouter.post("/", create);

// Ruta per actualitzar una ubi per ID
ubiRouter.put("/:id", update);

// Ruta per eliminar una ubi per ID
ubiRouter.delete("/:id", deleteEntry);

export default ubiRouter; 