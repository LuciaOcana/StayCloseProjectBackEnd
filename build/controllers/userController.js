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
            const { username, password } = req.body;
            const login = { username, password };
            const loggedUser = yield userServices.getEntries.findUserByUsername(login.username);
            if (!loggedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (login.password == loggedUser.password) {
                if (loggedUser.admin != true) {
                    return res.status(400).json({ error: 'You are not an Admin' });
                }
                //Creem token
                const token = jsonwebtoken_1.default.sign({ username: username, admin: loggedUser.admin }, process.env.SECRET || 'token');
                return res.header('auth-token', token).json('User logged in');
            }
            return res.status(400).json({ error: 'Incorrect password' });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    });
}
