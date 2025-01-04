//Para procesar los mensjaes individuales y grupales 

import { Request, Response } from "express";
import { saveMessage, getMessagesByChatId } from "../services/messageServices";

/*export const sendMessage = async (req: Request, res: Response) => {
 /* try {
    console.log("Nuevo mensaje recibido:", req.body);
    const message = await saveMessage(req.body);
    console.log("Mensaje guardado:", message);
    res.status(201).json(message);
  } catch (error) {
    
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
    try {
        // Guardar mensaje
        const message = await saveMessage(req.body);
        res.status(201).json(message);
      } catch (error) {
        console.error("Error al enviar el mensaje:", error.message);
    
        // Responder con error de validación
        res.status(400).json({ error: error.message });
      }

};*/

export const sendMessage = async (req: Request, res: Response) => {
    try {
      console.log("Nuevo mensaje recibido:", req.body);
  
      // Guardar mensaje a través del servicio
      const message = await saveMessage(req.body);
  
      console.log("Mensaje guardado exitosamente:", message);
      return res.status(201).json(message);
    } catch (error: any) {
      console.error("Error al enviar el mensaje:", error.message);
  
      // Responder con error de validación o interno
      if (error.message.includes("validación")) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno al enviar el mensaje" });
    }
  };
  

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    console.log("Obteniendo mensajes para el chat ID:", chatId);

    const messages = await getMessagesByChatId(chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
};

