import { model, ObjectId, Schema } from "mongoose";
import { userofDB } from './user';

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

export const chatofDB = model<chatInterface>('chat',chatSchema)