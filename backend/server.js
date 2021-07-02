import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import quotationRoutes from './routes/quotationRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import User from './models/userModel.js'
import path from 'path'
dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/users/', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/quotation', quotationRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('Api is Running....')
	})
}
// Error Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(
	process.env.PORT,
	console.log(`Server is Running on PORT:${process.env.PORT}`)
)
