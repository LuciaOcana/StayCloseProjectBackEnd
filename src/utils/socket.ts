import { Server, Socket } from "socket.io";
import { ChatModel } from "../models/chat";
import { MessageModel } from "../models/message";
import { ConnectedUser, userofDB } from "../models/user";


// Lista de usuarios conectados
export let connectedUsers: ConnectedUser[] = [];

// ====================== FUNCIONES AUXILIARES ======================

/**
 * Añade un usuario conectado a la lista
 */
const addConnectedUser = (username: string, socketId: string ): void => {
  const existingUser = connectedUsers.find((user) => user.username === username);
  if (!existingUser) {
    connectedUsers.push({ username, socketId });
  }
};

/**
 * Elimina un usuario de la lista de conectados
 */
const removeConnectedUser = (socketId: string): void => {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};

// ====================== SOCKET.IO HANDLER ======================
export default function setupSocketIO(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Nuevo cliente conectado:", socket.id);
// Evento: Registrar un usuario como conectado
socket.on("userConnected", async ({ username }: { username: string }) => {
    try {
      const user = await userofDB.findOne({ username }); // Busca en la base de datos
      if (user) {
        // Usa la función addConnectedUser
        addConnectedUser(user.username, socket.id);
        console.log(`Usuario conectado: ${username}`);
        
        // Emitir lista actualizada de usuarios conectados
        io.emit(
          "connectedUsers",
          connectedUsers.map(({ username }) => ({ username }))
        );
      } else {
        console.error("Usuario no encontrado:", username);
        socket.emit("error", { message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error en userConnected:", error);
      socket.emit("error", { message: "Error al conectar usuario" });
    }
  });
      

    // Evento: Obtener lista de usuarios conectados
    socket.on("getConnectedUsers", () => {
      socket.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
    });

    // Evento: Iniciar un chat único o usar uno existente
    socket.on(
      "startUniqueChat",
      async ({ receiverUsername, senderUsername }: { receiverUsername: string; senderUsername: string }) => {
        try {
          const receiver = connectedUsers.find((user) => user.username === receiverUsername);
          const sender = connectedUsers.find((user) => user.username === senderUsername);

          if (!receiver || !sender) {
            socket.emit("error", { message: "Usuario no conectado" });
            return;
          }

          const existingChat = await ChatModel.findOne({
            participants: { $all: [receiverUsername, senderUsername] },
          });

          let chat;
          if (existingChat) {
            chat = existingChat;
          } else {
            chat = await ChatModel.create({
              participants: [receiverUsername, senderUsername],
              messages: [],
            });
          }

          const roomID = chat.id.toString();
          socket.join(roomID);
          io.to(receiver.socketId).emit("openChat", {
            chatId: roomID,
            participants: [receiverUsername, senderUsername],
          });
          socket.emit("openChat", {
            chatId: roomID,
            participants: [receiverUsername, senderUsername],
          });
        } catch (error) {
          console.error("Error al iniciar chat único:", error);
          socket.emit("error", { message: "Error al iniciar chat único" });
        }
      }
    );

    // Evento: Cargar mensajes previos de un chat
    socket.on("loadMessages", async ({ chatId }: { chatId: string }) => {
      try {
        const messages = await MessageModel.find({ chat: chatId })
          .populate("sender", "username")
          .populate("receiver", "username");
        socket.emit("messagesLoaded", messages);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
        socket.emit("error", { message: "Error al cargar mensajes" });
      }
    });


    //Evento: Enviar mensaje
    socket.on("sendMessage", async ({ chatId, sender, receiver, content }) => {
        try {
          const receiverSocket = connectedUsers.find((user) => user.username === receiver)?.socketId;
      
          if (!receiverSocket) {
            console.log(`El usuario receptor ${receiver} no está conectado.`);
            return;
          }
      
          // Crear y guardar el mensaje en la base de datos
          const message = await MessageModel.create({
            sender,
            receiver,
            content,
            chat: chatId,
            timestamp: new Date(),
          });
      
          // Enviar el mensaje al usuario receptor
          io.to(receiverSocket).emit("receiveMessage", {
            sender,
            content,
            chatId,
            timestamp: message.timestamp,
          });
      
          // Opcional: Emitir el mensaje al remitente para actualizar el chat local
          socket.emit("receiveMessage", {
            sender,
            content,
            chatId,
            timestamp: message.timestamp,
          });
      
          console.log(`Mensaje enviado de ${sender} a ${receiver}: ${content}`);
        } catch (error) {
          console.error("Error al enviar el mensaje:", error);
          socket.emit("error", { message: "No se pudo enviar el mensaje." });
        }
      });
      




    // Evento: Desconectar usuario
    socket.on("disconnect", () => {
      console.log("Socket desconectado:", socket.id);
      removeConnectedUser(socket.id);
      io.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
    });
  });
}
