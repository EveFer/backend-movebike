import express from 'express'
import * as motosUseCases from '../useCases/motos.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'

const router = express.Router()

// GET /motos COMPANY & SUPERADMIN
router.get('/', auth, access('company'), async (request, response, next) => {
  try {
    const allMotos = await motosUseCases.getAll()

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

// GET /idMoto COMPANY & SUPERADMIN
router.get('/:idMoto', auth, access('company'), async (request, response, next) => {
  try {
    const { idMoto } = request.params

    const getMoto = await motosUseCases.getById(idMoto)

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

// POST /motos COMPANY & SUPERADMIN
router.post('/', auth, access('company'), async (request, response, next) => {
  try {
    const { body: newMoto } = request
    const motoCreated = await motosUseCases.create(newMoto)

    response.json({
      success: true,
      message: 'Moto created',
      data: motoCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /idMoto COMPANY & SUPERADMIN
router.delete('/:idMoto', auth, access('company'), async (request, response, next) => {
  try {
    const { idMoto } = request.params

    const motoDeleted = await motosUseCases.deleteById(idMoto)

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

// PATCH /idMoto COMPANY & SUPERADMIN
router.patch('/:idMoto', auth, access('company'), async (request, response, next) => {
  try {
    const { idMoto } = request.params
    const unUpdateMoto = request.body

    const motoUpdated = await motosUseCases.update(idMoto, unUpdateMoto)
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
