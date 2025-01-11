/*import { ChatModel } from "../models/chat";
import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

interface IUser {
  id: string;
  receiverEmail: string;
  senderEmail: string;
  roomID:string;
}

let users: IUser[] = [];

// Elimina un usuario del array
export const removeUser = (id: string): IUser | undefined => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return undefined;
};

// Obtiene un usuario por ID
export const getUser = (id: string): IUser | undefined => {
  return users.find((user) => user.id === id);
};

// Obtiene todos los usuarios en una sala
export const getUsersInRoom = (room: string): IUser[] => {
  return users.filter((user) => user.roomID === room);
};

// Agrega un usuario o crea un nuevo chat si no existe
export const addUser = async (
  { receiverEmail, senderEmail }: { receiverEmail: string; senderEmail: string },
  socket: Socket
): Promise<void | { error: string }> => {
  if (!receiverEmail || !senderEmail) {
    return { error: "You tried to add zero users" };
  }

  try {
    const existingChat = await ChatModel.findOne({
      $or: [
        { participants: [receiverEmail, senderEmail] },
        { participants: [senderEmail, receiverEmail] },
      ],
    });

    if (existingChat) {
      // Si el chat ya existe, envía la información al cliente
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

*/