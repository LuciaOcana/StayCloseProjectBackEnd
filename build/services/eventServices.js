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
const event_1 = require("../models/event");
exports.getEntries = {
    // Obtener todos los eventos
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield event_1.eventofDB.find();
    }),
    // Buscar evento por ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield event_1.eventofDB.findById(id);
    }),
    // Crear un nuevo evento
    create: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        return yield event_1.eventofDB.create(entry);
    }),
    // Actualizar un evento por ID
    update: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield event_1.eventofDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    // Eliminar un evento por ID
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield event_1.eventofDB.findByIdAndDelete(id);
    })
};
