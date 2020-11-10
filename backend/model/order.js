const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;
