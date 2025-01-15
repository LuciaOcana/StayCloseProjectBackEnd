//import { Types } from "mongoose";
import { MessageModel } from "../models/message";
import { ChatModel } from "../models/chat";

export const messageService = {
    /*
  // Enviar un mensaje
  sendMessage: async (chatId: string, senderId: string, content: string, receiverId?: string) => {
    const chat = await ChatModel.findById(chatId);
    if (!chat) throw new Error("Chat no encontrado");

    // Crear el mensaje
    const message = await MessageModel.create({
      sender: new Types.ObjectId(senderId),
      receiver: receiverId ? new Types.ObjectId(receiverId) : undefined,
      content,
      chat:chatId,
      timestamp: new Date(),
    });
    chat.messages.push(message.id);
    await chat.save();
    return message;
  },
  */

  sendMessage: async (chatId: string, sender: string, receiver: string, content: string) => {
    const chat = await ChatModel.findById(chatId);
    if (!chat) throw new Error("Chat no encontrado");

    const message = await MessageModel.create({
      sender,
      receiver,
      content,
      chat: chatId,
      timestamp: new Date(),
    });
    chat.messages.push(message.id);
    await chat.save();
    return message;
  },

  // Obtener mensajes de un chat
  getChatMessages: async (chatId: string) => {
    const messages = await MessageModel.find({ chat: chatId })
      .sort({ timestamp: 1 })
      .populate("sender","username")
      .populate("receiver", "username");
    return messages;
  },
};
