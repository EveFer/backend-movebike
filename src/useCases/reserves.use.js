import { Reserve } from '../models/reserves.model.js'
import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (newReserve, userCurrent) {
  console.log({ ...newReserve, customer: userCurrent })
  const reserveCreated = await Reserve.create({ ...newReserve, customer: userCurrent})
  console.log(newReserve, userCurrent)
  await Customer.findByIdAndUpdate(userCurrent,
    { $push: { reserves: reserveCreated._id } })
  return reserveCreated
}

function getAll () {
  return Reserve.find({}).populate('customer')
}

async function getById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) throw new StatusHttp('Reserve not found', 400)
  return Reserve.findById(reserveFound)
}

async function update (idReserve, newData) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) throw new StatusHttp('Reserve not found', 400)
  return Reserve.findByIdAndUpdate(idReserve, newData, { new: true })
}

async function deleteById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) throw new StatusHttp('Reserve not found', 400)
  return Reserve.findByIdAndDelete(idReserve)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
