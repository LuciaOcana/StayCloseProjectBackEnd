import { Router } from 'express';
import { getMessages, addMessage } from '../controllers/chatController';

const router = Router();

// Ruta para obtener todos los mensajes
router.get('/', getMessages);

// Ruta para agregar un nuevo mensaje
router.post('/', addMessage);

export default router;
