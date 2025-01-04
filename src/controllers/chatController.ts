//para manejar las rutas de chat y mensajes 

import { Request, Response } from "express";
import { createChat, getAllChatsByUserId } from "../services/chatServices";

export const createNewChat = async (req: Request, res: Response) => {
  try {
    const chat = await createChat(req.body);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el chat" });
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chats = await getAllChatsByUserId(userId);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los chats" });
  }
};


