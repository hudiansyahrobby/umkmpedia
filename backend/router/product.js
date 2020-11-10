const express = require('express');

const productController = require('../controller/product');
const { verifyUser, verifyAdmin } = require('../middleware/userAuth');
const { upload } = require('../utils/multerInit');
const router = express.Router();

const uploadFile = upload();

router.get('/products', productController.getAllProducts);

router.post(
  '/products',
  verifyUser,
  verifyAdmin,
  uploadFile.single('image'),
  productController.addProduct,
);
router.get('/products/search', productController.searchProduct);

router.get('/products/:id', productController.getProduct);

// router.get('/products/:id', productController.getProductByBrand);

router.put(
  '/products/:id',
  verifyUser,
  verifyAdmin,
  uploadFile.single('image'),
  productController.updateProduct,
);
router.delete('/products/:id', verifyUser, verifyAdmin, productController.deleteProduct);

module.exports = router;
