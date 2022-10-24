import express from 'express'
import jwt_decode from 'jwt-decode'
import * as motosUsesCases from '../usesCases/motos.use.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()


// GET /motos
router.get('/', async (request, response, next ) => {
    try {
        const allMotos = await motosUsesCases.getAll()

        response.json({
            success: true,
            message: 'All motos',
            data: {
                motos: allMotos
            }
        })
    } catch (error) {
        next(error)
    }
})

// GET /idMoto
router.get('/:idMoto', async (request, response, next) => {
    try {
        const { idMoto } = request.params

        const getMoto = await motosUsesCases.getById(idMoto)

        response.json({
            success: true,
            message: 'Moto',
            data: {
                moto: getMoto
            }
        })
    } catch (error) {
        next(error)
    }
})

// POST /motos
router.post('/', async (request, response, next) => {
    try {
        const { body: newMoto } = request
        const motoCreated = await motosUsesCases.create(newMoto)

        response.json({
            success: true,
            message: 'Moto created',
            data: motoCreated
        })
    } catch (error) {
        next(error)
    }
})

//DELETE /idMoto
router.delete('/:idMoto', auth,  async (request, response, next) => {
    try {
        const { idMoto } = request.params

        const motoDeleted = await motosUsesCases.deleteById(idMoto)

        response.json({
            success: true,
            message: 'Moto deleted',
            data: {
                moto: motoDeleted
            }
        })
    } catch (error) {
        next(error)
    }
})

//PATCH /idMoto
router.patch('/:idMoto', async (request, response, next) => {
    try {
        const { idMoto } = request.params
        const unUpdateMoto = request.body

        const motoUpdated = await motosUsesCases.update(idMoto, unUpdateMoto)
        response.json({
            success: true,
            message: 'Moto updated',
            data: {
                moto: motoUpdated
            }
        })
    } catch (error) {
        next(error)
    }
})

export default router