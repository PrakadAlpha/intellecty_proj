const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Customer'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product'
    },
    status: {
      type: String,
      minLength: 8,
      required: [true, "Please enter a status"]
    },
    date:{
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
})

module.exports = mongoose.model('Transaction', transactionSchema);