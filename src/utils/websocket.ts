/*import { WebSocketServer } from "ws";
import Message from "../models/message";


// Inicializar WebSocket Server
export const initializeWebSocket = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("Nuevo cliente conectado");

    ws.on("message", async (messageData) => {
      try {
        const message = JSON.parse(messageData.toString());

        // Validar mensaje
        if (!message.senderId) {
          throw new Error("El campo senderId es obligatorio");
        }
        if (!message.receiverId && !message.groupId) {
          throw new Error("Debe proporcionar receiverId o groupId");
        }
        if (!message.content || message.content.trim() === "") {
          throw new Error("El contenido del mensaje no puede estar vacío");
        }
        if (message.content.length > 500) {
          throw new Error("El contenido del mensaje no puede superar los 500 caracteres");
        }

        // Guardar mensaje en la base de datos
        const savedMessage = await new Message({
          senderId: message.senderId,
          receiverId: message.receiverId || null,
          groupId: message.groupId || null,
          content: message.content,
          timestamp: new Date(),
        }).save();

        console.log("Mensaje guardado en WebSocket:", savedMessage);

        // Retransmitir mensaje a todos los clientes conectados
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(savedMessage));
          }
        });
      } catch (error: any) {
        console.error("Error al procesar mensaje:", error.message);

        // Enviar error al cliente que envía el mensaje
        ws.send(
          JSON.stringify({
            error: true,
            message: error.message,
          })
        );
      }
    });

    ws.on("close", () => {
      console.log("Cliente desconectado");
    });
  });

  console.log(`WebSocket Server escuchando en el puerto ${port}`);
  return wss;
};
*/

/*
import { WebSocketServer } from "ws";
import Message from "../models/message";
import { userofDB } from '../models/user';

// Inicializar WebSocket Server
export const initializeWebSocket = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  // Mapa para rastrear la conexión de usuarios
  const userConnections = new Map<string, any>();

  wss.on("connection", async (ws, req) => {
    console.log("Nuevo cliente conectado");

    // Obtener el userId de las query params o encabezados (si se necesita identificar al usuario)
    const userId = req.headers['user-id'] as string; // Asegúrate de enviar el userId en el encabezado o query param

    if (userId) {
      // Registrar la conexión del usuario y marcarlo como online
      userConnections.set(userId, ws);
      await userofDB.findByIdAndUpdate(userId, { online: true });
      console.log(`Usuario ${userId} está conectado.`);
    }

    ws.on("message", async (messageData) => {
      try {
        const message = JSON.parse(messageData.toString());

        if (message.type === "status" && message.userId) {
          // Cambiar estado de usuario a "online"
          await userofDB.findByIdAndUpdate(message.userId, { online: true });
          console.log(`Usuario ${message.userId} está conectado.`);
        }

        if (message.type === "message") {
          // Validar mensaje
          if (!message.senderId) throw new Error("El campo senderId es obligatorio");
          if (!message.receiverId && !message.groupId)
            throw new Error("Debe proporcionar receiverId o groupId");
          if (!message.content || message.content.trim() === "")
            throw new Error("El contenido del mensaje no puede estar vacío");
          if (message.content.length > 500)
            throw new Error("El contenido del mensaje no puede superar los 500 caracteres");

          // Guardar mensaje en la base de datos
          const savedMessage = await new Message({
            senderId: message.senderId,
            receiverId: message.receiverId || null,
            groupId: message.groupId || null,
            content: message.content,
            timestamp: new Date(),
          }).save();

          console.log("Mensaje guardado en WebSocket:", savedMessage);

          // Retransmitir mensaje al receptor o grupo
          if (message.receiverId && userConnections.has(message.receiverId)) {
            const receiverWs = userConnections.get(message.receiverId);
            if (receiverWs && receiverWs.readyState === ws.OPEN) {
              receiverWs.send(JSON.stringify(savedMessage));
            }
          }

          // Enviar a todos en un grupo si aplica
          if (message.groupId) {
            wss.clients.forEach((client) => {
              if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(savedMessage));
              }
            });
          }
        }
      } catch (error: any) {
        console.error("Error al procesar mensaje:", error.message);

        // Enviar error al cliente que envía el mensaje
        ws.send(
          JSON.stringify({
            error: true,
            message: error.message,
          })
        );
      }
    });

    ws.on("close", async () => {
      console.log("Cliente desconectado");

      // Identificar al usuario desconectado
      const disconnectedUser = [...userConnections.entries()].find(([_id, connection]) => connection === ws);
      if (disconnectedUser) {
        const [userId] = disconnectedUser;
        // Marcar al usuario como offline
        await userofDB.findByIdAndUpdate(userId, { online: false });
        userConnections.delete(userId);
        console.log(`Usuario ${userId} está desconectado.`);
      }
    });
  });

  console.log(`WebSocket Server escuchando en el puerto ${port}`);
  return wss;
};

*/

import { WebSocketServer } from "ws";
import Message from "../models/message";
import { userofDB } from "../models/user";

// Inicializar WebSocket Server
export const initializeWebSocket = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  // Mapa para rastrear conexiones activas de usuarios
  const userConnections = new Map<string, any>();

  wss.on("connection", async (ws, req) => {
    console.log("Nuevo cliente conectado");

    const userId = req.headers['user-id'] as string;

    if (userId) {
      // Marcar al usuario como online
      userConnections.set(userId, ws);
      await userofDB.findByIdAndUpdate(userId, { online: true });
      console.log(`Usuario ${userId} conectado.`);
    }

    ws.on("message", async (messageData) => {
      try {
        const message = JSON.parse(messageData.toString());

        if (message.type === "status" && message.userId) {
          // Cambiar estado a online
          await userofDB.findByIdAndUpdate(message.userId, { online: true });
          console.log(`Usuario ${message.userId} está conectado.`);
        }

        if (message.type === "message") {
          // Validar mensaje
          if (!message.senderId) throw new Error("El campo senderId es obligatorio");
          if (!message.receiverId && !message.groupId)
            throw new Error("Debe proporcionar receiverId o groupId");
          if (!message.content || message.content.trim() === "")
            throw new Error("El contenido del mensaje no puede estar vacío");

          // Guardar mensaje
          const savedMessage = await new Message({
            senderId: message.senderId,
            receiverId: message.receiverId || null,
            groupId: message.groupId || null,
            content: message.content,
            timestamp: new Date(),
          }).save();

          console.log("Mensaje guardado:", savedMessage);

          // Enviar mensaje al receptor
          if (message.receiverId && userConnections.has(message.receiverId)) {
            const receiverWs = userConnections.get(message.receiverId);
            if (receiverWs && receiverWs.readyState === ws.OPEN) {
              receiverWs.send(JSON.stringify(savedMessage));
            }
          }

          // Enviar a todos los clientes si es un grupo
          if (message.groupId) {
            wss.clients.forEach((client) => {
              if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(savedMessage));
              }
            });
          }
        }
      } catch (error: any) {
        console.error("Error al procesar mensaje:", error.message);
        ws.send(JSON.stringify({ error: true, message: error.message }));
      }
    });

    ws.on("close", async () => {
      console.log("Cliente desconectado");
      const disconnectedUser = [...userConnections.entries()].find(
        ([_id, connection]) => connection === ws
      );
      if (disconnectedUser) {
        const [userId] = disconnectedUser;
        await userofDB.findByIdAndUpdate(userId, { online: false });
        userConnections.delete(userId);
        console.log(`Usuario ${userId} desconectado.`);
      }
    });
  });

  console.log(`WebSocket Server escuchando en el puerto ${port}`);
  return wss;
};
