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
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.getPost = getPost;
exports.getAuthorPosts = getAuthorPosts;
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
            const { author, postType, content, image, postDate } = req.body;
            // Se asegura de que todos los campos necesarios estén definidos
            const newPost = {
                author, // Usa el username
                postType,
                content,
                image: image || '', // Proporciona una cadena vacía si no hay imagen
                postDate: postDate ? new Date(postDate) : new Date() // Asegura que postDate sea una fecha válida
            };
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
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get post');
            const id = req.params.id;
            const { author, postType, content, image, postDate } = req.body;
            const updatedPost = { author, postType, content, image, postDate };
            const post = yield postServices.getEntries.update(id, updatedPost);
            if (!post) {
                return res.status(404).json({ error: 'Post with id ${id} not found' });
            }
            return res.json({
                message: "Post updated",
                post
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to update post' });
        }
    });
}
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Delete post');
            const id = req.params.id;
            const post = yield postServices.getEntries.delete(id);
            if (!post) {
                return res.status(404).json({ error: 'Post with id ${id} not found' });
            }
            return res.json(post);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get post' });
        }
    });
}
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get post');
            const id = req.params.id;
            const post = yield postServices.getEntries.findById(id);
            if (!post) {
                return res.status(404).json({ error: `User with id ${id} not found` });
            }
            return res.json(post);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get post' });
        }
    });
}
function getAuthorPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idAuthor = req.params.id;
            console.log('Get post from Author with id: ', idAuthor);
            const posts = yield postServices.getEntries.findByAuthor(idAuthor);
            console.log(posts);
            if (!posts) {
                return res.status(404).json({ error: `User with id ${idAuthor} not found` });
            }
            return res.json(posts);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get post' });
        }
    });
}
