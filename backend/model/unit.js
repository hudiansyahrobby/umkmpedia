const mongoose = require('mongoose');

const unitSchema = mongoose.Schema(
  {
    unit: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const unit = mongoose.model('Unit', unitSchema);

module.exports = unit;
