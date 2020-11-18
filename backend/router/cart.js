const express = require('express');

const cartController = require('../controller/cart');
const { verifyUser } = require('../middleware/userAuth');

const router = express.Router();

router.get('/cart', verifyUser, cartController.getProductInCart);

router.post('/cart', verifyUser, cartController.addProductToCart);

router.post('/cart/change-quantity', verifyUser, cartController.changeQuantity);

router.delete('/cart/:id', verifyUser, cartController.deleteProductFromCart);

module.exports = router;
