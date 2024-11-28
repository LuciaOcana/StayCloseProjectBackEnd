import express,{RequestHandler} from 'express'
import cors from 'cors'
import http from 'http'
import userRouter from './routes/userRoutes'
import eventRouter from './routes/eventRoutes'
import postRouter from './routes/postRoutes'
import { Server } from 'socket.io'; 
import { run } from './database/databaseConection'
import chatRouter from './routes/chatRoutes'; 

//import './types/express'

const app = express();
const server = http.createServer(app); 

app.use(express.json())


run();


// Middleware
app.use(cors());
app.use(express.json() as RequestHandler);

const PORT = 3000;

app.get('/ping', (_req , res) => {
    console.log('ping recivido correctamente')
    res.send('pinged')
})

//Rutas
app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/events', eventRouter)
app.use('/api/chat', chatRouter); 

app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})