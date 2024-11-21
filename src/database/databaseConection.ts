import { connect, connection } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

// Use the DB_HOST variable from the environment variables 
const dbHost = process.env.DB_HOST || 'localhost'; 
const mongoDB = `mongodb://${dbHost}:27017/StayCloseApp`;

export async function run() {
    await connect(mongoDB)
    .then(()=>{
        console.log('Database connected!!')
    }) .catch((err)=>{
        console.error(err)
    });

}
export function endConn() {
    connection.close()
};