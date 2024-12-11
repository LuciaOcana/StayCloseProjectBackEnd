import { Server } from "socket.io";
import http from "http";

export const initializeSocketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Configurar según sea necesario
    },
  });

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("message", (data) => {
      console.log("Mensaje recibido:", data);
      io.emit("newMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });

  return io;
};
