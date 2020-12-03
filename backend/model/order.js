const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    transaction_id: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    resiNumber: {
      type: String,
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
        image: {
          type: String,
          required: true,
        },
        unit: {
          type: String,
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
  },
  {
    timestamps: true,
  },
);

const order = mongoose.model('Order', orderSchema);

module.exports = order;
