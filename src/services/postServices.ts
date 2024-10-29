import { postofDB } from '../models/post'
import { userofDB } from '../models/user';

export const getEntries = {

    // Obtener todos los post
    getAll: async(page = 1, limit = 10)=>{
        const skip = (page - 1) * limit;
    
        // Realizar la consulta con paginación
        const posts = await postofDB.find()
                                    .skip(skip)
                                    .limit(limit);
    
        // Retornar los usuarios encontrados
        return posts;
    },
    //Buscar post por ID
    findById: async(id:string)=>{
        return await postofDB.findById(id);
    },
    // Crear un nuevo post
    create: async(entry:object)=>{
        return await postofDB.create(entry);
    },
    // Actualizar un post por ID
    update: async(id:string,body:object)=>{
        console.log(body);
        return await postofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    // Eliminar un post por ID
    delete: async(id:string)=>{
        return await postofDB.findByIdAndDelete(id);
    },
    // Tots els posts d'un usuari
    findByAuthor: async(id:string)=>{
        return await postofDB.find({author: id});
    },
    // Comprobar si el usuario existe por nombre de usuario
    checkIfUserExists: async (username: string): Promise<boolean> => {
        const user = await userofDB.findOne({ username: username });
        return !!user; // Devuelve true si el usuario existe
    }
}