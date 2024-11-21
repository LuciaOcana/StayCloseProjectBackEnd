"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.checkUsername = checkUsername;
exports.changeRol = changeRol;
exports.enableUser = enableUser;
exports.disableUser = disableUser;
//import { userInterface } from "../models/user";
const userServices = __importStar(require("../services/userServices"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get users");
            const page = Number(req.params.page);
            const limit = Number(req.params.limit);
            const paginator = { page, limit };
            console.log(paginator);
            const users = yield userServices.getEntries.getAll(paginator.page, paginator.limit);
            const totalUsers = yield userServices.getEntries.countTotalUsers(); // Asumiendo que tienes una función para contar usuarios
            if (!users) {
                console.error("Users is undefined or null");
                return res.json([]);
            }
            console.log("users", users);
            return res.json({ users, totalUsers });
        }
        catch (error) {
            console.error(error); //log de errores quitar
            return res.status(500).json({ error: 'Failes to get users' });
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, name, email, password, admin } = req.body;
            //console.log('creating user');
            const newUser = { username, name, email, password, admin };
            const user = yield userServices.getEntries.create(newUser);
            console.log('hi', user);
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get user');
            const id = req.params.id;
            const user = yield userServices.getEntries.findById(id);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Update user');
            const id = req.params.id;
            const { username, name, email, password } = req.body;
            const updatedUser = { username, name, email, password };
            const user = yield userServices.getEntries.updateUserById(id, updatedUser);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            return res.json({
                message: "User updated",
                user
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Delete user');
            const id = req.params.id;
            const user = yield userServices.getEntries.deleteUserById(id);
            if (!user) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('logging user...');
            const { username, password } = req.body;
            const login = { username, password };
            const loggedUser = yield userServices.getEntries.findUserByUsername(login.username);
            console.log(loggedUser);
            if (!loggedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (login.password == loggedUser.password) {
                console.log('checking admin');
                if (loggedUser.admin != true) {
                    return res.status(400).json({ error: 'You are not an Admin' });
                }
                console.log('creem token');
                //Creem token
                const token = jsonwebtoken_1.default.sign({ username: username, admin: loggedUser.admin }, process.env.SECRET || 'token');
                return res.json({ message: 'user logged in', token: token });
            }
            return res.status(400).json({ error: 'Incorrect password' });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    });
}
function checkUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.params.username; // Tomamos el nombre de usuario del cuerpo de la solicitud
            console.log("chechUsername", username);
            const exists = yield userServices.getEntries.checkIfUserExists(username); // Consultamos el servicio
            // Retornamos si el usuario existe o no
            return res.json({ exists });
        }
        catch (error) {
            console.error("Error al verificar el nombre de usuario:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    });
}
function changeRol(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield userServices.getEntries.findById(id);
            if (!user)
                return res.status(404).json({ message: `El usuari no s'ha trobat` });
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
            const user2 = yield userServices.getEntries.updateUserById(id, user);
            return res.status(200).json({ message: `El rol del usuario: ${user2} ha sido cambiado a admin.` });
        }
        catch (_a) {
            return res.status(500).json({ message: `Error al cambiar el rol de admin` });
        }
    });
}
//funciones para habilitar usuarios 
function enableUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id; // Obtener el ID del 
            //const user = await userServices.getEntries.updateUserById (id, { disabled: false });
            const user = yield userServices.getEntries.enable(id);
            if (!user)
                return res.status(404).json({ message: 'Usuario no encontrado' });
            return res.status(200).json({ message: 'Usuario habilitado', user });
        }
        catch (error) {
            console.error("Error al habilitar usuario:", error.message);
            return res.status(500).json({ error: "Error al habilitar el usuario: " });
        }
    });
}
//Habilitar usuario funcion 
function disableUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id; // Obtener el ID del usuario 
            //const user = await userServices.getEntries.updateUserById (id, { disabled: true });
            const user = yield userServices.getEntries.disable(id);
            if (!user)
                return res.status(404).json({ message: 'Usuario no encontrado' });
            return res.status(200).json({ message: 'Usuario deshabilitado', user });
        }
        catch (error) {
            console.error("Error al deshabilitar usuario:", error.message);
            return res.status(500).json({ error: "Error al deshabilitar el usuario" });
        }
    });
}
