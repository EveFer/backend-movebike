import express from 'express'
import motosRouter from '../src/routers/motos.router.js'
import companiesRouter from './routers/companies.router.js'
import costumersRouter from '../src/routers/costumers.router.js'
import reservesRouter from '../src/routers/reserves.router.js'
import handlerErrors from './middlewares/handleError.js'
import authRouter from './routers/auth.router.js'

const server = express()

// middlewares
server.use(express.json())

// routes
server.use('/motos', motosRouter)
server.use('/costumers', costumersRouter)
server.use('/companies', companiesRouter)
server.use('/reserves', reservesRouter)
server.use('/auth', authRouter)

// middleware - handleErrors
server.use(handlerErrors)

export { server }
