import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import users from './data/user.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Quotation from './models/quotationModel.js'
import connecDB from './config/db.js'

dotenv.config()
connecDB()

const importData = async () => {
	try {
		await Quotation.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		const createdUsers = await User.insertMany(users)
		const adminuser = createdUsers[0]._id

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminuser }
		})
		await Product.insertMany(sampleProducts)

		console.log('DATA IMPORTED !!')
		process.exit()
	} catch (error) {
		console.error(`${error}`)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Quotation.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('DATA Destroyed !!')
		process.exit()
	} catch (error) {
		console.error(`${error}`)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
