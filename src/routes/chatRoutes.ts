import { Router } from 'express';
import { createChat, sendMessage, getChatMessages, getUserChats } from '../controllers/chatController';

const router = Router();

// Crear un nuevo chat
router.post('/create', createChat);

// Enviar mensaje
router.post('/send-message', sendMessage);

// Obtener mensajes de un chat
router.get('/:chatId/messages', getChatMessages);

// Obtener chats de un usuario
router.get('/user/:userId', getUserChats);

export default router;
