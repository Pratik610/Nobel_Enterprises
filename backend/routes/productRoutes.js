import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import {
	createProducts,
	deleteProduct,
	getProduct,
	getProducts,
} from '../controllers/productControllers.js'

const router = express.Router()

// desc : Fetch All Products
// route :GET /api/products
router.get('/', getProducts)

// desc : Fetch All Products
// route :GET /api/products/:id
router.get('/:id', getProduct)

//desc : Add new Products To DB
// route :POST /api/products
router.post('/', createProducts)

//desc : Delete Product from DB
// route :DELETE /api/products
router.delete('/:id', deleteProduct)

export default router
