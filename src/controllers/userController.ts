import { Request, Response } from "express";
//import { userInterface } from "../models/user";
import * as userServices from "../services/userServices";
import { login, userInterface } from "../models/user";
import { paginatorInterface } from "../interfaces/paginator";

export async function getUsers(req: Request, res: Response): Promise<Response> {
   try {
    console.log("Get users");
    const page = Number(req.params.page);
    const limit = Number(req.params.limit);
    const paginator = {page, limit} as paginatorInterface
    console.log(paginator);
    const users = await userServices.getEntries.getAll(paginator.page, paginator.limit);
    const totalUsers = await userServices.getEntries.countTotalUsers(); // Asumiendo que tienes una función para contar usuarios
    if (!users) {
        console.error("Users is undefined or null");
        return res.json([]);
    }
    console.log("users", users);
    return res.json({users, totalUsers});
   } catch (error) {
    return res.status(500).json({ error:'Failes to get users'});
   }
}

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { username, name, email, password, admin } = req.body as userInterface;
        //console.log('creating user');

        const newUser: Partial<userInterface> = { username, name, email, password, admin};
        const user = await userServices.getEntries.create(newUser);
        console.log('hi', user);

        return res.json(user);
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
        console.log('Update user');
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
export async function login(req: Request, res: Response): Promise<Response> {
    try{
        const {username, password} = req.body;
        const login = {username, password};
        const loggedUser = await userServices.getEntries.findUserByUsername(login.username);
        if(!loggedUser){
            return res.status(404).json({ error: 'User not found'})
        } 
        if(login.password == loggedUser.password){
            if (loggedUser.admin==true)
                return res.json({
                    message: "User logged in",
                    loggedUser
                });
                return res.status(400).json({error: 'You are not admin'})
        }
        return res.status(400).json({ error: 'Incorrect password'})

    } catch(error) {
        return res.status(500).json({ error: 'Failed to get user' });
    }
}
export async function checkUsername(req: Request, res: Response): Promise<Response> {
    try {
        const  username  = req.params.username;  // Tomamos el nombre de usuario del cuerpo de la solicitud
        console.log("chechUsername", username);
        const exists = await userServices.getEntries.checkIfUserExists(username);  // Consultamos el servicio

        // Retornamos si el usuario existe o no
        return res.json({ exists });
    } catch (error) {
        console.error("Error al verificar el nombre de usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
