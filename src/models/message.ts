import { Schema, model, Types, Document } from "mongoose";

// Interfaz de Mensaje
export interface IMessage extends Document {
  sender: Types.ObjectId; // ID del usuario que envió el mensaje
  receiver: Types.ObjectId; // ID del usuario que recibe el mensaje (opcional para chats grupales)
  content: string; // Contenido del mensaje
  timestamp: Date; // Fecha y hora del mensaje
  chat: Types.ObjectId; // Referencia al chat al que pertenece el mensaje
  roomID:string;
}

// Esquema de Mensaje
const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "user", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "user", required: false }, // Opcional
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true }, // Relación con el modelo Chat
  roomID: { type: String, required: false }, 
});

// Modelo de Mensaje
export const MessageModel = model<IMessage>("Message", messageSchema);
