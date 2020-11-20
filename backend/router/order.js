const express = require('express');

const orderController = require('../controller/order');
const { verifyUser } = require('../middleware/userAuth');

const router = express.Router();

router.post('/courier', verifyUser, orderController.getCost);

router.get('/order/:id', verifyUser, orderController.getOrderById);

router.get('/order', verifyUser, orderController.getOrders);

router.post('/order', verifyUser, orderController.addToOrder);

// router.post('/payment', verifyUser, orderController.postPayment);

module.exports = router;
