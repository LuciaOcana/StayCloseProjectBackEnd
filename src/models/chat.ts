import { model, Schema, Document } from 'mongoose';
import { userInterface } from './user';
import { IMessage } from './message';

// Definición de la interfaz chatInterface
export interface chatInterface extends Document {
  name: string;
  users: userInterface[];
  chatType: boolean;
  participants: string[];
  messages: IMessage[];
}

// Definición del esquema del chat
const chatSchema: Schema<chatInterface> = new Schema(
  {
    name: { type: String, required: true },
    chatType: { type: Boolean, required: true },
    participants: [{ type: String }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  {
    timestamps: true,
  }
);

// Exportar el modelo Chat
export const Chat = model<chatInterface>('Chat', chatSchema);
export default Chat;
