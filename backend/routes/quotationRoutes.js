import express from 'express'
import {
	createQuotation,
	getQuotation,
	getAllQuotation,
} from '../controllers/quotationControllers.js'
const router = express.Router()

//desc : Create Quoatation
//route :POST /api/quotation
router.post('/', createQuotation)

//desc : Get All Quoatation
//route :GET /api/quotation
router.get('/', getAllQuotation)

//desc : Get Quoatation By ID
//route :GET /api/quotation/:id
router.get('/:id', getQuotation)

export default router
