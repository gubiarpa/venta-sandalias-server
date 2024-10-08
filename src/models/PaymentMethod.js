const mongoose = require('mongoose')

const paymentMethodSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
})

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

module.exports = PaymentMethod
