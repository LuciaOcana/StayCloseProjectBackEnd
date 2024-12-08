import { model,  Schema, Document } from "mongoose";
import {userInterface} from './user';
import { IMessage } from './message'; 



//interface
export interface chatInterface extends Document{
    //chatID: string, *¿PONEMOS UNA ID NOSOTRAS O ESCOGEMOS LA QUE ASIGNA MONGO POR DEFECTO?* 
    name:string; //nombre del chat
    users:userInterface[];//Relacion con los usuarios
    chatType: boolean; //tipo privado/grupal
    participants: string []; //array de la lista de participantes
    messages:IMessage[];//Mensajes del chat
    
}

export const chatSchema = new Schema<chatInterface>({
    name:{ type:String,required:true},//nombre del chat "Mani 25N"
    chatType: { type: Boolean, required: true }, //privvado individual
    participants: [{ type: String }], //Username de los participantes 
    messages: [{ type: Schema.Types.ObjectId, ref: "ChatMessage" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User ", required: true }],
},
{ timestamps:true}
);

export const Chat = model<chatInterface>('Chat',chatSchema)