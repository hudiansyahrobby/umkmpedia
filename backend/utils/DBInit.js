const mongoose = require('mongoose');
require('dotenv').config();

exports.DBInit = () =>
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
      console.log('connected to MONGODB');
    },
  );
