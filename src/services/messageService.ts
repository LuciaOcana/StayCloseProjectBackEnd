/*
import { MessageModel } from "../models/message";
import { ChatModel } from "../models/chat";

export const messageService = {
    

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
*/

/*

import { MessageModel } from "../models/message";
import { ChatModel } from "../models/chat";

export async function createMessage(data: {
    senderUsername: string;
    receiverUsername: string;
    content: string;
    timestamp: Date;
}) {
    return await MessageModel.create(data);
}

export const messageService = {
  sendMessage: async (chatId: string, sender: string, receiver: string, content: string) => {
    
    console.log(" [INFO] Validando chatId:", chatId);
    // Verifica si existe el chat o crea uno nuevo
    let chat = await ChatModel.findById(chatId);
    if (!chat) {
      chat = await ChatModel.create({
        _id: chatId,
        participants: [sender, receiver],
        messages: [],
      });
    }

    // Crear el mensaje
    const message = await MessageModel.create({
      sender,
      receiver,
      content,
      chat: chatId,
      timestamp: new Date(),
    });

    // Agregar el mensaje al chat
    chat.messages.push(message.id);
    await chat.save();

    return message;
  },

  

  // Obtener mensajes de un chat
  getChatMessages: async (chatId: string) => {
    const messages = await MessageModel.find({ chat: chatId })
      .sort({ timestamp: 1 })
      .populate("sender", "username")
      .populate("receiver", "username");
    return messages;
  },
};



*/

import { ChatModel } from "../models/chat";
import { MessageModel } from "../models/message";

export const messageService = {
  // Servicio para enviar un mensaje
  sendMessage: async (chatId: string, sender: string, receiver: string, content: string) => {
    try {
      console.log("Validando chatId:", chatId);

      // Verificar si el chat existe
      const chat = await ChatModel.findById(chatId);
      if (!chat) {
        console.error("Chat no encontrado:", chatId);
        throw new Error("Chat no encontrado");
      }

      console.log("Creando mensaje con datos:", { sender, receiver, content });

      // Crear el mensaje y asociarlo al chat
      const message = await MessageModel.create({
        sender,
        receiver,
        content,
        chat: chatId,
        timestamp: new Date(),
      });

      // Asociar el mensaje al chat
      chat.messages.push(message.id);
      await chat.save();

      console.log("Mensaje guardado en la base de datos:", message);
      return message;
    } catch (error: any) {
      console.error("Error en el servicio sendMessage:", error.message);
      throw error;
    }
  },

  // Servicio para obtener los mensajes de un chat
  getChatMessages: async (chatId: string) => {
    try {
      console.log("Obteniendo mensajes para chatId:", chatId);

      // Obtener mensajes asociados al chat
      const messages = await MessageModel.find({ chat: chatId })
        .sort({ timestamp: 1 }) // Ordenar mensajes por fecha
        .populate("sender", "username") // Mostrar solo el username del remitente
        .populate("receiver", "username"); // Mostrar solo el username del destinatario

      console.log("Mensajes obtenidos:", messages);
      return messages;
    } catch (error: any) {
      console.error("Error al obtener mensajes del chat:", error.message);
      throw error;
    }
  },
};
