const express = require('express');

const unitController = require('../controller/unit');
const { verifyUser, verifyAdmin } = require('../middleware/userAuth');
const router = express.Router();

router.get('/unit', unitController.getAllUnits);

router.post('/unit', verifyUser, verifyAdmin, unitController.addUnit);

module.exports = router;
