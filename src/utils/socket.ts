/*import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/message";
import { userofDB, ConnectedUser} from "../models/user";
import { ChatModel } from "../models/chat";





// Lista de usuarios conectados
export let connectedUsers: ConnectedUser[] = [];


// ====================== FUNCIONES AUXILIARES ======================

/*** Añade un usuario conectado a la lista.

const addConnectedUser = (username: string, socketId: string, io:Server): void => {
  const existingUser = connectedUsers.find((user) => user.username === username);
  if (!existingUser) {
    connectedUsers.push({ username, socketId });
    console.log(`Usuario añadido a la lista de conectados: ${username}`);
    //io.emit("ConnectedUser", connectedUsers);
  } else {
    existingUser.socketId = socketId;
    console.log(`Socket actualizado para el usuario: ${username}`);
  }
  io.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));


};
  

/*** Elimina un usuario de la lista de conectados.

const removeConnectedUser = ( socketId: string, io: Server): void => {
    connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
  console.log(`Usuario con socket ${socketId} desconectado.`);
  io.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
  };
  


/**
 * Obtiene un usuario conectado por su nombre de usuario.
 

const getUserByUsername = (username: string): ConnectedUser | undefined => {
  return connectedUsers.find((user) => user.username === username);
};

/**
 * Obtiene un usuario conectado por email
 */
/*
const getUserByEmail = (email: string) =>
    connectedUsers.find((user) => user.email === email);
*/

/** Busca un usuario conectado por su socket ID. */
// const getUserBySocketId = (socketId: string): ConnectedUser | undefined => {
   // return connectedUsers.find((user) => user.socketId === socketId);
  //};

  // ====================== MANEJADORES DE EVENTOS ======================

