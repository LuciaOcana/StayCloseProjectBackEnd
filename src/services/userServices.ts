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
    // Buscar usuario por ID
    findByUsername: async(username:string)=>{
        return await userofDB.findOne({ username: username  });
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

      //para contar solo los usuarios habilitados 
      //return await userofDB.countDocuments({disabled:false});


    },
    // Verificar si un usuario existe por nombre de usuario
    checkIfUserExists: async (username: string): Promise<boolean> => {
        console.log("checkIFUserExist", username);
        const user = await userofDB.findOne({ username: username });
        return !!user; // Retorna true si el usuario existe, false si no
    },

    //Habilitar un usuario

    enable: async (id: string) => {
        const user= await userofDB.findByIdAndUpdate (id,{disabled:false}, {new: true});
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    //Deshabilitar un usuario
    disable: async (id: string) => {
        const user= await userofDB.findByIdAndUpdate(id, {disabled:true}, {new: true});
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    //Obtener usuarios por su estado online offline
    findUsersByStatus: async (status: string) => {
        try {
          return await userofDB.find({ online: status }, "username name online");
        } catch (error) {
          console.error("Error al obtener usuarios por estado:", error);
          throw error;
        }
      },

    //obtener grupos de chat 
    findGroups: async () => {
        try {
          return await userofDB.find({ isGroup: true }, "username name isGroup");
        } catch (error) {
          console.error("Error al obtener grupos:", error);
          throw error;
        }
      },

       // Manejar conexión de usuario (marcar como online)
  connectUser: async (id: string) => {
    try {
      const user = await userofDB.findByIdAndUpdate(id, { online: true }, { new: true });
      if (!user) throw new Error('Usuario no encontrado');
      console.log(`Usuario ${user.username} conectado`);
      return user;
    } catch (error) {
      console.error("Error al conectar usuario:", error);
      throw error;
    }
  },
  // Manejar desconexión de usuario (marcar como offline)
  disconnectUser: async (id: string) => {
    try {
      const user = await userofDB.findByIdAndUpdate(id, { online: false }, { new: true });
      if (!user) throw new Error('Usuario no encontrado');
      console.log(`Usuario ${user.username} desconectado`);
      return user;
    } catch (error) {
      console.error("Error al desconectar usuario:", error);
      throw error;
    }
  },

};