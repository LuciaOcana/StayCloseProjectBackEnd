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

app.use(cors());
app.use(express.json() as RequestHandler);

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