import mongoose, { Schema, Document, Model } from 'mongoose';

// Definición de la interfaz IMessage
export interface IMessage extends Document {
  content: string;
  sender: string;
  timestamp: Date;
}

// Definición del esquema del mensaje
const messageSchema: Schema<IMessage> = new Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Exportar tanto el modelo como la interfaz
export const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
