const request = require('request');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const User = require('../model/user');

exports.signup = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ success: false, message: 'Email has already registered' });
  }

  const newUser = new User(req.body);

  try {
    await newUser.save();
    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('address').exec();

    if (!user) {
      return res.status(400).json({ success: false, message: 'Email or password is invalid' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email or password is invalid' });
    }

    user.password = null;

    const accessToken = await user.getToken({ id: user._id });
    // Send Cookie
    res.cookie('jwt', accessToken, { secure: true, httpOnly: true });
    console.log(user);
    return res.status(200).json({ success: true, accessToken, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.signout = async (req, res, next) => {
  res.clearCookie('jwt');
  return res.status(200).json({ success: true, message: 'Succesfully Sign out' });
};

exports.postResetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpired = Date.now() + 3600000;
    const user = User.findOneAndUpdate({ email }, { resetPasswordToken, resetTokenExpired });
    if (!user) return res.status(400).json({ success: false, message: 'User Tidak ditemukan' });

    const transporter = nodemailer.createTransport(
      sendGridTransport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY,
        },
      }),
    );

    const mailOptions = {
      from: 'umkmpedia@shop.com',
      to: user.email,
      subject: 'Link To Reset Password',
      html: `
      <h5>Link To <a href='http://localhost:3000/${resetPasswordToken}'>Reset Password</a>
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Berhasil Mengirim Email Reset Password' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.postNewPassword = async (req, res, next) => {
  const { password } = req.body;
  const { resetPasswordToken } = req.params;
  try {
    const user = await User.findOne({ resetPasswordToken, resetTokenExpired: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Token sudah tidak valid' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetTokenExpired = undefined;

    await user.save();
    return res.status(201).json({ success: true, message: 'Berhasil Mengubah Password' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProvince = (req, res, next) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      headers: { key: process.env.RAJA_ONGKIR_API_KEY },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      return res.status(201).json({ success: true, provinces: result.rajaongkir.results });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCity = (req, res, next) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      headers: { key: process.env.RAJA_ONGKIR_API_KEY },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      return res.status(201).json({ success: true, cities: result.rajaongkir.results });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res, next) => {
  const userId = req.user._id;
  const { city, province, fullAddress, telephone, name } = req.body;

  const updatedUser = {
    city,
    province,
    fullAddress,
    telephone,
    name,
  };

  try {
    await User.findByIdAndUpdate(userId, updatedUser);
    const user = await User.findById(userId);
    return res.status(200).json({ success: true, user, message: 'Profil Berhasil diupdate' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTotalUsers = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({}).exec();
    return res.status(200).json({ totalUsers });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
