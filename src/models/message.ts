
import { Schema, model, Document } from "mongoose";

interface MessageInterface extends Document {
  sender: string;
  receiver: string;
  content: string;
  chat: string;
  timestamp: Date;
}
const MessageSchema = new Schema<MessageInterface>({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  chat: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const MessageModel = model<MessageInterface>("Message", MessageSchema);
