const express = require('express');
const router = express.Router();
const { addPayment,getPayments,getPayment } = require('../controller/payments')
const auth = require('../middleware/auth')

router.get('/payment/:id', getPayment)
router.get('/payments', getPayments);
router.post('/payment', addPayment);

module.exports = router;