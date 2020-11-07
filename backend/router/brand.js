const express = require('express');

const brandController = require('../controller/brand');
const { verifyUser, verifyAdmin } = require('../middleware/userAuth');
const router = express.Router();

router.get('/brands', brandController.getAllBrands);

router.get('/brands/:id', brandController.getBrand);

router.post('/brands', verifyUser, verifyAdmin, brandController.addBrand);

router.put('/brands/:id', verifyUser, verifyAdmin, brandController.updateBrand);

router.delete('/brands/:id', verifyUser, verifyAdmin, brandController.deleteBrand);

module.exports = router;
