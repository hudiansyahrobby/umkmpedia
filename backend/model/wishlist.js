const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
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
      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = wishlist;
