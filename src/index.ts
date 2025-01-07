import express,{RequestHandler} from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'
import eventRouter from './routes/eventRoutes'
import postRouter from './routes/postRoutes'
import ubiRouter from './routes/ubiRoutes'
import { run } from './database/databaseConection'
import chatRoutes from "./routes/chatRoutes"
import messageRoutes from "./routes/messageRoutes"
import { initializeWebSocket } from './utils/websocket'
//import './types/express'

const app = express()
app.use(express.json())
run();

app.use(express.json() as RequestHandler);

//comfiguracion del CORS
app.use(
    cors({
      origin: '*', // Frontend y WebSocket
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    })
  );

// Manejo de solicitudes OPTIONS
app.options('*', cors({
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Middleware para manejar solicitudes OPTIONS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

  

const PORT = 3000;

//Ruta de prueba
app.get('/ping', (_req , res) => {
    console.log('ping recivido correctamente')
    res.send('pinged')
})

//configuracion de rutas 

app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/events', eventRouter)
app.use('/api/ubi', ubiRouter)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)

//puerto del servidor HTTP(Express)
app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})
//Conexion con weSocket 
// Inicializar WebSocket en el puerto 8080
initializeWebSocket(8080);