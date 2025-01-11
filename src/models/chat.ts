import { Schema, model, Types, Document } from "mongoose";

// Interfaz de Chat
export interface IChat extends Document {
  participants: Types.ObjectId[]; // IDs de los usuarios que participan en el chat
  createdAt: Date; // Fecha de creación del chat
  messages: Types.ObjectId[]; 
}

// Esquema de Chat
const chatSchema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: "user", required: true }], // Usuarios en el chat
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  createdAt: { type: Date, default: Date.now },
});

// Modelo de Chat
export const ChatModel = model<IChat>("Chat", chatSchema);
