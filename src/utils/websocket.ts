import { WebSocketServer } from "ws";
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
