const express = require('express');

const authController = require('../controller/auth');
const { verifyUser } = require('../middleware/userAuth');
const { upload } = require('../utils/multerInit');

const router = express.Router();

const uploadFile = upload();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.post('/signout', authController.signout);

router.post('/refresh_token', authController.generateRefreshToken);

router.post('/reset-password', authController.postResetPassword);

router.post('/new-password/:resetPasswordToken', authController.postNewPassword);

router.put('/update-profile', verifyUser, uploadFile.single('image'), authController.updateProfile);

router.get('/users', verifyUser, authController.getTotalUsers);

module.exports = router;
