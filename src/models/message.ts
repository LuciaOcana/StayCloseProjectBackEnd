/*import { model,  Schema } from "mongoose";


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

export const postofDB = model<messageInterface>('message',messageSchema)*/

//**gestionar los mensajes enviados entre usuarios */

import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  senderId: { type: String, required: [true, "El campo senderId es obligatorio"], trim:true },
  receiverId: { type: String, required: function() {return !this.groupId; }, trim: true}, //para los mensajes no grupales 
  groupId: { type: String, required:function() { return !this.receiverId; }, trim: true }, //obligarotio si no es un mensaje individual
  content: { type: String, required: [true, "El contenido del mensaje es obligatorio"], maxlength: [500, "El mensaje no puede tener más de 500 caracteres"] },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", MessageSchema);

  