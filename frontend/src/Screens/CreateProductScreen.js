import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../Components/Header.js'
import { createProducts } from '../Actions/productActions'
import { v4 as uuidv4 } from 'uuid'
import { PRODUCT_CREATE_RESET } from '../Constants/productConstants.js'

const CreateProductScreen = ({ history }) => {
	const [productList, setProductsList] = useState([])
	const [product, setProduct] = useState('')

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const createdProducts = useSelector((state) => state.createProducts)
	const { createdProducts: cp, loading, error } = createdProducts

	const dispatch = useDispatch()

	if (!userInfo) {
		history.push('/login')
	}
	if (cp) {
		history.push('/')
		dispatch({ type: PRODUCT_CREATE_RESET })
	}

	const addItem = () => {
		setProductsList([
			...productList,
			{ itemID: uuidv4(), name: product, user: userInfo._id },
		])
		setProduct('')
	}

	const deleteItem = (i) => {
		if (window.confirm(`Delete ?`)) {
			setProductsList(productList.filter((item) => item.itemID !== i))
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(createProducts(productList))
	}

	return (
		<div className='container'>
			<Header title='Create Product' />

			<div className='main'>
				<form onSubmit={submitHandler}>
					<button
						className='btn d-block p-2 pr-4 pl-4 btn-outline-dark mb-3'
						onClick={() => window.history.back()}
					>
						Back
					</button>{' '}
					{error && <p>{error}</p>}
					{loading && (
						<div className='spinner-border text-primary' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					)}
					<div className='form-group'>
						<label htmlFor=''>Product Name</label>
						<input
							type='text'
							name=''
							id=''
							onChange={(e) => setProduct(e.target.value)}
							value={product}
							className='form-control'
							placeholder=''
							aria-describedby='helpId'
						/>
					</div>
					<button
						type='button'
						onClick={addItem}
						className='btn btn-block btn-dark'
					>
						Add Item
					</button>
					<button type='submit' className='btn btn-block btn-success'>
						Submit
					</button>
				</form>
				{productList.length > 0 ? (
					<table className='table'>
						<thead>
							<tr>
								<th>Sr.No</th>
								<th>Name</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{productList.map((product, index) => (
								<tr key={index}>
									<td>{index}</td>
									<td>{product.name}</td>
									<td>
										<button
											className='btn btn-danger'
											onClick={() => deleteItem(product.itemID)}
										>
											<i className='fas fa-trash text-light'></i>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className='alert mt-4 w-100 alert-danger' role='alert'>
						<strong>0 Items</strong>
					</div>
				)}
			</div>
		</div>
	)
}

export default CreateProductScreen
