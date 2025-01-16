import { ubifDB } from "../models/ubi";

export const getEntries = {

    // Obtener todas las ubicaciones
    getAll: async () => {
        try {
            return await ubifDB.find();
        } catch (error) {
            console.error("Error al obtener todas las ubicaciones:", error);
            throw new Error("Error al obtener todas las ubicaciones");
        }
    },

    // Buscar ubicación por ID
    findById: async (id: string) => {
        try {
            return await ubifDB.findById(id);
        } catch (error) {
            console.error(`Error al buscar la ubicación con ID ${id}:`, error);
            throw new Error("Error al buscar la ubicación");
        }
    },

    // Crear una nueva ubicación
    create: async (entry: { name: string; horari: string; tipo: string; address: string; ubication: { type: string; coordinates: number[] }; comentari: string }) => {
        try {
            // Validar si la dirección y las coordenadas están presentes en la entrada
            if (!entry || !entry.address || !entry.ubication || !entry.ubication.coordinates || entry.ubication.coordinates.length !== 2) {
                throw new Error("La dirección y las coordenadas son obligatorias.");
            }

            const { name, horari, tipo, address, comentari, ubication } = entry;
            const [longitude, latitude] = ubication.coordinates;

            // Validar que las coordenadas sean válidas
            if (isNaN(latitude) || isNaN(longitude)) {
                throw new Error("Las coordenadas proporcionadas no son válidas.");
            }

            // Crear el objeto con las coordenadas incluidas
            const locationData = {
                name,
                horari,
                tipo,
                address,
                comentari,
                ubication: {
                    type: "Point", // Indicamos que la ubicación es un punto
                    coordinates: [longitude, latitude], // Longitud, Latitud
                },
            };

            // Guardar la ubicación en la base de datos
            return await ubifDB.create(locationData);
        } catch (error) {
            console.error("Error al crear la ubicación:", error);
            throw new Error("Error al crear la ubicación");
        }
    },

    // Actualizar una ubicación por ID
    update: async (id: string, body: object) => {
        try {
            return await ubifDB.findByIdAndUpdate(id, body, { new: true });
        } catch (error) {
            console.error(`Error al actualizar la ubicación con ID ${id}:`, error);
            throw new Error("Error al actualizar la ubicación");
        }
    },

    // Eliminar una ubicación por ID
    delete: async (id: string) => {
        try {
            return await ubifDB.findByIdAndDelete(id);
        } catch (error) {
            console.error(`Error al eliminar la ubicación con ID ${id}:`, error);
            throw new Error("Error al eliminar la ubicación");
        }
    },

    // Buscar ubicaciones cercanas
    distancepoints: async (lat: number, lon: number, distance: number) => {
        try {
            return await ubifDB.find({
                ubication: {
                    $nearSphere: {
                        $geometry: { type: "Point", coordinates: [lon, lat] }, // Longitud, Latitud
                        $maxDistance: distance * 1000, // Distancia en metros
                    },
                },
            });
        } catch (error) {
            console.error("Error al buscar ubicaciones cercanas:", error);
            throw new Error("Error al buscar ubicaciones cercanas");
        }
    }
};
