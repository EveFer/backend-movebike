import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'admin'
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /.*@\..*/
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  motos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Moto' }]
})

export const Company = mongoose.model('Company', companySchema)
