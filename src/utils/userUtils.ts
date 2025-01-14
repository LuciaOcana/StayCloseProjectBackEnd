/*import { ChatModel } from "../models/chat";
import { Socket } from "socket.io";
import { ConnectedUser, userofDB } from "../models/user";
import { userofDB, ConnectedUser } from "../models/user";


  
  /**
   * Elimina un usuario del array de usuarios conectados
   
  export const removeUser = (id: string): IUser | undefined => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return undefined;
  };
  
  /**
   * Obtiene un usuario conectado por su ID
   
  export const getUser = (id: string): IUser | undefined => {
    return users.find((user) => user.id === id);
  };
  
  
   * Obtiene todos los usuarios en una sala específica
   
  export const getUsersInRoom = (room: string): IUser[] => {
    return users.filter((user) => user.roomID === room);
  };
  
  /**
   * Añade un usuario al chat o crea un nuevo chat si no existe
   
  export const addUser = async (
    { receiverEmail, senderEmail }: { receiverEmail: string; senderEmail: string },
    socket: Socket
  ): Promise<void | { error: string }> => {
    if (!receiverEmail || !senderEmail) {
      return { error: "You tried to add zero users" };
    }
  
    try {
      // Busca si el chat ya existe
      const existingChat = await ChatModel.findOne({
        $or: [
          { participants: [receiverEmail, senderEmail] },
          { participants: [senderEmail, receiverEmail] },
        ],
      });
  
      if (existingChat) {
        // Si el chat existe, envía la información al cliente
        socket.emit("openChat", existingChat);
      } else {
        // Si el chat no existe, crea uno nuevo
        const newChat = await ChatModel.create({
          participants: [receiverEmail, senderEmail],
          messages: [],
        });
  
        const roomID = uuidV4();
  
        // Envía el nuevo chat al cliente con el ID de sala
        socket.emit("openChat", { ...newChat.toObject(), roomID });
      }
    } catch (error) {
      console.error("Error al agregar usuario o crear chat:", error);
    }
  };
  
  /**
   * Obtiene todos los usuarios conectados desde la base de datos
   
  export const getConnectedUsers = async (): Promise<ConnectedUser[]> => {
    try {
      // Busca usuarios habilitados en la base de datos
      const users = await userofDB
        .find({})
        .select("username email")
        .lean<ConnectedUser[]>();
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios conectados:", error);
      return [];
    }
  };
  
  /**
   * Une a un usuario a una sala de chat específica
   
  export const joinChatRoom = (socket: Socket, roomID: string): void => {
    socket.join(roomID);
    console.log(`Usuario ${socket.id} se unió a la sala ${roomID}`);
  };
  */