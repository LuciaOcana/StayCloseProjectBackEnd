/*import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/message";
import { userofDB as User } from "../models/user";


interface ConnectedUser {
    socketId: string;
    username: string;
  }
interface IUser {
  id: string;
  receiverEmail: string;
  senderEmail: string;
  roomID: string;
}
//interface ConnectedUser extends Pick <userInterface, "username" | "email"> {socketId:string;}

let users: IUser[] = [];
export let connectedUsers: ConnectedUser [] = [];


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

// Configura los sockets y eventos
export default function setupSocketIO(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    // Registrar un usuario como conectado

    socket.on("userConnected", async ({ username}: {username: string }) => {
        try {
          const user = await User.findOne({ username });
          if (user) {
            connectedUsers.push({ socketId: socket.id , username });
            io.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
          } else {
            console.error("Usuario no encontrado para el email:", username);
          }
        } catch (error) {
          console.error("Error en el evento userConnected:", error);
        }
      });
      
    /*
    socket.on("userConnected", async ({ email, username }: { email: string; username: string }) => {
      try {
        // Verifica que el usuario exista en la base de datos
        const user = await User.findOne({ email });
        if (user) {
            connectedUsers.push({ socketId: socket.id, username });
          console.log(`Usuario conectado: ${username}`);
          // Emitir lista de usuarios conectados con solo los datos necesarios
          io.emit(
            "connectedUsers",
            connectedUsers.map(({username }) => ({ username }))
          );
        }
      } catch (error) {
        console.error("Error al conectar usuario:", error);
      }
    });
    */
//////////
/*
    // Enviar lista de usuarios conectados al cliente que lo solicite
    socket.on("getConnectedUsers", () => {
      socket.emit(
        "connectedUsers",
        connectedUsers.map(({username }) => ({username }))
        
      );
    });

    //manejo de grupos y chats privados 

    socket.on("startUniqueChat", async ({ participants }: { participants: string[] }) => {
        try {
          const roomID = participants.sort().join("-"); // ID único basado en participantes
          socket.join(roomID); // Une al cliente a la sala
          io.to(roomID).emit("roomCreated", { roomID, participants }); // Notifica a todos en la sala
        } catch (error) {
          console.error("Error al crear sala única:", error);
        }
      });

      //Guardar los mensajes en la base de datos y cargarlos 

      socket.on("sendMessage", async ({ roomID, sender, message }: { roomID: string; sender: string; message: string }) => {
        try {
          const newMessage = await MessageModel.create({ roomID, sender, content: message, timestamp: new Date() });
          io.to(roomID).emit("receiveMessage", newMessage); // Enviar mensaje a todos en la sala
        } catch (error) {
          console.error("Error al enviar mensaje:", error);
        }
      });
      
      socket.on("loadMessages", async ({ roomID }: { roomID: string }) => {
        try {
          const messages = await MessageModel.find({ roomID });
          socket.emit("messagesLoaded", messages);
        } catch (error) {
          console.error("Error al cargar mensajes:", error);
        }
      });
      
      

    // Manejo de desconexión
    socket.on("disconnect", () => {
      connectedUsers = connectedUsers.filter((user) => user.socketId !== socket.id);
      console.log(`Cliente desconectado: ${socket.id}`);
      // Actualizar lista para todos los clientes
      io.emit(
        "connectedUsers",
        connectedUsers.map(({username }) => ({ username }))
      );
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
  



}

*/

import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/message";
import { userofDB as User } from "../models/user";

interface ConnectedUser {
  socketId: string;
  username: string;
}

export let connectedUsers: ConnectedUser[] = [];

export default function setupSocketIO(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    // Registrar un usuario como conectado
    socket.on("userConnected", async ({ username }: { username: string }) => {
      try {
        const user = await User.findOne({ username });
        if (user) {
          connectedUsers.push({ socketId: socket.id, username });
          io.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
        } else {
          console.error("Usuario no encontrado:", username);
        }
      } catch (error) {
        console.error("Error en userConnected:", error);
      }
    });

    // Enviar lista de usuarios conectados
    socket.on("getConnectedUsers", () => {
      socket.emit(
        "connectedUsers",
        connectedUsers.map(({ username }) => ({ username }))
      );
    });

    // Manejar envío de mensajes
    socket.on("sendMessage", async ({ roomID, sender, message }: { roomID: string; sender: string; message: string }) => {
      try {
        const newMessage = await MessageModel.create({
          roomID,
          sender,
          content: message,
          timestamp: new Date(),
        });
        io.to(roomID).emit("receiveMessage", {
          sender,
          content: message,
          timestamp: newMessage.timestamp,
        });
      } catch (error) {
        console.error("Error en sendMessage:", error);
      }
    });

    // Manejar carga de mensajes
    socket.on("loadMessages", async ({ roomID }: { roomID: string }) => {
      try {
        const messages = await MessageModel.find({ roomID }).lean();
        socket.emit("messagesLoaded", messages.map((msg) => ({
          sender: msg.sender,
          content: msg.content,
          timestamp: msg.timestamp,
        })));
      } catch (error) {
        console.error("Error en loadMessages:", error);
      }
    });

    // Manejo de desconexión
    socket.on("disconnect", () => {
      connectedUsers = connectedUsers.filter((user) => user.socketId !== socket.id);
      console.log(`Cliente desconectado: ${socket.id}`);
      io.emit(
        "connectedUsers",
        connectedUsers.map(({ username }) => ({ username }))
      );
    });
  });
}
