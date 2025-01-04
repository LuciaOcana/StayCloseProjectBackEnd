// para manejar los mensajes 
import Message, { IMessage } from "../models/message";


// Validar mensaje
const validateMessage = (message: IMessage): void => {
    if (!message.senderId) {
      throw new Error("El campo senderId es obligatorio");
    }
    if (!message.receiverId && !message.groupId) {
      throw new Error("Debe proporcionar receiverId o groupId");
    }
    if (!message.content || message.content.trim() === "") {
      throw new Error("El contenido del mensaje no puede estar vacío");
    }
    if (message.content.length > 500) {
      throw new Error("El contenido del mensaje no puede superar los 500 caracteres");
    }
  };

// Guardar mensaje
export const saveMessage = async (message: IMessage): Promise<IMessage> => {
    try {
        // Validación
        validateMessage(message);
        console.log("Guardando mensaje en la base de datos:", message);
        const newMessage = new Message(message);
        const savedMessage = await newMessage.save();
        console.log("Mensaje guardado con éxito:", savedMessage);
        return savedMessage;
    } catch (error) {
        console.error("Error al guardar el mensaje:", error);
    throw error;
    }
 
};

// Obtener mensajes por chat ID
export const getMessagesByChatId = async (chatId: string): Promise<IMessage[]> => {
    try {
      console.log("Buscando mensajes para el chat ID:", chatId);
  
      const messages = await Message.find({
        $or: [{ receiverId: chatId }, { groupId: chatId }],
      });
  
      console.log("Mensajes encontrados:", messages);
      return messages;
    } catch (error) {
      console.error("Error al obtener mensajes por chat ID:", error);
      throw error;
    }
  };

