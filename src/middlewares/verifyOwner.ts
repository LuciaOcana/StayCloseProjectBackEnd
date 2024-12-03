import { Request, Response, NextFunction } from 'express';
//import * as userServices from "../services/userServices";
import { handleHttp } from '../utils/error.handle'

export const verifyOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log('Verifying Ownership');
        const userIdtoActOn = req.params.id; //Id del usuari objecte
        //const username = req.user.username; //Username del usuari que ens ofereix el token
        const id = req.user.id;
        console.log(id);
        //const user = await userServices.getEntries.findUserByUsername(username);
        //const userId = user?.id;
        //comporbe, si el usuari del token es el matiex que el de la id de la peticio
        if(id === userIdtoActOn){
            return next();
        }
        return res.json('You are not the owner');
    }catch(error){
        handleHttp(res, 'Error verifying ownership', error);
    }
}