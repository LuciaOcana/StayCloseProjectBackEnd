import { Request, Response } from 'express';
import * as ubiServices from '../services/ubiServices';

// Obtenir totes les ubis
export async function getAll(_req: Request, res: Response): Promise<void> {
    try {
        const ubis = await ubiServices.getEntries.getAll();
        res.status(200).json(ubis);
    } catch (error) {
        console.error('Error al obtenir les ubicacions:', error);
        res.status(500).json({ message: 'Error al obtenir les ubicacions' });
    }
}

// Buscar ubi per ID
export async function findById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const ubi = await ubiServices.getEntries.findById(id);
        if (!ubi) {
            res.status(404).json({ message: 'Ubicacio no trobada' });
            return;
        }
        res.status(200).json(ubi);
    } catch (error) {
        console.error(`Error al buscar la ubicacio amb ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al buscar la ubicacio' });
    }
}

// Crear una nova ubi
export async function create(req: Request, res: Response): Promise<void> {
    try {
        const newUbi = await ubiServices.getEntries.create(req.body);
        res.status(201).json(newUbi);
    } catch (error) {
        console.error('Error al crear una ubicacio:', error);
        res.status(500).json({ message: 'Error al crear la ubicacio' });
    }
}

// Actualitzar una ubi per ID
export async function update(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const updatedUbi = await ubiServices.getEntries.update(id, req.body);
        if (!updatedUbi) {
            res.status(404).json({ message: 'Ubiacio no trobada' });
            return;
        }
        res.status(200).json(updatedUbi);
    } catch (error) {
        console.error(`Error al actualitzar la ubicacio amb ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al actualitzar la ubicacio' });
    }
}

// Eliminar una ubicacio per ID
export async function deleteEntry(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const deletedUbi = await ubiServices.getEntries.delete(id);
        if (!deletedUbi) {
            res.status(404).json({ message: 'Ubiacio no trobada' });
            return;
        }
        res.status(200).json({ message: 'Ubicacio eliminada exitosament' });
    } catch (error) {
        console.error(`Error al eliminar la ubicacio amb ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al eliminar la ubicacio' });
    }
}
