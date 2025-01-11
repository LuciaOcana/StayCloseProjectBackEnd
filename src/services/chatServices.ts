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
};
