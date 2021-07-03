import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Components/Header'
import { getAllProducts, deleteProduct } from '../Actions/productActions.js'

const ViewAllProducts = ({ history }) => {
	const dispatch = useDispatch()
	// const [products, setProducts] = useState([])

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	if (!userInfo) {
		history.push('/login')
	}

	const productList = useSelector((state) => state.productList)
	const { loading, products, error } = productList

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete

	useEffect(() => {
		dispatch(getAllProducts())
	}, [dispatch, successDelete])

	const deleteItem = (id) => {
		if (window.confirm()) {
			dispatch(deleteProduct(id))
		}
	}

	return (
		<div className='container'>
			<Header title='All Products' />
			<button
				onClick={() => history.push('/')}
				className='btn btn-outline-dark m-2'
			>
				Back
			</button>
			{loading && <p>Loading..</p>}
			{error && <p>{error}</p>}
			{loadingDelete && <p>Loading..</p>}
			{errorDelete && <p>{errorDelete}</p>}

			<table className='table w-100 table-responsive'>
				<thead>
					<tr>
						<th>Sr.No.</th>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map((product, index) => (
							<tr key={product._id}>
								<td>{index + 1}</td>
								<td>{product.name}</td>
								<td>
									<button
										className='btn btn-danger'
										onClick={() => deleteItem(product._id)}
									>
										<i className='fas fa-trash text-light'></i>
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default ViewAllProducts
