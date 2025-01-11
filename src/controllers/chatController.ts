import { Request, Response } from "express";
import { chatService } from "../services/chatServices"

export const createChat = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const chat = await chatService.createChat(participants);
    return res.status(201).json(chat);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chats = await chatService.getUserChats(userId);
    return res.status(200).json(chats);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
