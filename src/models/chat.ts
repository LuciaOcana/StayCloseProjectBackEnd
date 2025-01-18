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
