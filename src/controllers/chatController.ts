import { Request, Response } from 'express';
import { Chat } from '../models/chat';
import { Message } from '../models/message';
import mongoose from 'mongoose';

// Crear un nuevo chat
export const createChat = async (req: Request, res: Response) => {
  try {
    const { name, chatType, participants, users } = req.body;

    // Validar entrada
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Nombre del chat es requerido y debe ser una cadena' });
    }
    if (typeof chatType !== 'boolean') {
      return res.status(400).json({ error: 'chatType debe ser un booleano' });
    }
    if (!Array.isArray(participants) || !Array.isArray(users)) {
      return res.status(400).json({ error: 'participants y users deben ser arreglos' });
    }

    const chat = new Chat({ name, chatType, participants, users });
    const savedChat = await chat.save();
    return res.status(201).json(savedChat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el chat' });
  }
};

// Obtener todos los chats
export const getChats = async (_req: Request, res: Response) => {
  try {
    const chats = await Chat.find().populate('users messages');
    return res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener los chats' });
  }
};

// Agregar un mensaje a un chat
export const addMessageToChat = async (req: Request, res: Response) => {
  try {
    const { chatId, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: 'ID de chat inválido' });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }

    if (!message || typeof message.content !== 'string' || typeof message.sender !== 'string') {
      return res.status(400).json({ error: 'Mensaje inválido' });
    }

    const newMessage = new Message({ ...message, timestamp: new Date() });
    const savedMessage = await newMessage.save();

    chat.messages.push(savedMessage.id);
    await chat.save();

    return res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al agregar mensaje al chat' });
  }
};

// Obtener todos los mensajes
export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

// Guardar un mensaje directamente
export const saveMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, sender } = req.body;
  
      // Validación del contenido
      if (!content || typeof content !== 'string') {
        res.status(400).json({ error: 'El contenido del mensaje es requerido y debe ser una cadena' });
        return; // Finaliza el flujo aquí
      }
  
      // Validación del remitente
      if (!sender || !mongoose.Types.ObjectId.isValid(sender)) {
        res.status(400).json({ error: 'El ID del remitente es inválido' });
        return; // Finaliza el flujo aquí
      }
  
      // Crear y guardar el mensaje
      const newMessage = new Message({ content, sender, timestamp: new Date() });
      await newMessage.save();
  
      // Respuesta exitosa
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      // Manejo de errores del servidor
      res.status(500).json({ error: 'Error al guardar el mensaje' });
    }
  };