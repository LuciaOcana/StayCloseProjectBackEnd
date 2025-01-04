//para gestionar las rutas para enviar y recibir los mensajes

import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/:chatId", getMessages);

export default router;
