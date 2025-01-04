//para gestionar las rutas de chats y grupos 

import express from "express";
import { createNewChat, getUserChats } from "../controllers/chatController";

const router = express.Router();

router.post("/create", createNewChat);
router.get("/user/:userId", getUserChats);

export default router;
