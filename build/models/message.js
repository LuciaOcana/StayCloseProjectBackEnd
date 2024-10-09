"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postofDB = exports.messageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.messageSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
    shippingDate: { type: Date, required: true }
});
exports.postofDB = (0, mongoose_1.model)('message', exports.messageSchema);
