import { model, ObjectId, Schema } from "mongoose";
import { userofDB } from './user';

export interface messageInterface{
    //messageID: string, *¿PONEMOS UNA ID NOSOTRAS O ESCOGEMOS LA QUE ASIGNA MONGO POR DEFECTO?* 
    author: Schema.Types.ObjectId,
    message: string,
    shippingDate: Date
}

export type newMessageInfo = Omit<messageInterface,'id'>

export const messageSchema = new Schema<messageInterface>({
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
    shippingDate: { type: Date, required: true }
})

export const postofDB = model<messageInterface>('message',messageSchema)