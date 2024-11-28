import { Request, Response } from "express";
//import { userInterface } from "../models/user";
import * as postServices from "../services/postServices";
import { postInterface } from "../models/post";
//import * as userServices from "../services/userServices"; // Asegúrate de importar los servicios de usuario


//import { post } from "@typegoose/typegoose";

//import { userInterface } from "../models/user";

export async function getPosts(_req: Request, res: Response): Promise<Response> {
   try {
    
    console.log("Get posts");
    const posts = await postServices.getEntries.getAll();
    console.log("post", posts);
    return res.json(posts);
   } catch (error) {
    return res.status(500).json({ error:'Failed to get posts'});
   }
}

export async function createPost(req: Request, res: Response): Promise<Response> {
   try {
      const { author, postType, content, image, postDate } = req.body as postInterface;

      // Comprobamos si el usuario existe
      const userExists = await postServices.getEntries.checkIfUserExists(author);
      if (!userExists) {
          return res.status(400).json({ error: "User does not exist" });
      }

      // Creamos un nuevo objeto de post
      const newPost: postInterface = {
          author,
          postType,
          content,
          image: image || '',
          postDate: postDate ? new Date(postDate) : new Date(),
      };

      // Usamos el servicio para crear el post
      const post = await postServices.getEntries.create(newPost);

      return res.json({
          message: "Post created",
          post
      });
  } catch (error) {
      //console.error("Error creating post:", error.message); // Muestra el error en la consola
      return res.status(500).json({ error: 'Failed to create post' }); // Devuelve un mensaje de error al frontend
  }
  }
  export async function updatePost(req: Request, res: Response): Promise<Response> {
   try{
       console.log('Get post');
       const id = req.params.id;
       const { author, postType, content, image, postDate } = req.body as postInterface;
       const updatedPost: Partial<postInterface> = { author, postType, content, image, postDate};
       const post = await postServices.getEntries.update(id, updatedPost);

       if(!post) {
           return res.status(404).json({ error: 'Post with id ${id} not found' });
       }
       return res.json({
           message: "Post updated",
           post
       });
   } catch (error) {
       return res.status(500).json({ error: 'Failed to update post' });
   }
}
export async function deletePost(req: Request, res: Response): Promise<Response> {
   try{
       console.log('Delete post');
       const id = req.params.id;
       const post = await postServices.getEntries.delete(id);

       if (!post){
           return res.status(404).json({ error: 'Post with id ${id} not found' });
       }
       return res.json(post);
   } catch (error) {
       return res.status(500).json({ error: 'Failed to get post' });
   }
}
export async function getPost(req: Request, res: Response): Promise<Response> {
   try {
       console.log('Get post');
       const id = req.params.id;
       const post = await postServices.getEntries.findById(id);

       if(!post) {
           return res.status(404).json({ error: `User with id ${id} not found` });
       }
       return res.json(post);
   } catch (error) {
       return res.status(500).json({ error: 'Failed to get post' });
   }
}
export async function getAuthorPosts(req: Request, res: Response): Promise<Response> {
   try{
      const idAuthor = req.params.id;
      console.log('Get post from Author with id: ', idAuthor);
      const posts = await postServices.getEntries.findByAuthor(idAuthor);
      console.log(posts);
      if(!posts){
         return res.status(404).json({ error: `User with id ${idAuthor} not found` });
      }
      return res.json(posts)
   } catch (error) {
      return res.status(500).json({ error: 'Failed to get post' });
   } 
}