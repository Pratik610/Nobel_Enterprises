import express from 'express'
import {
	createQuotation,
	getQuotation,
	getAllQuotation,
	deleteQuotationByID,
} from '../controllers/quotationControllers.js'
const router = express.Router()

//desc : Create Quoatation
//route :POST /api/quotation
router.post('/', createQuotation)

//desc : Get All Quoatation
//route :GET /api/quotation
router.get('/', getAllQuotation)

//desc : Delete Quoatation by ID
//route :DELETE /api/quotation
router.delete('/:id', deleteQuotationByID)

//desc : Get Quoatation By ID
//route :GET /api/quotation/:id
router.get('/:id', getQuotation)

export default router
