const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    }
})

module.exports = mongoose.model('Product', productSchema);