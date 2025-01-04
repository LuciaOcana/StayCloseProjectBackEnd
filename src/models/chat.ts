/*import { model,  Schema } from "mongoose";


export interface chatInterface{
    //chatID: string, *¿PONEMOS UNA ID NOSOTRAS O ESCOGEMOS LA QUE ASIGNA MONGO POR DEFECTO?* 
    chatType: boolean,
    participants: []
}

export type newChatInfo = Omit<chatInterface,'id'>

export const chatSchema = new Schema<chatInterface>({
    chatType: { type: Boolean, required: true },
    participants: [{ type: String }]
})

export const chatofDB = model<chatInterface>('chat',chatSchema)*/

//***********Para manejar las conversaciones 


import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  name?: string;
  isGroup: boolean;
  participants: string[];
}

const ChatSchema: Schema = new Schema({
  name: { type: String, required: false },
  isGroup: { type: Boolean, required: true },
  participants: { type: [String], required: true },
});

export default mongoose.model<IChat>("Chat", ChatSchema);
