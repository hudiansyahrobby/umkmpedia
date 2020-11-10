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
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Email or password is invalid' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Email or password is invalid' });
  }
  const { name, role, profilPic, email: mail } = user;
  const accessToken = await user.getToken({ id: user._id });
  // Send Cookie
  res.cookie('jwt', accessToken, { secure: true, httpOnly: true });
  return res
    .status(200)
    .json({ success: true, accessToken, user: { name, role, profilPic, mail } });
};

exports.signout = async (req, res, next) => {
  res.clearCookie('jwt');
  return res.status(200).json({ success: true, message: 'Succesfully Sign out' });
};
