const User = require('../model/user');
const request = require('request');

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
  console.log('email', email);
  console.log('password', password);
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
