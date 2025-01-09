import { Schema, model, Types, Document} from 'mongoose';

interface IMessage {
  sender: Types.ObjectId; // ID del usuario que envió el mensaje
  content: string;
  timestamp: Date;
}

interface IChat extends Document{
  participants:Types.ObjectId[]; // ListaIDs de los participantes
  messages: IMessage[];
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
  messages: [messageSchema],
});

export const ChatModel = model<IChat>('Chat', chatSchema);
