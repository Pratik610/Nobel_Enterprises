import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// desc : Fetch All Products
// route :GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find()
	res.json(products)
})

// desc : Fetch Single Product
// route :GET /api/products:id
export const getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404).json({ message: 'Product Not Found' })
	}
})

export const createProducts = asyncHandler(async (req, res) => {
	let getProducts = req.body

	const product = await Product.insertMany(getProducts)

	if (product) {
		res.status(201).json({
			_id: product._id,
			name: product.name,
			user: product.user,
		})
	} else {
		res.status(400)
		throw new Error('invalid User data')
	}
})

export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'Product Removed' })
	} else {
		res.status(404)
		throw new Error('Product Not Found')
	}
})
