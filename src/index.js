const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const appConfig = require('./app-config.js')

const port = appConfig.PORT

const sellRoute = require('./routes/sell.route.js')
const productRoute = require('./routes/product.route.js')
const paymentMethodRoute = require('./routes/payment-method.route.js')
const delay = require('./utils/delay.js')

console.log('Starting server...')
console.log('Port:', port)
console.log('AppFolder', __dirname)
console.log('Test Message:', appConfig.TEST_MESSAGE)

// Allow JSON parsing for requests
app.use(express.json())

// Morganize routes
app.use(morgan('dev'))

// Enable CORS
app.use(cors())

// Connect to MongoDB
mongoose
	.connect(appConfig.MONGODB_URI)
	.then(() => console.log('Conectado a MongoDB con Mongoose'))
	.catch((error) => console.error(error))

/// Default route
app.get('/', (_, res) => {
	res.send('¡Bienvenido a la API de Node JS!')
})

/// Delay
app.use(async (_req, _res, next) => {
	if (appConfig.DELAY_OPERATIONS === 'ENABLED') {
		await delay(appConfig.DELAY)
	}

	next()
})

/// Routes
app.use('/api/sells', sellRoute)
app.use('/api/products', productRoute)
app.use('/api/payment-methods', paymentMethodRoute)

// Start the server
app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`)
})
