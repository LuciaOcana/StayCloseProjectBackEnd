import { Router } from "express";
import { sendMessage, getChatMessages } from "../controllers/messageController";

const router = Router();

router.post("/send", sendMessage); // Enviar un mensaje
router.get("/:chatId/messages", getChatMessages); // Obtener mensajes de un chat

export default router;
