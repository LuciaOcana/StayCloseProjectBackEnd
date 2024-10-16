import express from 'express'
import {getPosts, createPost, updatePost, deletePost, getPost, getAuthorPosts} from '../controllers/postController'


const postRouter = express.Router();

// Ruta para obtener todos los post
postRouter.get("/", getPosts);

// Ruta per crear post
postRouter.post("/", createPost);

//Ruta per obtenir post per id
postRouter.get("/:id", getPost);

//Ruta per obtenir tots els post d'un usuari
postRouter.get("/:id/authorPosts",getAuthorPosts );

//Ruta per eliminar post per id
postRouter.delete("/:id", deletePost);

//Ruta per actialitzar usuari per id
postRouter.put("/:id", updatePost);

export default postRouter 