/**
 * Configuración del socket.io
 
export default function setupSocketIO(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    /* Evento: Obtener lista de usuarios conectados
    
   socket.on("getConnectedUsers", () => {
    socket.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
   });

    // Evento: Registrar un usuario como conectado
    socket.on("userConnected", async ({ username }: { username: string }) => {
        try {
          if (!username ) {
            console.error("Datos incompletos: username.");
            return;
          }
      
          const user = await userofDB.findOne({ username }); // Busca el usuario por email en la base de datos
          if (user) {
            addConnectedUser(username, socket.id, io); // Añade a la lista de conectados
            console.log(`Usuario conectado: ${username}`);
      
            // Emite la lista actualizada de usuarios conectados a todos los clientes
            io.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
          } else {
            console.error(`Usuario con username ${username} no encontrado en la base de datos.`);
          }
        } catch (error) {
          console.error("Error en userConnected:", error);
        }
      });
      
      

     // Evento: Unirse a un chat
     socket.on("joinChat", async (chatId: string) => {
        try {
          const chat = await ChatModel.findById(chatId);
          if (!chat) {
            console.error(`Chat ${chatId} no encontrado.`);
            socket.emit("error", { message: "Chat no encontrado" });
            return;
          }
          socket.join(chatId);
          console.log(`Usuario ${socket.id} se unió al chat ${chatId}`);
        } catch (error) {
          console.error("Error al unirse al chat:", error);
        }
      });
    
    //**Construyendo */
    /*
    socket.on("sendMessage", ({ chatId, sender, receiver, content }) => {
        console.log("Mensaje recibido en el servidor:", { chatId, sender, receiver, content });
        const receiverUser = getUserByUsername(receiver);
        if (receiverUser) {
          io.to(receiverUser.socketId).emit("receiveMessage", {
            chatId,
            sender,
            receiver,
            content,
            timestamp: new Date(),
          });
          console.log(`Mensaje enviado a ${receiver}: ${content}`);
        } else {
          console.error(`El usuario receptor ${receiver} no está conectado.`);
        }
      });
      */
     /*
      socket.on("sendMessage", async ({ chatId, sender, receiver, content }) => {
        console.log(`[INFO] Mensaje recibido del cliente: ${content}`);
        try {
          const chat = await ChatModel.findById(new Types.ObjectId(chatId));
          if (!chat) {
            console.error(`Chat ${chatId} no encontrado.`);
            socket.emit("error", { message: "Chat no encontrado" });
            return;
          }
  
          const message = await MessageModel.create({
            sender,
            receiver,
            content,
            chat: chatId,
            timestamp: new Date(),
          });
  
          chat.messages.push(message.id);
          await chat.save();
  
          const receiverUser = getUserByUsername(receiver);
          if (receiverUser) {
            io.to(receiverUser.socketId).emit("receiveMessage", message);
          }
  
          console.log(`Mensaje enviado de ${sender} a ${receiver}: ${content}`);
        } catch (error) {
          console.error("Error al enviar mensaje:", error);
        }
      });

      
      socket.on("sendMessage", async ({ chatId, sender, receiver, content }) => {
        console.log(`[INFO] Mensaje recibido del cliente: ${content}`);
        try {
          // Buscar el ObjectId del remitente (sender)
          const senderUser = await userofDB.findOne({ username: sender });
          if (!senderUser) {
            console.error(`Usuario remitente ${sender} no encontrado.`);
            socket.emit("error", { message: "Usuario remitente no encontrado." });
            return;
          }
      
          // Buscar el ObjectId del receptor (receiver)
          const receiverUser = await userofDB.findOne({ username: receiver });
          if (!receiverUser) {
            console.error(`Usuario receptor ${receiver} no encontrado.`);
            socket.emit("error", { message: "Usuario receptor no encontrado." });
            return;
          }
      
          // Crear el mensaje
          const message = await MessageModel.create({
            chat: chatId,
            sender: senderUser._id, // ObjectId del remitente
            receiver: receiverUser._id, // ObjectId del receptor
            content: content,
            timestamp: new Date(),
          });
      
          console.log(`[SUCCESS] Mensaje enviado: ${message}`);
      
          // Emitir el mensaje al receptor si está conectado
          const receiverSocket = getUserByUsername(receiver)?.socketId;
          if (receiverSocket) {
            io.to(receiverSocket).emit("receiveMessage", message);
          }
        } catch (error) {
          console.error(`[ERROR] Error al enviar mensaje: ${error}`);
          socket.emit("error", { message: "Error al enviar mensaje." });
        }
      });
      

    
      
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
            console.log(
              `[INFO] Buscando chat único entre ${senderUsername} y ${receiverUsername}`
            );
      
            // Buscar usuarios en la base de datos
            const sender = await userofDB.findOne({ username: senderUsername });
            const receiver = await userofDB.findOne({ username: receiverUsername });
      
            if (!sender || !receiver) {
              socket.emit("error", { message: "Uno o ambos usuarios no existen." });
              return;
            }
      
            // Verificar si existe un chat previo
            const existingChat = await ChatModel.findOne({
              participants: { $all: [sender._id, receiver._id] },
            });
      
            if (existingChat) {
              console.log(`[SUCCESS] Chat existente encontrado: ${existingChat._id}`);
              socket.emit("openChat", { chatId: existingChat._id });
            } else {
              // Crear un nuevo chat
              console.log(
                `[INFO] Creando nuevo chat entre ${senderUsername} y ${receiverUsername}`
              );
      
              const newChat = await ChatModel.create({
                participants: [sender._id, receiver._id],
                messages: [],
              });
      
              console.log(`[SUCCESS] Nuevo chat creado: ${newChat._id}`);
              socket.emit("openChat", { chatId: newChat._id });
            }
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
          .sort({timeStamp: 1}) ///orden ascendente
          .populate("sender", "username")
          .populate("receiver", "username");
        socket.emit("messagesLoaded", messages);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
        socket.emit("error", { message: "Error al cargar mensajes" });
      }
    });

    // Evento: Desconectar usuario
    socket.on("disconnect", () => {
      console.log("Socket desconectado:", socket.id);

       // Remover usuario del array de usuarios conectados
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socket.id);

      removeConnectedUser(socket.id, io);
      //io.emit("connectedUsers", connectedUsers); //enviar lista actualizada 
      //console.log(`usuarios conectados actuales `, connectedUsers);
      io.emit("connectedUsers", connectedUsers.map(({ username }) => ({ username })));
      console.log(`Usuarios conectados actuales:`, connectedUsers);
    });
  });
}

*/