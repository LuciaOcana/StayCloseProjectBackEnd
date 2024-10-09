"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatofDB = exports.chatSchema = void 0;
const mongoose_1 = require("mongoose");
exports.chatSchema = new mongoose_1.Schema({
    chatType: { type: Boolean, required: true },
    participants: [{ type: String }]
});
exports.chatofDB = (0, mongoose_1.model)('chat', exports.chatSchema);
