import { Router } from 'express';
import { createChat,getUserChats, startChat,createOrGetChat,createGroupChat} from '../controllers/chatController';

const router = Router();

// Crear un nuevo chat (individual o grupal)
router.post('/create', createChat);
// Obtener chats de un usuario
router.get('/user/:userId', getUserChats);
// Ruta para iniciar un chat
router.post("/start", startChat);
// Ruta para buscar o crear un chat
router.post("/createOrGetChat", createOrGetChat);
// Crear un nuevo grupo
router.post('/group/create', createGroupChat); 

export default router;
