const express = require('express');

const orderController = require('../controller/order');
const { verifyUser } = require('../middleware/userAuth');

const router = express.Router();

router.post('/courier', verifyUser, orderController.getCost);

router.get('/order/user', verifyUser, orderController.getOrdersByUser);

router.get('/order/:id', verifyUser, orderController.getOrderById);

router.get('/order/admin', verifyUser, orderController.getAllOrders);

router.post('/order', verifyUser, orderController.addToOrder);

router.post('/payment', verifyUser, orderController.getPayment);

module.exports = router;
