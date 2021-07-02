import mongoose from 'mongoose'

const quotationSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		type: {
			type: String,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
		village: {
			type: String,
			required: true,
		},
		district: {
			type: String,
			required: true,
		},
		items: [
			{
				itemName: { type: String, required: true },
				itemQty: { type: Number, required: true },
				itemPrice: { type: Number, required: true },
			},
		],
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
	},
	{
		timestamps: true,
	}
)

const Quotation = mongoose.model('Quotation', quotationSchema)

export default Quotation
