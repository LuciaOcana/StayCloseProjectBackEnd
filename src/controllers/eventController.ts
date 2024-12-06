import { Request, Response } from 'express';
import * as eventServices from '../services/eventServices';

export const eventController = {
    // Obtener todos los eventos
    getAll: async (_req: Request, res: Response): Promise<void> => {
        try {
            const events = await eventServices.getEntries.getAll();
            res.status(200).json(events);
        } catch (error) {
            console.error('Error al obtener eventos:', error);
            res.status(500).json({ message: 'Error al obtener los eventos' });
        }
    },

    // Buscar evento por ID
    findById: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const event = await eventServices.getEntries.findById(id);
            if (!event) {
                res.status(404).json({ message: 'Evento no encontrado' });
                return;
            }
            res.status(200).json(event);
        } catch (error) {
            console.error(`Error al buscar el evento con ID ${req.params.id}:`, error);
            res.status(500).json({ message: 'Error al buscar el evento' });
        }
    },

    // Crear un nuevo evento
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const newEvent = await eventServices.getEntries.create(req.body);
            res.status(201).json(newEvent);
        } catch (error) {
            console.error('Error al crear un evento:', error);
            res.status(500).json({ message: 'Error al crear el evento' });
        }
    },

    // Actualizar un evento por ID
    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedEvent = await eventServices.getEntries.update(id, req.body);
            if (!updatedEvent) {
                res.status(404).json({ message: 'Evento no encontrado' });
                return;
            }
            res.status(200).json(updatedEvent);
        } catch (error) {
            console.error(`Error al actualizar el evento con ID ${req.params.id}:`, error);
            res.status(500).json({ message: 'Error al actualizar el evento' });
        }
    },

    // Eliminar un evento por ID
    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedEvent = await eventServices.getEntries.delete(id);
            if (!deletedEvent) {
                res.status(404).json({ message: 'Evento no encontrado' });
                return;
            }
            res.status(200).json({ message: 'Evento eliminado exitosamente' });
        } catch (error) {
            console.error(`Error al eliminar el evento con ID ${req.params.id}:`, error);
            res.status(500).json({ message: 'Error al eliminar el evento' });
        }
    }
};
