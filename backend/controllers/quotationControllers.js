import asyncHandler from 'express-async-handler'
import Quotation from '../models/quotationModel.js'

export const createQuotation = asyncHandler(async (req, res) => {
	const quotation = req.body

	const data = await Quotation.create(quotation)

	if (data) {
		res.status(200).json(data)
	} else {
		res.status(402)
		throw new Error('Something Went Wrong')
	}
})

export const getAllQuotation = asyncHandler(async (req, res) => {
	const data = await Quotation.find().sort({ _id: -1 })

	if (data) {
		res.status(200).json(data)
	} else {
		res.status(402)
		throw new Error('Something Went Wrong')
	}
})

export const getQuotation = asyncHandler(async (req, res) => {
	const data = await Quotation.findById(req.params.id)

	if (data) {
		res.status(200).json(data)
	} else {
		res.status(402)
		throw new Error('Something Went Wrong')
	}
})

export const deleteQuotationByID = asyncHandler(async (req, res) => {
	const quotation = await Quotation.findById(req.params.id)

	if (quotation) {
		await quotation.remove()
		res.json({ message: 'Quotation Removed' })
	} else {
		res.status(404)
		throw new Error('Quotation Not Found')
	}
})
