import express, { json } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import protect from '../middleware/authModdleware.js'
import userLogin from '../controllers/userControllers.js'

const router = express.Router()

// desc = get all users
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const data = await User.find({})
		res.json(data)
	})
)

//desc login user
router.post('/login', userLogin)

//desc get user profile

router.get(
	'/login/profile',
	protect,
	asyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id)
		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			})
		} else {
			res.status(404)
			throw new Error('user not Found')
		}
	})
)

export default router
