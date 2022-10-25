import express from 'express'
import * as authUseCases from '../useCases/auth.use.js'

const router = express.Router()

router.post('/company', async (request, response, next) => {
  try {
    const { email, password } = request.body
    const token = await authUseCases.loginCompany(email, password)
    console.log(token)
    response.json({
      message: 'successful login',
      succes: true,
      token
    })
  } catch (error) {
    next(error)
  }
})

router.post('/costumer', async (request, response, next) => {
  try {
    const { email, password } = request.body
    const token = await authUseCases.loginCostumer(email, password)
    response.json({
      message: 'successful login',
      succes: true,
      token
    })
  } catch (error) {
    next(error)
  }
})

export default router
