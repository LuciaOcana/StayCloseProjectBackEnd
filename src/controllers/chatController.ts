import { Request, Response } from 'express';
import { Chat } from '../models/chat';
import { ChatMessage } from '../models/message';
import mongoose from 'mongoose';

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
  

  export const getChats = async (_req: Request, res: Response) => {
    try {
      const chats = await Chat.find().populate('users messages');
      return res.status(200).json(chats);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener los chats' });
    }
  };
  
  export const addMessageToChat = async (req: Request, res: Response) => {
    try {
      const { chatId, message } = req.body;
  
      // Validar si `chatId` es válido
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ error: 'ID de chat inválido' });
      }
  
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: 'Chat no encontrado' });
      }
  
      // Validar mensaje
      if (!message || !message.text || !message.sender) {
        return res.status(400).json({ error: 'Mensaje inválido' });
      }
  
      // Guardar mensaje
      const newMessage = new ChatMessage(message);
      const savedMessage = await newMessage.save();
  
      chat.messages.push(savedMessage.id);
      await chat.save();
  
      return res.status(201).json(savedMessage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al agregar mensaje al chat' });
    }
  };
  
  
/*
export const createChat = async (req: Request, res: Response) => {
  try {
    const { name, chatType, participants, users } = req.body;
    const chat = new Chat({ name, chatType, participants, users });
    const savedChat = await chat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el chat' });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find().populate('users messages');
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los chats' });
  }
};

export const addMessageToChat = async (req: Request, res: Response) => {
  try {
    const { chatId, message } = req.body;
    const chat = await Chat.findById(chatId);
    if (!message || !message.text || !message.sender) {
        return res.status(400).json({ error: 'Mensaje inválido' });
      }
    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }
    const newMessage = new ChatMessage(message);
    const savedMessage = await newMessage.save();
    chat.messages.push(savedMessage._id);
    await chat.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar mensaje al chat' });
  }
};*/
