import express from "express";
import http from "http";
import { initializeSocketServer } from "./services/socketService";


const app = express();
const PORT = 3000;

// Crear servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO desde el servicio
initializeSocketServer(server);

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
