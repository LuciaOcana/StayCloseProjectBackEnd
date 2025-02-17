import { Request, Response } from "express";
import { messageService } from "../services/messageService";



/**
 * Controlador para enviar un mensaje.
 * Este método maneja la lógica de guardar el mensaje en la base de datos.
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, sender, receiver, content } = req.body;

    console.log(`[INFO] Datos recibidos para enviar el mensaje:`, req.body);

    if (!chatId || !sender || !content) {
      return res.status(400).json({ error: "Datos insuficientes." });
    }
    

    // Guardar el mensaje en la base de datos
    const message = await messageService.sendMessage(
      chatId,
      sender,
      receiver || null,
      content
    );

    console.log(`[OK] Mensaje guardado en la base de datos:`, message);

    // Emitir el evento de nuevo mensaje al chat
    req.app.get("socketio").to(chatId).emit("newMessage", message);

    console.log(`[OK] Evento 'newMessage' emitido al chatId:`, chatId);

    return res.status(201).json(message);
  } catch (error) {
    console.error(`[ERROR] Error al enviar el mensaje:`, error);
    return res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
};




/*
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, sender, content,receiver } = req.body;

    console.log(`[INFO] Datos recibidos para enviar el mensaje:`, req.body);

    // Guardar el mensaje en la base de datos
   const message = await messageService.sendMessage(chatId, sender, receiver, content);
   //const message = await messageService.sendMessage(chatId, sender, "", content); // No es necesario "receiver" en grupos

    console.log(`[OK] Mensaje guardado en la base de datos:`, message);

    // Emitir el evento de nuevo mensaje al chat
    req.app.get("socketio").to(chatId).emit("newMessage", message);

    console.log(`[OK] Evento 'newMessage' emitido al chatId:`, chatId);

    return res.status(201).json(message);
  } catch (error) {
    console.error(`[ERROR] Error al enviar el mensaje:`, error);
    return res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
};
*/

/*
export const sendMessage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { chatId, sender, receiver, content } = req.body;
    console.log(`[INFO] Datos recibidos para enviar el mensaje:`, req.body);

    if (!chatId || !sender || !receiver || !content) {
      console.error("[ERROR] Faltan datos en la solicitud:", { chatId, sender, receiver, content });
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
    console.log("[INFO] Datos recibidos para enviar el mensaje:", { chatId, sender, receiver, content });

    const message = await messageService.sendMessage(chatId, sender, receiver, content);
    console.log("[OK] Mensaje enviado exitosamente:", message);
    return res.status(201).json({
      message: "Mensaje enviado exitosamente.",
      data: message,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al enviar el mensaje:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.error("Error desconocido al enviar el mensaje:", error);
    return res.status(500).json({ error: "Error interno al enviar el mensaje." });
  }
};
*/

export const getChatMessages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ error: "El ID del chat es obligatorio." });
    }

    const messages = await messageService.getChatMessages(chatId);

    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "No se encontraron mensajes para este chat." });
    }

    return res.status(200).json(messages);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al obtener los mensajes del chat:", error.message);
      return res.status(500).json({ error: error.message });
    }
    console.error("Error desconocido al obtener los mensajes del chat:", error);
    return res.status(500).json({ error: "Error interno al obtener los mensajes del chat." });
  }
};
