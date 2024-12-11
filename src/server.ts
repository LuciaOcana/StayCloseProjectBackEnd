import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

// Crear servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Configurar según sea necesario
  },
});

// Configurar eventos de conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  // Escuchar evento de mensaje
  socket.on("message", (data) => {
    console.log("Mensaje recibido:", data);
    // Emitir el mensaje a todos los clientes conectados
    io.emit("newMessage", data);
  });

  // Manejar desconexión
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
