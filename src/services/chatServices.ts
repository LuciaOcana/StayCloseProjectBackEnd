import { ChatModel } from '../models/chat';
import { Types } from 'mongoose';

export const chatService = {
  createChat: async (participants: string[]) => {
    const chat = await ChatModel.create({
      participants: participants.map((id) => new Types.ObjectId(id)), // Convertir a ObjectId
      messages: [],
    });
    return chat;
  },

  sendMessage: async (chatId: string, sender: string, content: string) => {
    const chat = await ChatModel.findById(chatId);
    if (!chat) throw new Error('Chat not found');
    chat.messages.push({
      sender: new Types.ObjectId(sender), // Convertir a ObjectId
      content,
      timestamp: new Date(),
    });
    await chat.save();
    return chat;
  },

  getChatMessages: async (chatId: string) => {
    const chat = await ChatModel.findById(chatId).populate('participants');
    if (!chat) throw new Error('Chat not found');
    return chat.messages;
  },

  getUserChats: async (userId: string) => {
    const chats = await ChatModel.find({
      participants: new Types.ObjectId(userId), // Convertir a ObjectId
    }).populate('participants');
    return chats;
  },
};
