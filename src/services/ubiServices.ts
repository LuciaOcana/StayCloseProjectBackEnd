// ubiService.ts
import geocoder from "node-geocoder";
import { ubifDB } from "../models/ubi";


// Configuración del servicio de geocodificación
const geoOptions = {
    provider: "openstreetmap", // Cambiar a Google u otro proveedor si es necesario
    httpAdapter: "https", 
    apiKey: process.env.GOOGLE_MAPS_API_KEY, // Solo necesario si usas Google
    formatter: null,
};
const geoCoder = geocoder(geoOptions);

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
    create: async (entry: { name: string; horari: string; tipo: string; address: string; comentari: string }) => {
        try {
            // Obtener coordenadas a partir de la dirección
            const geoResult = await geoCoder.geocode(entry.address);

            if (!geoResult || geoResult.length === 0) {
                throw new Error(`No se encontraron coordenadas para la dirección: ${entry.address}`);
            }

            const { latitude, longitude, formattedAddress } = geoResult[0];

            // Verificar si la dirección devuelta es precisa
            if (!formattedAddress.includes(entry.address.split(",")[0])) {
                console.warn(`La dirección encontrada (${formattedAddress}) no coincide exactamente con la ingresada (${entry.address}).`);
            }

            // Crear el objeto con coordenadas incluidas
            const locationData = {
                ...entry,
                ubication: {
                    type: "Point",
                    coordinates: [longitude, latitude], // Longitud, Latitud
                },
            };

            // Guardar la ubicación en la base de datos
            return await ubifDB.create(locationData);
        } catch (error) {
            console.error("Error al crear la ubicación:", error);
            throw error;
        }
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
