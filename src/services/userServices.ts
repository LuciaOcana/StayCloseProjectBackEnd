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
    //Contamos el numero de Usuarios en la bbdd
    countTotalUsers: async ()=>{
        const totalUsers = await userofDB.countDocuments(); // Esto cuenta todos los usuarios en la colección
      return totalUsers;
    }
}