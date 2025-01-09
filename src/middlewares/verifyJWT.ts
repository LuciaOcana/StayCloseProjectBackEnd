import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handle'

interface IPayload {
    id: string,
    username: string;
    isAdmin: boolean; // Añade el campo isAdmin al payload
    iat: number;
    exp: number;
}

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Verifying token');

    /*
    //Recollim token de la header
    const token = req.header('auth-token');
    //Comporbem la validesa del token
    if(!token) return handleHttp(res, 'Access denied', 'No token provided');
    try{
        const payload = jwt.verify(token, process.env.SECRET || 'token') as IPayload;
        req.user = payload;
        console.log(payload);
        next();
    }catch (error) {
        handleHttp(res, 'Your token is not valid', error);
    }
        */

    // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return handleHttp(res, 'Access denied', 'No token provided or invalid format');

  }



  // Extraer el token después de 'Bearer '
  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const payload = jwt.verify(token, process.env.SECRET || 'token') as IPayload;
    req.user = payload; // Adjuntar el payload al objeto de la solicitud
    console.log('Token payload:', payload);
    

    next(); // Continuar al siguiente middleware
  } catch (error) {
    console.error('Token verification error:', error);
    return handleHttp(res, 'Unauthorized', 'Your token is not valid');
  }
}