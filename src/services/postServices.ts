import { userofDB } from '../models/user'

export const getEntries = {

    // Obtener todos los usuarios
    getAll: async()=>{
    return await userofDB.find();
    },
    // Buscar usuario por ID
    findById: async(id:string)=>{
        return await userofDB.findById(id);
    },
    // Crear un nuevo usuario
    create: async(entry:object)=>{
        return await userofDB.create(entry);
    },
    // Actualizar un usuario por ID
    update: async(id:string,body:object)=>{
        console.log(body);
        return await userofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    // Eliminar un usuario por ID
    delete: async(id:string)=>{
        return await userofDB.findByIdAndDelete(id);
    }
}