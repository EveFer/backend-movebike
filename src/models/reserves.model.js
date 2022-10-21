import mongoose from 'mongoose'

const reserveSchema = new mongoose.Schema({
  costumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Costumer',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moto',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  initialDate: {
    type: Date,
    required: true
  },
  finalDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'processing',
    enum: ['processing', 'reserved', 'onWay', 'delivered', 'canceled']
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: true
  }
})

export const Reserve = mongoose.model('reserve', reserveSchema)
