// ubiService.ts
import { ubifDB } from "../models/ubi";

export const getEntries = {

    // Obtener todas las ubicaciones
    getAll: async () => {
        return await ubifDB.find();
    },

    // Buscar ubicación por ID
    findById: async (id: string) => {
        return await ubifDB.findById(id);
    },

    // Crear una nueva ubicación
    create: async (entry: object) => {
        return await ubifDB.create(entry);
    },

    // Actualizar una ubicación por ID
    update: async (id: string, body: object) => {
        return await ubifDB.findByIdAndUpdate(id, body, { new: true });
    },

    // Eliminar una ubicación por ID
    delete: async (id: string) => {
        return await ubifDB.findByIdAndDelete(id);
    },

    // Puntos a distancia X
    distancepoints: async (lat: number, lon: number, distance: number) => {
        return await ubifDB.find({
            ubication: {
                $nearSphere: {
                    $geometry: { type: "Point", coordinates: [lon, lat] }, // Longitud, Latitud
                    $maxDistance: distance * 1000, // Distancia en metros
                },
            },
        });
    }
};
