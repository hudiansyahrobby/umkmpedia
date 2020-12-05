const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      stock: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      unit: {
        type: mongoose.Schema.ObjectId,
        ref: 'Unit',
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true,
      },
    },
  ],
});

const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;
