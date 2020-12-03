const express = require('express');

const orderController = require('../controller/order');
const { verifyUser, verifyAdmin } = require('../middleware/userAuth');

const router = express.Router();

router.post('/courier', verifyUser, orderController.getCost);

router.get('/order/user', verifyUser, orderController.getOrdersByUser);

router.get('/order/admin', verifyUser, verifyAdmin, orderController.getAllOrders);

router.get('/order/:id', verifyUser, orderController.getOrderById);

router.post('/order', verifyUser, orderController.addToOrder);

router.put('/order/:id', verifyUser, orderController.addResi);

router.post('/payment', verifyUser, orderController.getPayment);

router.get('/payment/:id', verifyUser, orderController.checkPayment);

module.exports = router;
