import { Request, Response } from 'express';
import { Message } from '../models/messagechat';

// Almacén temporal para mensajes (puedes reemplazar esto con una base de datos)//ejemploseminario
let messages: Message[] = [];

export const getMessages = (req: Request, res: Response) => {
  res.status(200).json(messages);
};

export const addMessage = (req: Request, res: Response) => {
  const { sender, text } = req.body;

  if (!sender || !text) {
    return res.status(400).json({ error: 'El remitente y el texto son obligatorios' });
  }

  const newMessage: Message = {
    sender,
    text,
    timestamp: new Date(),
  };

  messages.push(newMessage); // Agregar mensaje al almacén temporal
  res.status(201).json(newMessage);
};
