import { eventofDB } from '../models/event'

export const getEntries = {

    // Obtener todos los eventos
    getAll: async()=>{
    return await eventofDB.find();
    },
    // Buscar evento por ID
    findById: async(id:string)=>{
        return await eventofDB.findById(id);
    },
    // Crear un nuevo evento
    create: async(entry:object)=>{
        return await eventofDB.create(entry);
    },
    // Actualizar un evento por ID
    update: async(id:string,body:object)=>{
        console.log(body);
        return await eventofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    // Eliminar un evento por ID
    delete: async(id:string)=>{
        return await eventofDB.findByIdAndDelete(id);
    }
}