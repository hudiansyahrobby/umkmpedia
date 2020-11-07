const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
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
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // review: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review',
    //   },
    // ],
  },
  {
    timestamps: true,
  },
);

const product = mongoose.model('Product', productSchema);

module.exports = product;
