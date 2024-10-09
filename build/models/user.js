"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userofDB = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    actualUbication: [],
    inHome: { type: Boolean, required: true },
    //experiences: [{ type: Schema.Types.ObjectId, ref: 'experiencias' }] // Vector de experiencias con referencia a su modelo
});
exports.userofDB = (0, mongoose_1.model)('user', exports.userSchema);
