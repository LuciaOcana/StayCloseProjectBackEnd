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
const user_1 = require("../models/user");
exports.getEntries = {
    // Obtener todos los usuarios
    getAll: (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
        // Calcular el número de documentos que deben saltarse
        const skip = (page - 1) * limit;
        // Realizar la consulta con paginación
        const users = yield user_1.userofDB.find()
            .skip(skip)
            .limit(limit);
        // Retornar los usuarios encontrados
        return users;
    }),
    // Buscar usuario por ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.userofDB.findById(id);
    }),
    // Crear un nuevo usuario
    create: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(entry);
        return yield user_1.userofDB.create(entry);
    }),
    // Actualizar un usuario por ID
    updateUserById: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield user_1.userofDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    // Eliminar un usuario por ID
    deleteUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.userofDB.findByIdAndDelete(id);
    }),
    findUserByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.userofDB.findOne({ username: username });
    }),
    countTotalUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const totalUsers = yield user_1.userofDB.countDocuments(); // Esto cuenta todos los usuarios en la colección
        return totalUsers;
        //para contar solo los usuarios habilitados 
        //return await userofDB.countDocuments({disabled:false});
    }),
    // Verificar si un usuario existe por nombre de usuario
    checkIfUserExists: (username) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("checkIFUserExist", username);
        const user = yield user_1.userofDB.findOne({ username: username });
        return !!user; // Retorna true si el usuario existe, false si no
    }),
    //Habilitar un usuario
    enable: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.userofDB.findByIdAndUpdate(id, { disabled: false }, { new: true });
        if (!user)
            throw new Error('Usuario no encontrado');
        return user;
    }),
    //Deshabilitar un usuario
    disable: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.userofDB.findByIdAndUpdate(id, { disabled: true }, { new: true });
        if (!user)
            throw new Error('Usuario no encontrado');
        return user;
    })
};
