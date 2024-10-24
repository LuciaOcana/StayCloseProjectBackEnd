"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const postRouter = express_1.default.Router();
// Ruta para obtener todos los post
postRouter.get("/", postController_1.getPosts);
// Ruta per crear post
postRouter.post("/", postController_1.createPost);
//Ruta per obtenir post per id
postRouter.get("/:id", postController_1.getPost);
//Ruta per obtenir tots els post d'un usuari
postRouter.get("/:id/authorPosts", postController_1.getAuthorPosts);
//Ruta per eliminar post per id
postRouter.delete("/:id", postController_1.deletePost);
//Ruta per actialitzar usuari per id
postRouter.put("/:id", postController_1.updatePost);
exports.default = postRouter;
