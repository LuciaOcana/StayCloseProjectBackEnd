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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = getPosts;
exports.createPost = createPost;
//import { userInterface } from "../models/user";
const postServices = __importStar(require("../services/postServices"));
//import { post } from "@typegoose/typegoose";
//import { userInterface } from "../models/user";
function getPosts(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get posts");
            const posts = yield postServices.getEntries.getAll();
            console.log("post", posts);
            return res.json(posts);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get posts' });
        }
    });
}
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //console.log("Request body:", req.body);
            const { author, postType, content, image, postDate } = req.body;
            const newPost = { author, postType, content, image, postDate };
            console.log(newPost);
            const post = yield postServices.getEntries.create(newPost);
            return res.json({
                message: "Post created",
                post
            });
        }
        catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ error: 'Failed to create post' });
        }
    });
}
