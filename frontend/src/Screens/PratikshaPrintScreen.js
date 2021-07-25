import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotation } from '../Actions/quotationActions.js'
import { Helmet } from 'react-helmet'
import { ToWords } from 'to-words'

const PratikshaPrintScreen = ({ match }) => {
	const toWords = new ToWords()
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
		<div className='container  pratiksha ' onClick={() => window.print()}>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Print Pratiksha </title>
				<meta name='viewport' content='width=1024' />
			</Helmet>
			{loading && <h3>Loading...</h3>}
			{error && <h3>{error}</h3>}
			{quotationInfo && (
				<div className='row mt-2 border-red    '>
					{/* quotation header */}
					<div className='col-sm-12  p-1 pb-3 bottom-brown  '>
						<p className='text-center mb-0'>{quotationInfo.type}</p>
						<h1 className='text-center mb-0 mt-0 pb-0 pratikshaname'>
							PRATIKSHA ENTERPRISES
						</h1>

						<h2 className='text-center mb-0 text-capitalize '>
							Office Stationary , Sport , Science & School Material
						</h2>
						<h5 className='text-center mb-0 '>
							Plot No.14 , Ex-Servicemen Colony (West) , Padegaon , Aurangabad
						</h5>
					</div>
					<div className='col-sm-12 col-md-8  nobelTo pb-4   d-flex p-2 '>
						<div className='pr-2 mt-2 ml-3 '>To, </div>
						<div className='w-75 pl-1 mt-2'>
							<p className='mb-2 bottom-brown'>{quotationInfo.to}</p>
							<p className=' bottom-brown  mb-2'>
								<span>{quotationInfo.schoolName}</span>
							</p>
							<p className=' bottom-brown mb-2 '>
								<span>{quotationInfo.district}</span>
							</p>
						</div>
					</div>

					<div className='col-sm-12 col-md-4 pt-5 pl-5  '>
						<p className='  text-capitalize'>
							Quotation No.{' '}
							<h3 className='d-inline text-danger'>{quotationInfo.billNo}</h3>
						</p>
						<p className=' mb-0'>Date:</p>
					</div>
					{/* Quotation header ends */}

					<div className='col-12 top-brown pratiksha-table-items'>
						<div className='row bottom-brown'>
							<div className='col-1 text-center right-brown p-1'>Sr.No.</div>
							<div className='col-5 text-center right-brown p-1'>
								Description
							</div>
							<div className='col-2 text-center right-brown p-1'>Quantity</div>
							<div className='col-2 text-center right-brown p-1'>Rate</div>
							<div className='col-2 text-center p-1'>Amount</div>
							{/* ............................................ */}
							{quotationInfo.items.map((i, index) => {
								return (
									<>
										<div
											key={index}
											className='col-1 text-center top-brown right-brown p-1'
										>
											{index + 1}
										</div>
										<div className='col-5 text-left top-brown right-brown p-1'>
											{i.itemName}
										</div>
										<div className='col-2 text-center top-brown  right-brown p-1'>
											{i.itemQty}
										</div>
										<div className='col-2 text-center top-brown right-brown p-1'>
											{i.itemPrice}
										</div>
										<div className='col-2 text-center top-brown p-1'>
											{i.itemQty * i.itemPrice}
										</div>
									</>
								)
							})}
							{emptyItems.map((i, index) => (
								<>
									<div className='col-1 text-center top-brown right-brown p-1'>
										{quotationInfo.items.length + index + 1}
									</div>
									<div className='col-5 text-center top-brown right-brown p-1'></div>
									<div className='col-2 text-center top-brown  right-brown p-1'></div>
									<div className='col-2 text-center top-brown right-brown p-1'></div>
									<div className='col-2 text-center top-brown p-1'></div>
								</>
							))}
							{quotationInfo.type === 'Tax Invoice' && (
								<>
									<div className='col-8 top-brown bottom-brown right-brown'>
										<div className=''>
											<p className='text-capitalize  p-2  '>
												<small className='d-inline-block'>
													Amount in words.
												</small>
												<span className='bottom-brown d-inline-block'>
													{toWords.convert(quotationInfo.totalPrice)}
												</span>{' '}
											</p>
										</div>
									</div>
									<div className='col-2 top-brown bottom-brown right-brown text-center'>
										TOTAL
									</div>
									<div className='col-2  top-brown bottom-brown  text-center'>
										{quotationInfo.totalPrice}
									</div>

									<div className='w-100 col-12  footer mb-0'>
										<div className='row'>
											<div className='p-1 col-3 pt-5 right-brown '>
												<p className='text-center mt-5 mb-0'>
													Reciver's Signature
												</p>
											</div>
											<div className='p-1 col-6'>
												<strong className='d-block text-center'>
													OVERDUE INTEREST:
												</strong>
												<small>
													@24% P.A will be charged , we reserved the right to
													recover from you of other levy applicable to this
													transation under any Govt. enactment if not charged to
													you in the bill
												</small>
											</div>
											<div className='p-1 col-3 left-brown'>
												<h5 className='pb-1 brown text-center'>
													PRATIKSHA ENTERPRISES
												</h5>
												<p className='text-center mt-5 mb-0 pt-3'>Signature</p>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						{quotationInfo.type === 'Quotation' ? (
							<div className='w-100 col-12 d-flex justify-content-between footer mb-0'>
								<div className=''></div>
								<div className='p-3'>
									<h5 className='pb-1 brown'>PRATIKSHA ENTERPRISES</h5>
									<p className='text-center mt-5 mb-0'>Proprietor</p>
								</div>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default PratikshaPrintScreen
