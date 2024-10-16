import express from 'express'
import {getPosts, createPost} from '../controllers/postController'
import {} from '../controllers/postController'

const postRouter = express.Router();

// Ruta para obtener todos los post
postRouter.get("/", getPosts);

// Ruta per crear post
postRouter.post("/", createPost);
postRouter.get("/", );

// Ruta per crear post
postRouter.post("/", );

//Ruta per obtenir post per id
postRouter.get("/:id", );

//Ruta per obtenir tots els post d'un usuari
postRouter.get("/:id/:author", );

//Ruta per eliminar post per id
postRouter.delete("/:id", );


export default postRouter 
