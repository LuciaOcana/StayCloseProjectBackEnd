import express from 'express';
import { getAll, findById, create, update, deleteEntry, findNearby } from '../controllers/ubiController';


const ubiRouter = express.Router();

// Ruta per obtenir totes les ubis
ubiRouter.get("/", getAll);

// Ruta per obtenir una ubi per ID
ubiRouter.get("/:id", findById);

// Ruta per crear una nova ubi
ubiRouter.post("/", create);

// Ruta per actualitzar una ubi per ID
ubiRouter.put("/:id", update);

// Ruta per eliminar una ubi per ID
ubiRouter.delete("/:id", deleteEntry);

// Ruta para encontrar los puntos cercanos
ubiRouter.get("/nearby/:lon/:lat/:distance", findNearby);

export default ubiRouter; 