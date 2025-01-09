import express,{RequestHandler} from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'
import eventRouter from './routes/eventRoutes'
import postRouter from './routes/postRoutes'
import ubiRouter from './routes/ubiRoutes'
import chatRouter from './routes/chatRoutes'
import { run } from './database/databaseConection'
import { Server as SocketIOServer } from 'socket.io'
//import { chatService } from './services/chatServices'
import { createServer } from 'http'
//import './types/express'

const app = express()
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*', // Cambia esto a tu dominio en producción
      methods: ['GET', 'POST'],
    },
  });

app.use(cors());
app.use(express.json())
run();
app.use(express.json() as RequestHandler);



const PORT = 3000;

app.get('/ping', (_req , res) => {
    console.log('ping recivido correctamente')
    res.send('pinged')
})

app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/events', eventRouter)
app.use('/api/ubi', ubiRouter)
app.use('/api/chat', chatRouter)

/* app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})
    */
httpServer.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
  });
// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);
  
    socket.on('sendMessage', async ({ chatId, sender, content }) => {
        console.log("nuevo mensaje", content, chatId, sender);
      try {
//        const chat = await chatService.sendMessage(chatId, sender, content);
        //io.to(chatId).emit('receiveMessage', chat.messages[chat.messages.length - 1]); // Emitir solo el último mensaje
        io.emit("receiveMessage", content);
        console.log("EMIT!!!!!!");
        //console.log(chat);

      } catch (error) {
        if (error instanceof Error) {

        console.error('Error al guardar el mensaje:', error.message);
        } else {

            console.error('Error desconocido al guardar el mensaje:', error);

        }
      }
    });
  
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`Usuario ${socket.id} se unió al chat ${chatId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
