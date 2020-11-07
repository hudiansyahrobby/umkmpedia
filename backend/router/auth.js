const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.post('/signout', authController.signout);

module.exports = router;
