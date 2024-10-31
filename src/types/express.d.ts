//import { Request } from 'express';
import { IPayload } from './IPayload';  // La interfaz que define el payload

declare global {
  namespace Express {
      interface Request {
        user?: IPayload;  // Aquí defines que req.user será de tipo IPayload
      }
  }
}