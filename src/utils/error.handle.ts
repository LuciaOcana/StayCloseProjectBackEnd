//Error Manager
import { Response } from "express";

const handleHttp = (res: Response, error: string, errorRaw?: unknown) => {
    console.log(errorRaw);
    
    // Si errorRaw es un Error, podemos acceder a errorRaw.message
    if (errorRaw instanceof Error) {
        console.error("Detalle del error:", errorRaw.message);
    } else {
        console.error("Error desconocido:", errorRaw);
    }

    res.status(500);
    res.send({ error });
};

export { handleHttp };