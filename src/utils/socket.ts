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
/*

////FUNCIONA////////
import { Server, Socket } from "socket.io";
import { MessageModel, IMessage} from "../models/message";
import { userofDB as User } from "../models/user";
import { ChatModel } from "../models/chat";
import { messageService } from "../services/messageService";


interface ConnectedUser {
  socketId: string;
  username: string;
}

export let connectedUsers: ConnectedUser[] = [];



  /////////CONFIGURACION DE LOS SOCKETS Y EVENTOS ///////
export default function setupSocketIO(io: Server) {

    ////******INICIO FUNCION DE LISTA DE CONECTADOS NO TOCAR //////////////
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

    ////******FIN FUNCION DE LISTA DE CONECTADOS NO TOCAR ********//////////////

    /**
     * INICIAR O USAR UN CHAT UNICO
     

     /*** Iniciar un chat único o usar uno existente*
      // Crear o abrir un chat único
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
            io.to(receiver.socketId).emit("openChat", { chatId: roomID, participants: [receiverUsername, senderUsername] });
            socket.emit("openChat", { chatId: roomID, participants: [receiverUsername, senderUsername] });
          } catch (error) {
            console.error("Error al iniciar chat único:", error);
            socket.emit("error", { message: "Error al iniciar chat único" });
          }
        }
      );
  
       /**
     * CREAR  Y GESTIONAR UN GRUPO
     
    socket.on(
        "createGroup",
        async ({
          groupName,
          participants,
        }: {
          groupName: string;
          participants: string[];
        }) => {
          try {
            const newGroup = await ChatModel.create({
              participants,
              messages: [],
            });
      
            const groupId = newGroup.id.toString();
      
            participants.forEach((participant) => {
              const user = connectedUsers.find((user) => user.username === participant);
              if (user) {
                io.to(user.socketId).emit("groupCreated", {
                  groupId,
                  groupName,
                  participants,
                });
              }
            });
      
            socket.join(groupId);
            console.log(`Grupo creado: ${groupName} (${groupId})`);
          } catch (error) {
            console.error("Error al crear grupo:", error);
          }
        }
      );
       ///////********** Crear y gestionar grupos *******//////


         /**
     * Unirse a una sala
     
    socket.on("joinChat", (chatId: string) => {
        socket.join(chatId);
        console.log(`Usuario ${socket.id} se unió al chat ${chatId}`);
      });





  //////////////***********ENVIAR MENSAJES A USUARIOS O A GRUPOS  */////******ENVIAR Y RECIBIR MENSAJES ******** */
    /**
     * Enviar mensaje a un usuario
     */

        /*** Enviar mensaje a una sala
        // Enviar mensaje a un chat
    socket.on(
        "sendMessage",
        async ({ chatId, sender, content }: { chatId: string; sender: string; content: string }) => {
          try {
            const chat = await ChatModel.findById(chatId);
            if (!chat) throw new Error("Chat no encontrado");
  
            const message = await MessageModel.create({
              sender,
              content,
              chat: chatId,
              timestamp: new Date(),
            });
  
            chat.messages.push(message.id);
            await chat.save();
  
            io.to(chatId).emit("receiveMessage", {
              sender,
              content,
              timestamp: message.timestamp,
            });
            console.log("Mensaje enviado:", message);
          } catch (error) {
            console.error("Error al enviar mensaje:", error);
            socket.emit("error", { message: "Error al enviar mensaje" });
          }
        }
      );
  

              // Cargar mensajes previos 

              // Cargar mensajes de un chat específico
    // Cargar mensajes de un chat específico
socket.on("loadMessages", async ({ chatId }: { chatId: string }) => {
    try {
      const messages = await messageService.getChatMessages(chatId);
      socket.emit(
        "messagesLoaded",
        messages.map((msg: IMessage) => ({
          sender: msg.sender,
          receiver: msg.receiver || null,
          content: msg.content,
          timestamp: msg.timestamp,
        }))
      );
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
      socket.emit("error", { message: "Error al cargar mensajes" });
    }
  });
  socket.on('load_user_chats', async ({ senderEmail, receiverEmail }) => {
    try {
      const chat = await ChatModel.findOne({
        participants: { $all: [senderEmail, receiverEmail] },
      }).populate('messages');
  
      if (chat) {
        socket.emit('messagesLoaded', chat.messages);
      } else {
        socket.emit('messagesLoaded', []);
      }
    } catch (error) {
      console.error('Error al cargar los mensajes:', error);
      socket.emit('error', { message: 'Error al cargar los mensajes' });
    }
  });
  


  
  });
}

*/

