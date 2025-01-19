import { Types } from "mongoose";
import { ChatModel } from "../models/chat";


export const chatService = {
  // Crear un nuevo chat
  createChat: async (participants: string[]) => {
    const chat = await ChatModel.create({
      participants: participants.map((id) => new Types.ObjectId(id)),
      messages: [],
    });
    return chat;
  },

  // Obtener los chats de un usuario
  getUserChats: async (userId: string) => {
    const chats = await ChatModel.find({
      participants: new Types.ObjectId(userId),
    }).populate("participants");
    return chats;
  },
  // Buscar o crear un chat único entre dos usuarios
  getOrCreateChat: async (participantIds: string[]) => {
    try {
      // Convertir los IDs a ObjectId
      const participants = participantIds.map((id) => new Types.ObjectId(id));

      // Buscar un chat existente con los participantes
      const existingChat = await ChatModel.findOne({
        participants: { $all: participants },
      });

      if (existingChat) {
        console.log(`[INFO] Chat existente encontrado: ${existingChat._id}`);
        return existingChat;
      }

      // Crear un nuevo chat si no existe uno previo
      const newChat = await ChatModel.create({
        participants,
        messages: [],
      });

      console.log(`[INFO] Nuevo chat creado: ${newChat._id}`);
      return newChat;
    } catch (error) {
      console.error(`[ERROR] Error al buscar o crear un chat: ${error}`);
      throw new Error("Error al buscar o crear un chat.");
    }
  },

  createGroupChat: async (groupName: string, participants: string[]) => {
    try {
      if (participants.length < 2) {
        throw new Error("Se necesitan al menos 2 participantes para crear un grupo.");
      }

      const chat = await ChatModel.create({
        participants,
        isGroupChat: true,
        groupName,
        messages: [],
      });

      console.log(`[INFO] Grupo creado con éxito: ${chat._id}`);
      return chat;
    } catch (error) {
      console.error(`[ERROR] Error al crear el grupo: ${error}`);
      throw error;
    }
  },
 
  
};
