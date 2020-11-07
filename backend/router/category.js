const express = require('express');

const categoryController = require('../controller/category');
const { verifyUser, verifyAdmin } = require('../middleware/userAuth');
const router = express.Router();

router.get('/category', categoryController.getAllCategories);

router.get('/category/:id', categoryController.getCategory);

router.post('/category', verifyUser, verifyAdmin, categoryController.addCategory);

router.put('/category/:id', verifyUser, verifyAdmin, categoryController.updateCategory);

router.delete('/category/:id', verifyUser, verifyAdmin, categoryController.deleteCategory);

module.exports = router;