import { Server, Socket } from "socket.io";
import { MessageModel, IMessage } from "../models/message";
import { userofDB as User } from "../models/user";
import { ChatModel } from "../models/chat";
import { messageService } from "../services/messageService";

interface ConnectedUser {
  socketId: string;
  username: string;
}

export let connectedUsers: ConnectedUser[] = [];

export default function setupSocketIO(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    /**
     * Registrar un usuario como conectado
     */
    socket.on("userConnected", async ({ username }: { username: string }) => {
      try {
        const user = await User.findOne({ username });
        if (user) {
          const isAlreadyConnected = connectedUsers.some(
            (u) => u.username === username
          );

          if (!isAlreadyConnected) {
            connectedUsers.push({ socketId: socket.id, username });
            console.log(`Usuario conectado: ${username}`);
            io.emit(
              "connectedUsers",
              connectedUsers.map(({ username }) => ({ username }))
            );
          } else {
            console.log(`Usuario ya conectado: ${username}`);
          }
        } else {
          console.error("Usuario no encontrado:", username);
          socket.emit("error", { message: "Usuario no encontrado" });
        }
      } catch (error) {
        console.error("Error en userConnected:", error);
        socket.emit("error", { message: "Error al conectar usuario" });
      }
    });

    /**
     * Enviar lista de usuarios conectados
     */
    socket.on("getConnectedUsers", () => {
      socket.emit(
        "connectedUsers",
        connectedUsers.map(({ username }) => ({ username }))
      );
    });

    /**
     * Iniciar o usar un chat único
     */
    socket.on(
      "startUniqueChat",
      async ({
        receiverUsername,
        senderUsername,
      }: {
        receiverUsername: string;
        senderUsername: string;
      }) => {
        try {
          const receiver = connectedUsers.find(
            (user) => user.username === receiverUsername
          );
          const sender = connectedUsers.find(
            (user) => user.username === senderUsername
          );

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
          console.log(`Chat iniciado: ${roomID}`);
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

    /**
     * Unirse a un chat
     */
    socket.on("joinChat", (chatId: string) => {
      try {
        socket.join(chatId);
        console.log(`Usuario ${socket.id} se unió al chat ${chatId}`);
      } catch (error) {
        console.error("Error al unirse al chat:", error);
        socket.emit("error", { message: "Error al unirse al chat" });
      }
    });

    /**
     * Enviar mensaje a un chat
     */
    socket.on(
      "sendMessage",
      async ({ chatId, sender, content }: { chatId: string; sender: string; content: string }) => {
        try {
          const chat = await ChatModel.findById(chatId);
          if (!chat) throw new Error("Chat no encontrado");

          const message = await MessageModel.create({
            sender,
            content,
            chat: chatId,
            timestamp: new Date(),
          });

          chat.messages.push(message.id);
          await chat.save();

          io.to(chatId).emit("receiveMessage", {
            sender,
            content,
            timestamp: message.timestamp,
          });
          console.log(`Mensaje enviado en chat ${chatId}:`, message);
        } catch (error) {
          console.error("Error al enviar mensaje:", error);
          socket.emit("error", { message: "Error al enviar mensaje" });
        }
      }
    );

    /**
     * Cargar mensajes de un chat
     */
    socket.on("loadMessages", async ({ chatId }: { chatId: string }) => {
      try {
        const messages = await messageService.getChatMessages(chatId);
        socket.emit(
          "messagesLoaded",
          messages.map((msg: IMessage) => ({
            sender: msg.sender,
            receiver: msg.receiver || null,
            content: msg.content,
            timestamp: msg.timestamp,
          }))
        );
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
        socket.emit("error", { message: "Error al cargar mensajes" });
      }
    });

    /**
     * Desconexión de un usuario
     */
    socket.on("disconnect", () => {
      connectedUsers = connectedUsers.filter(
        (user) => user.socketId !== socket.id
      );
      console.log(`Usuario desconectado: ${socket.id}`);
      io.emit(
        "connectedUsers",
        connectedUsers.map(({ username }) => ({ username }))
      );
    });
  });
}
