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
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.userofDB.find();
    }),
    // Buscar usuario por ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.userofDB.findById(id);
    }),
    // Crear un nuevo usuario
    create: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.userofDB.create(entry);
    }),
    // Actualizar un usuario por ID
    update: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield user_1.userofDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    // Eliminar un usuario por ID
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.userofDB.findByIdAndDelete(id);
    })
};
