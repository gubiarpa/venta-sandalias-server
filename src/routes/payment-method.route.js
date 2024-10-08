const express = require('express')
const router = express.Router()
const {
	getAllPaymentMethods,
	getPaymentMethodById,
} = require('../controllers/payment-method.controller.js')

router.get('/', getAllPaymentMethods)
router.get('/:id', getPaymentMethodById)

module.exports = router
