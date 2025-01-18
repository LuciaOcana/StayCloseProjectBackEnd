import { Request, Response } from "express";
//import { userInterface } from "../models/user";
import * as userServices from "../services/userServices";
import { login, userInterface } from "../models/user";
import { paginatorInterface } from "../interfaces/paginator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

    console.error(error); //log de errores quitar
    return res.status(500).json({ error:'Failes to get users'});
   }
}


export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { username, name, email, password, admin, avatar, home } = req.body as userInterface;

        // Verificar si el nombre de usuario ya existe
        const existingUserByUsername = await userServices.getEntries.findByUsername(username);
        if (existingUserByUsername) {
            return res.status(301).json({ error: 'El nombre de usuario ya está en uso.' });
        }

        // Verificar si el correo electrónico ya existe
        const existingUserByEmail = await userServices.getEntries.findUserByEmail(email);
        if (existingUserByEmail) {
            return res.status(302).json({ error: 'El correo electrónico ya está en uso.' });
        }

        // Hash the password
        const saltRounds = 10;  // Define the salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser: Partial<userInterface> = { username, name, email, password: hashedPassword, admin, avatar, home };
        const user = await userServices.getEntries.create(newUser);

        return res.json(user);
    } catch (error) {
        console.error(error); // Opcional: log para ver el error en consola
        return res.status(500).json({ error: 'Failed to create user' });
    }
}


export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get user');
        const id = req.params.id;
        console.log(id);
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
        const encryptedPassword = req.params.encryptedPassword;
        const userValidation = await userServices.getEntries.findById(id);
        console.log(userValidation);
        if(userValidation != null){
            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(encryptedPassword, userValidation.password);
            console.log(passwordMatch);
            if (!passwordMatch) {
                return res.status(400).json({ error: 'Incorrect password' });
            }
            else{
                const { username, name, email, password, avatar, home } = req.body as userInterface;
                const updatedUser: Partial<userInterface> = { username, name, email, password, avatar, home };
                const user = await userServices.getEntries.updateUserById(id, updatedUser);
                if(!user) {
                    return res.status(404).json({ error: `User with id ${id} not found` });
                }
                return res.status(200).json('User updated');
            }
        }
        else{
            return res.status(404).json({ error: 'No password provided' });
        }  
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
    try {
        const { username, password } = req.body;
        const loggedUser = await userServices.getEntries.findUserByUsername(username);
        console.log(loggedUser);
      

        if (!loggedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, loggedUser.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        if (!loggedUser.admin) {
            return res.status(400).json({ error: 'You are not an Admin' });
        }
        if (loggedUser.disabled==true){
            return res.status(300).json({ error: 'Usuario no habilitado' });
        }

        const token: string = jwt.sign(
            { id: loggedUser.id, username: loggedUser.username, email: loggedUser.email, admin: loggedUser.admin },
            process.env.SECRET || 'token'
        );
        

        return res.json({ message: 'user logged in', token });
    } catch (error) {
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

export async function changeRol(req: Request, res: Response): Promise<Response> {
    try {
        
        const id = req.params.id;
        const user = await userServices.getEntries.findById(id);
        if (!user) return res.status(404).json({ message: `El usuari no s'ha trobat` });


        console.log(user);
        if (user.admin == true) {
            console.log("hola");
            return res.status(400).json({ message: `El usuari ja es admin` });
        }

        // Cambiar el rol de admin
        user.admin = true;
        console.log(user.admin);
        // Guardar los cambios
        console.log(id);
        const user2 = await userServices.getEntries.updateUserById(id, user);

        return res.status(200).json({ message: `El rol del usuario: ${user2} ha sido cambiado a admin.` });
    } catch {
        return res.status(500).json({ message: `Error al cambiar el rol de admin` });
    }
}

//funciones para habilitar usuarios 

export async function enableUser (req:Request, res: Response): Promise<Response> {
    try {

        const id = req.params.id; // Obtener el ID del 
        //const user = await userServices.getEntries.updateUserById (id, { disabled: false });
        const user = await userServices.getEntries.enable(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario habilitado', user });
    } catch (error:any) {
        console.error("Error al habilitar usuario:", error.message);
        return res.status(500).json({ error: "Error al habilitar el usuario: "});
    }
    
}

//Habilitar usuario funcion 
export async function disableUser (req: Request, res: Response): Promise<Response> {
    try {
        console.log('desabling user ...');
        const id = req.params.id; // Obtener el ID del usuario 
        //const user = await userServices.getEntries.updateUserById (id, { disabled: true });
        const user = await userServices.getEntries.disable(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario deshabilitado', user });
    } catch (error: any) {
        console.error("Error al deshabilitar usuario:", error.message);
        return res.status(500).json({ error: "Error al deshabilitar el usuario" });

    }

}

//Funcion sencilla para comprovar el fucnionament de la API
export async function PingPong(_req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: "pong" });
}

export async function getUserByUsername(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get user by username');
        const username = req.params.username; // Obtener el parámetro 'username' de la URL

        // Aquí se busca al usuario por el username
        const user = await userServices.getEntries.findByUsername(username);

        if (!user) {
            return res.status(404).json({ error: `Usuario con username ${username} no encontrado` });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error obteniendo usuario por username:", error);
        return res.status(500).json({ error: 'No se pudo obtener el usuario' });
    }
}

