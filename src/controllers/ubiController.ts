// ubiController.ts
import { Request, Response } from 'express';
import * as ubiServices from '../services/ubiServices';

// Obtener todas las ubicaciones
export async function getAll(_req: Request, res: Response): Promise<void> {
    try {
        const ubis = await ubiServices.getEntries.getAll();
        res.status(200).json(ubis);
    } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
        res.status(500).json({ message: 'Error al obtener las ubicaciones' });
    }
}

// Buscar ubicación por ID
export async function findById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const ubi = await ubiServices.getEntries.findById(id);
        if (!ubi) {
            res.status(404).json({ message: 'Ubicación no encontrada' });
            return;
        }
        res.status(200).json(ubi);
    } catch (error) {
        console.error(`Error al buscar la ubicación con ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al buscar la ubicación' });
    }
}

// Crear una nueva ubicación
export async function create(req: Request, res: Response): Promise<void> {
    try {
        const { name, horari, tipo, ubication, address, comentari } = req.body;
        if (!name || !horari || !tipo || !ubication || !address || !comentari) {
            res.status(400).json({ message: 'Faltan datos obligatorios' });
            return;
        }
        const newUbi = await ubiServices.getEntries.create(req.body);
        res.status(201).json(newUbi);
    } catch (error) {
        console.error('Error al crear una ubicación:', error);
        res.status(500).json({ message: 'Error al crear la ubicación' });
    }
}

// Actualizar una ubicación por ID
export async function update(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const updatedUbi = await ubiServices.getEntries.update(id, req.body);
        if (!updatedUbi) {
            res.status(404).json({ message: 'Ubicación no encontrada' });
            return;
        }
        res.status(200).json(updatedUbi);
    } catch (error) {
        console.error(`Error al actualizar la ubicación con ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al actualizar la ubicación' });
    }
}

// Eliminar una ubicación por ID
export async function deleteEntry(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const deletedUbi = await ubiServices.getEntries.delete(id);
        if (!deletedUbi) {
            res.status(404).json({ message: 'Ubicación no encontrada' });
            return;
        }
        res.status(200).json({ message: 'Ubicación eliminada exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar la ubicación con ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al eliminar la ubicación' });
    }
}

// Buscar ubicaciones cercanas
export async function findNearby(req: Request, res: Response): Promise<void> {
    const { lat, lon, distance } = req.params;
    if (!lat || !lon || !distance) {
        res.status(400).json({ message: "Faltan parámetros" });
        return;
    }

    try {
        const nearbyUbis = await ubiServices.getEntries.distancepoints(
            parseFloat(lat),
            parseFloat(lon),
            parseFloat(distance)
        );
        res.status(200).json(nearbyUbis);
    } catch (error) {
        console.error('Error al buscar ubicaciones cercanas:', error);
        res.status(500).json({ message: 'Error al buscar ubicaciones cercanas' });
    }
}

