import express from 'express'
import {getPosts, createPost, updatePost, deletePost, getPost, getAuthorPosts, getPostByType} from '../controllers/postController'


const postRouter = express.Router();

// Ruta para obtener todos los post
postRouter.get("/getPosts/:page/:limit", getPosts);

// Ruta per crear post
postRouter.post("/", createPost);

//Ruta per obtenir post per id
postRouter.get("/:id", getPost);

//Ruta per obtenir tots els post d'un usuari
postRouter.get("/authorPosts/:id",getAuthorPosts );

//Ruta per eliminar post per id
postRouter.delete("/:id", deletePost);

//Ruta per actialitzar usuari per id
postRouter.put("/:id", updatePost);

//Ruta per obtenir posts per categoria de post
postRouter.get("/type/:type", getPostByType);

export default postRouter 
