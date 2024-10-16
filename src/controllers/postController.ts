import { Request, Response } from "express";
//import { userInterface } from "../models/user";
import * as postServices from "../services/postServices";
import { postInterface } from "../models/post";
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
      //console.log("Request body:", req.body);
      const { author, postType, content, image, postDate} = req.body as postInterface;
      const newPost: Partial<postInterface> = { author, postType, content, image, postDate };
      console.log(newPost);
      const post = await postServices.getEntries.create(newPost);
   
      return res.json({
          message: "Post created",
          post
        });
  } catch (error) {
      console.error("Error creating post:", error); 
      return res.status(500).json({ error: 'Failed to create post' });
  }
}

