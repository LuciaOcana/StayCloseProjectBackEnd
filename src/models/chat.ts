
/*
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

*/

/*
import { Schema, model, Document } from "mongoose";

interface ChatInterface extends Document {
  messages: string[];
}

const ChatSchema = new Schema<ChatInterface>({
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

export const ChatModel = model<ChatInterface>("Chat", ChatSchema);
*/

import { Schema, model, Document } from "mongoose";

interface ChatInterface extends Document {
  participants: string[]; // Lista de nombres de usuario de los participantes
  messages: string[];     // Lista de IDs de mensajes relacionados con el chat
}

const ChatSchema = new Schema<ChatInterface>({
  participants: [
    { type: String, required: true }, // Guardamos los nombres de usuario
  ],
  messages: [
    { type: Schema.Types.ObjectId, ref: "Message" }, // Relación con los mensajes
  ],
});

export const ChatModel = model<ChatInterface>("Chat", ChatSchema);
