import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Actions/userActions.js'

const LoginScreen = ({ history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	useEffect(() => {
		if (userInfo) {
			history.push('/')
		}
	}, [history, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<div className='container mt-3'>
			<h3 className='text-center'>Login Screen</h3>
			{error && <p>{error}</p>}
			{loading && (
				<div className='spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			)}
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label htmlFor=''>Email</label>
					<input
						type='text'
						name=''
						id=''
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className='form-control'
						placeholder=''
						aria-describedby='helpId'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor=''>Password</label>
					<input
						type='text'
						name=''
						id=''
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className='form-control'
						placeholder=''
						aria-describedby='helpId'
					/>
				</div>
				<button type='submit' className='btn btn-block btn-dark'>
					Login
				</button>
			</form>
		</div>
	)
}

export default LoginScreen
