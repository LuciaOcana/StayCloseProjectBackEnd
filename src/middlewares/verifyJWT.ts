import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handle'

interface IPayload {
    username: string;
    isAdmin: boolean; // Añade el campo isAdmin al payload
    iat: number;
    exp: number;
}

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Verifying token');
    //Recollim token de la header
    const token = req.header('auth-token');
    //Comporbem la validesa del token
    if(!token) return handleHttp(res, 'Access denied', 'No token provided');
    try{
        const payload = jwt.verify(token, process.env.SECRET || 'token') as IPayload;
        req.user = payload;
        next();
    }catch (error) {
        handleHttp(res, 'Your token is not valid', error);
    }
}