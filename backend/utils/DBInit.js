const mongoose = require('mongoose');
require('dotenv').config();
// const User = require('../model/user');

exports.DBInit = () =>
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
      // User.update({}, { $set: { address: [] } }, { upsert: false, multi: true }).then(() =>
      //   console.log('berhasil'),
      // );
      console.log('connected');
    },
  );
