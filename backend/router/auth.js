const express = require('express');

const authController = require('../controller/auth');
const { verifyUser } = require('../middleware/userAuth');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.post('/signout', authController.signout);

router.get('/province', verifyUser, authController.getProvince);

router.get('/city', verifyUser, authController.getCity);

router.put('/update-profile', verifyUser, authController.updateProfile);

module.exports = router;
