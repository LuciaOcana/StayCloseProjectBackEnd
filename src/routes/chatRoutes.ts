import express from "express";
import { createChat, getChats, addMessageToChat } from "../controllers/chatController";

const router = express.Router();

router.post('/create', createChat); // Crear chat
router.get('/', getChats); // Obtener todos los chats
router.post('/message', addMessageToChat); // Agregar mensaje a un chat


export default router;
