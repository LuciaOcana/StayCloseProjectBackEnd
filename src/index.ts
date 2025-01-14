import express,{RequestHandler} from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'
import eventRouter from './routes/eventRoutes'
import postRouter from './routes/postRoutes'
import ubiRouter from './routes/ubiRoutes'
import chatRouter from './routes/chatRoutes'
import { run } from './database/databaseConection'
import { Server as SocketIOServer } from 'socket.io'
import { createServer } from 'http'
import setupSocketIO from "./utils/socket";
import socketioRoutes from "./routes/socketioRoutes";
import messageRouter from "./routes/messageRoutes";
//import './types/express'

const app = express()
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'],
    },
  });

setupSocketIO(io);
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
app.use("/api", socketioRoutes);
app.use("/api/message", messageRouter);

/* app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})
    */
httpServer.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
  });

