import express from 'express'
import motosRouter from '../src/routers/motos.router.js'
import companiesRouter from '../src/routers/company.router.js'
import costumersRouter from '../src/routers/costumers.router.js'
import reservesRouter from '../src/routers/reserves.router.js'
import handlerErrors from './middlewares/handleError.js'

const server = express()

// middlewares
server.use(express.json())

// routes
server.use('/motos', motosRouter)
server.use('/costumers', costumersRouter)
server.use('/companies', companiesRouter)
server.use('/reserves', reservesRouter)

//middleware - handleErrors
server.use(handlerErrors)


export { server }
