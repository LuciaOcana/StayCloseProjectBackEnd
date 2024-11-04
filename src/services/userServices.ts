import { userofDB } from '../models/user'

export const getEntries = {

    // Obtener todos los usuarios
    getAll: async (page: number , limit: number ) => {
        // Calcular el número de documentos que deben saltarse
        const skip = (page - 1) * limit;
    
        // Realizar la consulta con paginación
        const users = await userofDB.find()
                                    .skip(skip)
                                    .limit(limit);
    
        // Retornar los usuarios encontrados
        return users;
    },
    // Buscar usuario por ID
    findById: async(id:string)=>{
        return await userofDB.findById(id);
    },
    // Crear un nuevo usuario
    create: async(entry:object)=>{
        console.log(entry);
        return await userofDB.create(entry);
    },
    // Actualizar un usuario por ID
    updateUserById: async(id:string,body:object)=>{
        console.log(body);
        return await userofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    // Eliminar un usuario por ID
    deleteUserById: async(id:string)=>{
        return await userofDB.findByIdAndDelete(id);
    },
    findUserByUsername: async(username:string) =>{
        return await userofDB.findOne({username: username})
    },
    countTotalUsers: async ()=>{
        const totalUsers = await userofDB.countDocuments(); // Esto cuenta todos los usuarios en la colección
      return totalUsers;
    },
    // Verificar si un usuario existe por nombre de usuario
    checkIfUserExists: async (username: string): Promise<boolean> => {
        console.log("checkIFUserExist", username);
        const user = await userofDB.findOne({ username: username });
        return !!user; // Retorna true si el usuario existe, false si no
    },

    //Habilitar un usuario

    enable: async (id: string) => {
        return await userofDB.findByIdAndUpdate (id,{isActive:true}, {new: true});
    },

    //Deshabilitar un usuario
    disable: async (id: string) => {
        return await userofDB.findByIdAndUpdate(id, {isActive:false}, {new: true});
    }
};