import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email, password })
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid Email or Password')
	}
})

export default userLogin
