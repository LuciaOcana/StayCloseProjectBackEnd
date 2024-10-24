import { Request, Response, NextFunction } from 'express';

export const AdminValidation = (req: Request, res: Response, next: NextFunction)=> {
    console.log('Verifying Admin');
    try{
        //Recollim les dades del payload del token
        const admin = req.user.admin;
        if(admin != true){
            return res.json('Ypu are not an Admin');
        }
        return next();
    }catch{
        return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
    }
}