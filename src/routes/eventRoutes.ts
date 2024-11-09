import express from 'express';
import * as eventServices from '../services/eventServices'


const eventRoutes = express.Router()

// Ruta para obtener todos los eventos
eventRoutes.get('/', async(_req, res) => {
    const data = await eventServices.getEntries.getAll()
    return res.json(data);
})

// Ruta para obtener un evento por ID
eventRoutes.get('/:id', async(req, res) => {
    const data = await eventServices.getEntries.findById(req.params.id)
    return res.json(data);
})

// Ruta para crear un nuevo evento
eventRoutes.post('/', async(req, res) => {
    const data = await eventServices.getEntries.create(req.body)
    return res.json(data);
})

// Ruta para actualizar un evento por ID
eventRoutes.put('/:id', async(req, res) => {
    const data = await eventServices.getEntries.update(req.params.id,req.body)
    return res.json(data);
})

// Ruta para eliminar un evento por ID
eventRoutes.delete('/:id', async(req, res) => {
    const data = await eventServices.getEntries.delete(req.params.id)
    return res.json(data);
})



//ruta para habilitar usuarios 




export default eventRoutes 