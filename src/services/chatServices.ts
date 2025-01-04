//Gestionamos la lógica para los chat 

import Chat, { IChat } from "../models/chat";

// Crear nuevo chat
export const createChat = async (chat: IChat): Promise<IChat> => {
  const newChat = new Chat(chat);
  return await newChat.save();
};

// Obtener chat por ID
export const getChatById = async (chatId: string): Promise<IChat | null> => {
  return await Chat.findById(chatId);
};

// Obtener todos los chats de un usuario
export const getAllChatsByUserId = async (userId: string): Promise<IChat[]> => {
  return await Chat.find({ participants: userId });
};

