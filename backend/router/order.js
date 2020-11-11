const express = require('express');

const orderController = require('../controller/order');
const { verifyUser } = require('../middleware/userAuth');

const router = express.Router();

router.get('/province', verifyUser, orderController.getProvince);

router.get('/city/:id', verifyUser, orderController.getCity);

router.get('/cost', verifyUser, orderController.getCost);

router.get('/order', verifyUser, orderController.getOrders);

router.post('/order', verifyUser, orderController.addToOrder);

module.exports = router;
