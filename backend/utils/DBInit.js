const mongoose = require('mongoose');
require('dotenv').config();
// const User = require('../model/user');
// const Order = require('../model/order');
// const Cart = require('../model/cart');
// const Product = require('../model/product');

exports.DBInit = () =>
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
      // User.update({}, { $set: { address: [] } }, { upsert: false, multi: true }).then(() =>
      //   console.log('berhasil'),
      // );
      // Product.updateMany({}, { $set: { weight: 200 } }).then(() => {
      //   console.log('berhasil');
      // });
      console.log('connected');
    },
  );
