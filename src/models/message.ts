import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    sender: string;
    timestamp: Date;
  }

  const messageSchema = new Schema<IMessage>({
    content: { type: String, required: true },
    sender: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  export const ChatMessage = model<IMessage>('Message', messageSchema);

/*
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

export const ChatMessage = model<messageInterface>('message',messageSchema)
*/