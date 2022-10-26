import express from 'express'
import * as authUseCases from '../useCases/auth.use.js'

const router = express.Router()

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body
    const token = await authUseCases.login(email, password)
    console.log(token)
    response.json({
      message: 'successful login',
      succes: true,
      token
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
export default router
