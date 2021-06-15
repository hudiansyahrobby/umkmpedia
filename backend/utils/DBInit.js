const mongoose = require("mongoose");
require("dotenv").config();

console.log("A", process.env.MONGO_URI);
exports.DBInit = () =>
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log("connected");
    }
  );
