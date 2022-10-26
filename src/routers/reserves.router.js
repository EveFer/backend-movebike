import express from 'express'
import * as reservesUseCases from '../useCases/reserves.use.js'
import jwtDecode from 'jwt-decode'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'

const router = express.Router()

// GET /reserves COMPANY & SUPERADMIN
router.get('/', auth, access('company', 'user'), async (request, response, next) => {
  try {
    const allReserves = await reservesUseCases.getAll()

    response.json({
      success: true,
      message: 'All reserves',
      data: {
        reserves: allReserves
      }
    })
  } catch (error) {
    next(error)
  }
})

// GET /idReserve COMPANY & SUPERADMIN
router.get('/:idReserve', auth, access('company'), async (request, response, next) => {
  try {
    const { idReserve } = request.params

    const getReserve = await reservesUseCases.getById(idReserve)

    response.json({
      success: true,
      message: 'Reserve',
      data: {
        reserves: getReserve
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST /
router.post('/', auth, async (request, response, next) => {
  try {
    const token = request.headers.authorization
    const reserve = request.body
    const { id } = jwtDecode(token)
    const reserveCreated = await reservesUseCases.create(reserve, id)

    response.json({
      success: true,
      message: 'Reserve completed',
      data: reserveCreated
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})

// DELETE /idReserve
router.delete('/:idReserve', async (request, response, next) => {
  try {
    const { idReserve } = request.params

    const reserveDeleted = await reservesUseCases.deleteById(idReserve)

    response.json({
      success: true,
      message: 'ReserveDeleted',
      data: {
        reserve: reserveDeleted
      }
    })
  } catch (error) {
    next(error)
  }
})

// PATCH /idReserve
router.patch('/:idReserve', async (request, response, next) => {
  try {
    const { idReserve } = request.params

    const unUpdateReserve = request.body

    const reserveUpdated = await reservesUseCases.update(idReserve, unUpdateReserve)

    response.json({
      success: true,
      message: 'Reserve updated',
      data: {
        reserve: reserveUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
