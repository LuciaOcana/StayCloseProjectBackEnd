import { Router } from 'express';
import { createChat,getUserChats } from '../controllers/chatController';

const router = Router();

// Crear un nuevo chat
router.post('/create', createChat);
// Obtener chats de un usuario
router.get('/user/:userId', getUserChats);

export default router;
