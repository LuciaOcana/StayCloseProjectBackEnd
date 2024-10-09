"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postofDB = exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
exports.postSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    postType: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    postDate: { type: Date, required: true }
});
exports.postofDB = (0, mongoose_1.model)('post', exports.postSchema);
