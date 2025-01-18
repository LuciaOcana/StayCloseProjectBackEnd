import { Request, Response } from "express";
import { chatService } from "../services/chatServices"
import { ChatModel } from "../models/chat";


export const createChat = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const chat = await chatService.createChat(participants);
    return res.status(201).json(chat);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chats = await chatService.getUserChats(userId);
    return res.status(200).json(chats);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const startChat = async (req: Request, res: Response) => {
  try {
    const { sender, receiver } = req.body;

    // Verificar si ya existe un chat entre los dos usuarios
    let chat = await ChatModel.findOne({
      participants: { $all: [sender, receiver] }, // Ambos usuarios deben ser participantes
    });

    if (!chat) {
      // Si no existe un chat, crearlo
      chat = await ChatModel.create({
        participants: [sender, receiver],
        messages: [],
      });
      console.log("Nuevo chat creado:", chat);
    } else {
      console.log("Chat existente encontrado:", chat);
    }

    // Devolver el chatId al frontend
    return res.status(200).json({ chatId: chat._id });
  } catch (error) {
    console.error("Error al iniciar el chat:", error);
    return res.status(500).json({ error: "No se pudo iniciar el chat" });
  }
};


export const createOrGetChat = async (req: Request, res: Response) => {
  try {
    const { sender, receiver } = req.body;
    console.log(sender , receiver);

    // Verificar si ya existe un chat entre los dos usuarios
    let chat = await ChatModel.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!chat) {
      // Crear un nuevo chat si no existe
      chat = await ChatModel.create({
        participants: [sender, receiver],
        messages: [],
      });
      console.log("Nuevo chat creado:", chat);
    } else {
      console.log("Chat existente encontrado:", chat);
    }

    return res.status(200).json({ chatId: chat._id });
  } catch (error) {
    console.error("Error al buscar o crear chat:", error);
    return res.status(500).json({ error: "Error al buscar o crear chat" });
  }
};




