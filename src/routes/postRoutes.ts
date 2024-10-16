import express from 'express'
<<<<<<< HEAD
import {getPosts, createPost} from '../controllers/postController'

=======
import {} from '../controllers/postController'
>>>>>>> 4086f75c240e9f4d4c75a4dec697735471094f3c

const postRouter = express.Router();

// Ruta para obtener todos los post
<<<<<<< HEAD
postRouter.get("/", getPosts);

// Ruta per crear post
postRouter.post("/", createPost);
=======
postRouter.get("/", );

// Ruta per crear post
postRouter.post("/", );
>>>>>>> 4086f75c240e9f4d4c75a4dec697735471094f3c

//Ruta per obtenir post per id
postRouter.get("/:id", );

//Ruta per obtenir tots els post d'un usuari
postRouter.get("/:id/:author", );

//Ruta per eliminar post per id
postRouter.delete("/:id", );


export default postRouter 
