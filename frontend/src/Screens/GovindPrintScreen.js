import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotation } from '../Actions/quotationActions.js'
import { Helmet } from 'react-helmet'

const GovindPrintScreen = ({ match }) => {
	const disptach = useDispatch()

	useEffect(() => {
		disptach(getQuotation(match.params.id))
	}, [disptach, match.params.id])

	const quotationById = useSelector((state) => state.quotationById)
	const { loading, error, quotationInfo } = quotationById

	let emptyItems = []

	if (quotationInfo) {
		const count = quotationInfo.type === 'Tax Invoice' ? 20 : 25
		for (let index = 0; index < count - quotationInfo.items.length; index++) {
			emptyItems.push(index)
		}
	}

	return (
		<div className='container maha ' onClick={() => window.print()}>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Print Maharashtra </title>
				<meta name='viewport' content='width=1024' />
			</Helmet>
			{loading && <h3>Loading...</h3>}
			{error && <h3>{error}</h3>}
			{quotationInfo && (
				<div className='row mt-2 maha-border    '>
					{/* quotation header */}
					<div className='col-sm-12  p-1 pb-3 bottom-maha  '>
						<p className='text-center mb-0 '>
							<span
								className='p-1 text-light'
								style={{
									'background-color': '#782913',
									'border-radius': '50px',
								}}
							>
								{quotationInfo.type}
							</span>
						</p>

						<h1 className='text-center mb-0 pb-0 mahaname'>
							GOVIND ENTERPRISES
						</h1>

						<h4 className='text-center mb-0 mahacolor text-capitalize '>
							Add : Mill Corner , Aurangabad - 431001
						</h4>
					</div>
					<div className='col-sm-12 col-md-8  mahaTo pb-4   d-flex p-2 '>
						<div className='pr-2 mt-2 ml-3 '>To, </div>
						<div className='w-75 pl-1 mt-2'>
							<p className='mb-2 bottom-maha'>{quotationInfo.to}</p>
							<p className=' bottom-maha  mb-2'>
								<span>{quotationInfo.schoolName}</span>
							</p>
							<p className=' bottom-maha mb-2 '>
								<span>{quotationInfo.district}</span>
							</p>
						</div>
					</div>

					<div className='col-sm-12 col-md-4 pt-5 pl-5 left-brown  '>
						<p className='  text-capitalize'>
							No.{' '}
							<h3 className='d-inline text-danger'>{quotationInfo.billNo}</h3>
						</p>
						<p className=' mb-0'>Date:</p>
					</div>
					{/* Quotation header ends */}

					<div className='col-12 top-maha maha-table-items'>
						<div className='row bottom-maha'>
							<div className='col-1 text-center right-maha p-1'>Sr.No.</div>
							<div className='col-5 text-center right-maha p-1'>
								Praticulars
							</div>
							<div className='col-2 text-center right-maha p-1'>Quantity</div>
							<div className='col-2 text-center right-maha p-1'>Rate</div>
							<div className='col-2 text-center p-1'>Amount</div>
							{/* ............................................ */}
							{quotationInfo.items.map((i, index) => {
								return (
									<>
										<div
											key={index}
											className='col-1 text-center top-maha right-maha p-1'
										>
											{index + 1}
										</div>
										<div className='col-5 text-center top-maha right-maha p-1'>
											{i.itemName}
										</div>
										<div className='col-2 text-center top-maha  right-maha p-1'>
											{i.itemQty}
										</div>
										<div className='col-2 text-center top-maha right-maha p-1'>
											{i.itemPrice}
										</div>
										<div className='col-2 text-center top-maha p-1'>
											{i.itemQty * i.itemPrice}
										</div>
									</>
								)
							})}
							{emptyItems.map((i, index) => (
								<>
									<div className='col-1 text-center top-maha right-maha p-1'>
										{quotationInfo.items.length + index + 1}
									</div>
									<div className='col-5 text-center top-maha right-maha p-1'></div>
									<div className='col-2 text-center top-maha  right-maha p-1'></div>
									<div className='col-2 text-center top-maha right-maha p-1'></div>
									<div className='col-2 text-center top-maha p-1'></div>
								</>
							))}
						</div>

						<div className='w-100 col-12 d-flex justify-content-between footer mb-0'>
							<div className='p-3'></div>
							<div className='pt-2 pr-2'>
								<h5 className=' mahacolor'>GOVIND ENTERPRISES</h5>
								<small className='d-block mt-5 text-center'>
									Authorised Signatory
								</small>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default GovindPrintScreen
