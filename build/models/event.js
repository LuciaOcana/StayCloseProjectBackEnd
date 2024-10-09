"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventofDB = exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.eventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    ubication: [{ type: String }],
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true }
});
exports.eventofDB = (0, mongoose_1.model)('event', exports.eventSchema);
