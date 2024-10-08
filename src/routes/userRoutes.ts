import express from 'express';
import * as userServices from '../services/userServices'


const userRoutes = express.Router()

// Ruta para obtener todos los usuarios
userRoutes.get('/', async(_req, res) => {
    const data = await userServices.getEntries.getAll()
    return res.json(data);
})

// Ruta para obtener un usuario por ID
userRoutes.get('/:id', async(req, res) => {
    const data = await userServices.getEntries.findById(req.params.id)
    return res.json(data);
})

// Ruta para crear un nuevo usuario
userRoutes.post('/', async(req, res) => {
    const data = await userServices.getEntries.create(req.body)
    return res.json(data);
})

// Ruta para actualizar un usuario por ID
userRoutes.put('/:id', async(req, res) => {
    const data = await userServices.getEntries.update(req.params.id,req.body)
    return res.json(data);
})

// Ruta para eliminar un usuario por ID
userRoutes.delete('/:id', async(req, res) => {
    const data = await userServices.getEntries.delete(req.params.id)
    return res.json(data);
})


export default userRoutes 