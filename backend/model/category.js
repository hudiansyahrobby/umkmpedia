const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const category = mongoose.model('Category', categorySchema);

module.exports = category;
