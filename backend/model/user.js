const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowecase: true,
      required: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 12 characters long'],
      required: true,
    },
    telephone: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    fullAddress: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    profilPic: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png',
    },
    refreshToken: {
      type: String,
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!this.isModified('password')) {
    return next();
  }

  const SALT = 10;
  user.password = await bcrypt.hash(user.password, SALT);
  return next();
});

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.getToken = function (payload) {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  const user = this;
  user.refreshToken = refreshToken;
  return accessToken;
};

const user = mongoose.model('User', userSchema);

module.exports = user;
