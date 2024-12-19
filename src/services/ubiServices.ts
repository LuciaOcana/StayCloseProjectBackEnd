import { ubifDB } from "../models/ubi";

export const getEntries = {

    // Obtenir totes les ubis
    getAll: async()=>{
    return await ubifDB.find();
    },

    // Buscar ubi per ID
    findById: async(id:string)=>{
        return await ubifDB.findById(id);
    },

    // Crear una nova ubi
    create: async(entry:object)=>{
        return await ubifDB.create(entry);
    },

    // Actualitzar una ubi per ID
    update: async(id:string,body:object)=>{
        console.log(body);
        return await ubifDB.findByIdAndUpdate(id,body,{$new:true});
    },

    // Eliminar una ubi por ID
    delete: async(id:string)=>{
        return await ubifDB.findByIdAndDelete(id);
    },

    // Punts a distancia X
    distancepoints: async (lat: number, lon: number, distance: number) => {
        console.log('Arribo eooo')
        return await ubifDB.find({
          ubication: {
            $nearSphere: {
              $geometry: { type: "Point", coordinates: [lon, lat] }, // Longitud, Latitud
              $maxDistance: distance * 1000, // Distancia en metros
            },
          },
        });
      }
}
