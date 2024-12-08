import express,{RequestHandler} from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'
//import eventRouter from './routes/eventRoutes'
import postRouter from './routes/postRoutes'
import { run } from './database/databaseConection'
//import './types/express'
import chatRoutes from "./routes/chatRoutes"

const app = express()
app.use(express.json())
run();

app.use(cors());
app.use(express.json() as RequestHandler);
app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/chat', chatRoutes); 
//app.use('/api/events', eventRouter)

const PORT = 3000;

app.get('/ping', (_req , res) => {
    console.log('ping recivido correctamente')
    res.send('pinged')
})

app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})