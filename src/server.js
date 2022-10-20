import express from 'express'

const server = express()

// middlewares
server.use(express.json())

// routes

export { server }
