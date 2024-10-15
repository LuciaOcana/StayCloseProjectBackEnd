import { Request, Response } from "express";
//import { userInterface } from "../models/user";
import * as postServices from "../services/postServices";
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
      const { username, name, email, password } = req.body as userInterface;
      //console.log('creating user');

      const newUser: Partial<userInterface> = { username, name, email, password};
      const user = await userServices.getEntries.create(newUser);
      console.log('hi', user);

      return res.json({
          message: "User created",
          user
        });
  } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function getUser(req: Request, res: Response): Promise<Response> {
  
}