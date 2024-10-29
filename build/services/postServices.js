"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = void 0;
const post_1 = require("../models/post");
const user_1 = require("../models/user");
exports.getEntries = {
    // Obtener todos los post
    getAll: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        // Realizar la consulta con paginación
        const posts = yield post_1.postofDB.find()
            .skip(skip)
            .limit(limit);
        // Retornar los usuarios encontrados
        return posts;
    }),
    //Buscar post por ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield post_1.postofDB.findById(id);
    }),
    // Crear un nuevo post
    create: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        return yield post_1.postofDB.create(entry);
    }),
    // Actualizar un post por ID
    update: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield post_1.postofDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    // Eliminar un post por ID
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield post_1.postofDB.findByIdAndDelete(id);
    }),
    // Tots els posts d'un usuari
    findByAuthor: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield post_1.postofDB.find({ author: id });
    }),
    // Comprobar si el usuario existe por nombre de usuario
    checkIfUserExists: (username) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.userofDB.findOne({ username: username });
        return !!user; // Devuelve true si el usuario existe
    })
};
