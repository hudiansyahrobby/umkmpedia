const express = require('express');

const authController = require('../controller/auth');
const { verifyUser } = require('../middleware/userAuth');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.post('/signout', authController.signout);

router.post('/reset-password', authController.postResetPassword);

router.post('/new-password/:resetPasswordToken', authController.postNewPassword);

router.get('/province', verifyUser, authController.getProvince);

router.get('/city', verifyUser, authController.getCity);

router.put('/update-profile', verifyUser, authController.updateProfile);

router.get('/users', verifyUser, authController.getTotalUsers);

module.exports = router;
