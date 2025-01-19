import { Request, Response } from "express";
import { chatService } from "../services/chatServices"
import { ChatModel } from "../models/chat";


export const createChat = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const chat = await chatService.createChat(participants);
    return res.status(201).json(chat);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unexpected error' });
  }
};

/*
export const getUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chats = await chatService.getUserChats(userId);
    return res.status(200).json(chats);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unexpected error' });
  }
};
*/

export const getUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Busca los chats donde el usuario participa
    const chats = await ChatModel.find({ participants: userId })
      .populate("messages") // Incluye los mensajes (si necesitas)
      .lean(); // Convierte los resultados en objetos JSON

    return res.status(200).json(chats);
  } catch (error) {
    console.error("Error al obtener los chats del usuario:", error);
    return res.status(500).json({ error: "No se pudieron obtener los chats." });
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

/*
export const createGroupChat = async (req: Request, res: Response) => {
  try {
    const { groupName, participants } = req.body;

    if (!groupName || !participants || participants.length < 2) {
      return res.status(400).json({ error: "Se necesita un nombre de grupo y al menos 2 participantes." });
    }

    const groupChat = await chatService.createGroupChat(groupName, participants);
    return res.status(201).json(groupChat);
  } catch (error) {
    console.error(`[ERROR] Error al crear el grupo: ${error}`);
    return res.status(500).json({ error: "No se pudo crear el grupo." });
  }
};

*/

export const createGroupChat = async (req: Request, res: Response) => {
  try {
    const { groupName, participants } = req.body;

    if (!groupName || !participants || participants.length < 2) {
      return res
        .status(400)
        .json({ error: "Se necesita un nombre de grupo y al menos 2 participantes." });
    }

    // Crear el chat grupal
    const groupChat = await ChatModel.create({
      participants: participants,
      groupName: groupName,
      isGroupChat: true,
      messages: [],
    });

    console.log("Grupo creado:", groupChat);

    return res.status(201).json(groupChat); // Devuelve el chat recién creado
  } catch (error) {
    console.error(`[ERROR] Error al crear el grupo: ${error}`);
    return res.status(500).json({ error: "No se pudo crear el grupo." });
  }
};







