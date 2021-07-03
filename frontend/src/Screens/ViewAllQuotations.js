import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { viewQuotations } from '../Actions/quotationActions.js'

const ViewAllQuotations = ({ history }) => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	if (!userInfo) {
		history.push('/login')
	}

	const viewAllQuotation = useSelector((state) => state.viewAllQuotation)
	const { loading, quotationList, error } = viewAllQuotation

	useEffect(() => {
		dispatch(viewQuotations())
	}, [dispatch])

	return (
		<div className='container'>
			<Header title='All Quotations' />
			<button
				onClick={() => history.push('/')}
				className='btn btn-outline-dark m-2'
			>
				Back
			</button>
			{loading && <p>Loading..</p>}
			{error && <p>{error}</p>}
			<table className='table w-100 table-responsive'>
				<thead>
					<tr>
						<th>Sr.No.</th>
						<th>Village , District</th>
						<th>Date</th>
						<th>Type</th>
						<th>Print</th>
					</tr>
				</thead>
				<tbody>
					{quotationList &&
						quotationList.map((quotation, index) => (
							<tr key={quotation._id}>
								<td>{index + 1}</td>
								<td>
									{quotation.village} , {quotation.district}{' '}
								</td>
								<td>{quotation.createdAt}</td>
								<td>{quotation.type}</td>
								<td>
									<Link to={`/print/${quotation._id}`} className='m-2'>
										<button className='btn btn-success btn-block'>Print</button>
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default ViewAllQuotations
