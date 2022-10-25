import { Company } from '../models/company.model.js'
import { Costumer } from '../models/costumers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'

async function loginCompany (email, password) {
  const companyFound = await Company.findOne({ email })
  if (!companyFound) throw new StatusHttp('invalid!')
  const isValidPassword = await bcrypt.compare(password, companyFound.password)
  if (!isValidPassword) throw new StatusHttp('try again!')
  return (jwt.sign({ id: companyFound._id, role: companyFound.role }))
}

async function loginCostumer (email, password) {
  const costumerFound = await Costumer.findOne({ email })
  if (!costumerFound) throw new StatusHttp('invalid!')
  const isValidPassword = await bcrypt.compare(password, costumerFound.password)
  if (!isValidPassword) throw new StatusHttp('try again!')
  /* pasando el payload = The payload of an API is the data you are interested in transporting to the server when you make an API request. Simply put, it is the body of your HTTP request and response message */
  return jwt.sign({ id: costumerFound._id, role: costumerFound.role })
}

export {
  loginCompany,
  loginCostumer
}
