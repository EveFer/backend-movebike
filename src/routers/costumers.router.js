import express from 'express'
import * as costumersUseCases from '../useCases/costumers.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'

const router = express.Router()

// GET /costumers SUPERADMIN
router.get('/', auth, async (request, response, next) => {
  try {
    const allCostumers = await costumersUseCases.getAll()

    response.json({
      success: true,
      message: 'All Costumers',
      data: {
        costumers: allCostumers
      }
    })
  } catch (error) {
    next(error)
  }
})

// GET /idCostumers
router.get('/:idCostumer', async (request, response, next) => {
  try {
    const { idCostumer } = request.params

    const getCostomer = await costumersUseCases.getById(idCostumer)

    response.json({
      success: true,
      message: 'Costumer',
      data: {
        costumer: getCostomer
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST /costumers USER
router.post('/',auth, access('user'), async (request, response, next) => {
  try {
    const { body: newCustomer } = request

    const costumerCreated = await costumersUseCases.create(newCustomer)

    response.json({
      success: true,
      message: 'Costumer created',
      data: costumerCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /idCostumer
router.delete('/:idCostumer', async (request, response, next) => {
  try {
    const { idCostumer } = request.params

    const costumerDeleted = await costumersUseCases.deleteById(idCostumer)

    response.json({
      success: true,
      message: 'Costumer deleted',
      data: {
        costumer: costumerDeleted
      }
    })
  } catch (error) {
    next(error)
  }
})

// PATCH /idCostumer 
router.patch('/:idCostumer', async (request, response, next) => {
  try {
    const { idCostumer } = request.params

    const unUpdateCostumer = request.body

    const costumerUpdated = await costumersUseCases.update(idCostumer, unUpdateCostumer)

    response.json({
      success: true,
      message: 'Costumer updated',
      data: {
        costumer: costumerUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
