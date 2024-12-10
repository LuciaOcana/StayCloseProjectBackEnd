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
    }
}
