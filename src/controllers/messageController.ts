import { Request, Response } from "express";
import { messageService } from "../services/messageService";
/*

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, sender, content, receiver } = req.body;
    const message = await messageService.sendMessage(chatId, sender, content, receiver);
    return res.status(201).json(message);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
*/

export const sendMessage = async (req: Request, res: Response) => {
    try {
      const { chatId, sender, content, receiver } = req.body;
      const message = await messageService.sendMessage(chatId, sender, receiver, content);
      return res.status(201).json(message);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  

export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.getChatMessages(chatId);
    return res.status(200).json(messages);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
