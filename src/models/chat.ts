import { Schema, model, Document } from "mongoose";

interface ChatInterface extends Document {
  participants: string[]; // Lista de nombres de usuario de los participantes
  messages: string[];     // Lista de IDs de mensajes relacionados con el chat
  isGroupChat: boolean;   // Indica si el chat es grupal
  groupName?: string;     // Nombre del grupo (solo si es grupal)
}

const ChatSchema = new Schema<ChatInterface>({
  participants: [
    { type: String, required: true }, // Guardamos los nombres de usuario
  ],
  messages: [
    { type: Schema.Types.ObjectId, ref: "Message" }, // Relación con los mensajes
  ],
  isGroupChat: { type: Boolean, default: false }, // Nuevo campo para identificar grupos
  groupName: { type: String, required: function () { return this.isGroupChat; } }, // Nombre del grupo, requerido solo si es un grupo
});

export const ChatModel = model<ChatInterface>("Chat", ChatSchema);
