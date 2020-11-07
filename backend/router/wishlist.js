const express = require('express');

const wishlistController = require('../controller/wishlist');
const { verifyUser } = require('../middleware/userAuth');

const router = express.Router();

router.get('/wishlist', verifyUser, wishlistController.getProductInWishlist);

router.post('/wishlist', verifyUser, wishlistController.addProductToWishlist);

router.delete('/wishlist/:id', verifyUser, wishlistController.deleteProductFromWishlist);

module.exports = router;
