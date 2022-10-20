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
  initialTime: {
    type: Date,
    required: true
  },
  finalTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['reserved', 'onWay', 'delivered', 'canceled']
  }
})

export const Reserve = mongoose.model('reserve', reserveSchema)
