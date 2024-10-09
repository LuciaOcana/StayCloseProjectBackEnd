import { Request, Response } from "express";
//import { userInterface } from "../models/user";
import * as userServices from "../services/userServices";
import { userInterface } from "../models/user";

export async function getUsers(_req: Request, res: Response): Promise<Response> {
   try {
    console.log("Get users");
    const users = await userServices.getEntries.getAll();
    return res.json(users);
   } catch (error) {
    return res.status(500).json({ error:'Failes to get users'});
   }
}

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { username, name, email, password } = req.body as userInterface;
        console.log('creating user');

        const newUser: Partial<userInterface> = { username, name, email, password };
        const user = await userServices.getEntries.create(newUser);

        return res.json({
            message: "User created",
            user
          });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
}

export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get user');
        const id = req.params.id;
        const user = await userServices.getEntries.findById(id);

        if(!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get user' });
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    try{
        console.log('Get user');
        const id = req.params.id;
        const { username, name, email, password } = req.body as userInterface;
        const updatedUser: Partial<userInterface> = { username, name, email, password };
        const user = await userServices.getEntries.updateUserById(id, updatedUser);

        if(!user) {
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        return res.json({
            message: "User updated",
            user
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update user' });
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try{
        console.log('Delete user');
        const id = req.params.id;
        const user = await userServices.getEntries.deleteUserById(id);

        if (!user){
            return res.status(404).json({ error: `User with id ${id} not found` });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get user' });
    }
}