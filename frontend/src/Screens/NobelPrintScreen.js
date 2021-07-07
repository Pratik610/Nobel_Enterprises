import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotation } from '../Actions/quotationActions.js'
import { Helmet } from 'react-helmet'
import { ToWords } from 'to-words'

const NobelPrintScreen = ({ match }) => {
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
		<div className='container  nobel blue ' onClick={() => window.print()}>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Print Nobel</title>
				<meta name='viewport' content='width=1024' />
			</Helmet>
			{loading && <h3>Loading...</h3>}
			{error && <h3>{error}</h3>}
			{quotationInfo && (
				<div className='row mt-2 border-blue    '>
					{/* quotation header */}
					<div className='col-sm-12 col-md-5 right-blue nobelTo   d-flex p-2 '>
						<div className='pr-2 mt-2 ml-3 '>To, </div>
						<div className='w-75 pl-1 mt-2'>
							<p className='mb-2 bottom-blue'>{quotationInfo.to}</p>
							<p className=' bottom-blue  mb-2'>
								<span>{quotationInfo.schoolName}</span>
							</p>
							<p className=' bottom-blue mb-2 '>
								<span>{quotationInfo.district}</span>
							</p>
						</div>
					</div>
					<div className='col-sm-12 col-md-2 p-0  right-blue   '>
						<div className='   p-2 '>
							<h4 className='text-center blue'>{quotationInfo.type}</h4>
						</div>

						<div className='  top-red  p-2 '>
							No.{' '}
							<h4 style={{ color: 'red' }} className='ml-2 d-inline'>
								{quotationInfo.billNo}
							</h4>
						</div>
						<div className=' top-blue p-2'>Date:</div>
						<div className=' top-blue p-2'>
							<h6 className='text-center blue'>GSTIN</h6>
							<p className='d-block text-center'>27BVCPS5158P1ZR</p>
						</div>
					</div>
					<div className='col-sm-12 col-md-5 p-1  '>
						<h1 className='text-center mb-0 pb-0 Nobelname'>NOBEL</h1>
						<h1 className='text-center mt-0 blue '>ENTERPRISES</h1>
						<p className='text-center mb-0 text-capitalize'>
							Nirantar Tower , 1st floor , Above ICICI Bank ATM , Khadkeshwar ,
							Aurangabad - 431001
						</p>
						<p className='text-center mb-0'>Mob. 9823215724</p>
					</div>
					{/* Quotation header ends */}

					<div className='col-12 top-blue table-items'>
						<div className='row bottom-blue'>
							<div className='col-1 text-center right-blue p-1'>Sr.No.</div>
							<div className='col-5 text-center right-blue p-1'>
								Description
							</div>
							<div className='col-2 text-center right-blue p-1'>Quantity</div>
							<div className='col-2 text-center right-blue p-1'>Rate</div>
							<div className='col-2 text-center p-1'>Amount</div>
							{/* ............................................ */}
							{quotationInfo.items.map((i, index) => {
								return (
									<>
										<div
											key={index}
											className='col-1 text-center top-blue right-blue p-1'
										>
											{index + 1}
										</div>
										<div className='col-5 text-center top-blue right-blue p-1'>
											{i.itemName}
										</div>
										<div className='col-2 text-center top-blue  right-blue p-1'>
											{i.itemQty}
										</div>
										<div className='col-2 text-center top-blue right-blue p-1'>
											{i.itemPrice}
										</div>
										<div className='col-2 text-center top-blue p-1'>
											{i.itemQty * i.itemPrice}
										</div>
									</>
								)
							})}
							{emptyItems.map((i, index) => (
								<>
									<div className='col-1 text-center top-blue right-blue p-1'>
										{quotationInfo.items.length + index + 1}
									</div>
									<div className='col-5 text-center top-blue right-blue p-1'></div>
									<div className='col-2 text-center top-blue  right-blue p-1'></div>
									<div className='col-2 text-center top-blue right-blue p-1'></div>
									<div className='col-2 text-center top-blue p-1'></div>
								</>
							))}
							{quotationInfo.type === 'Tax Invoice' && (
								<>
									<div className='col-8 top-blue bottom-blue right-blue'>
										<div className=''>
											<p className='text-capitalize  p-2  '>
												<small className='d-inline-block'>
													Amount in words.
												</small>
												<span className='bottom-blue d-inline-block'>
													{toWords.convert(quotationInfo.totalPrice)}
												</span>{' '}
											</p>
										</div>
									</div>
									<div className='col-2 top-blue bottom-blue right-blue text-center'>
										TOTAL
									</div>
									<div className='col-2  top-blue bottom-blue  text-center'>
										{quotationInfo.totalPrice}
									</div>
									<div className='col-12 shopact bottom-blue'>
										<p className='p-0 m-0'>
											SHOP ACT NO: SHOP/ABD/284/73563/2013/Dt.26/2/13
											GSTIN:27BVCPS5158P1ZR
										</p>
									</div>

									<div className='w-100 col-12  footer mb-0'>
										<div className='row'>
											<div className='p-1 col-3 pt-4 right-blue '>
												<p className='text-center mt-5'>Reciver's Signature</p>
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
											<div className='p-1 col-3 left-blue'>
												<h5 className='pb-1 blue text-center'>
													NOBEL ENTERPRISES
												</h5>
												<p className='text-center mt-5'>Signature</p>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						{quotationInfo.type === 'Quotation' ? (
							<div className='w-100 col-12 d-flex justify-content-between footer mb-0'>
								<div className='p-3'>
									<h6 className='blue'>Terms & Conditions</h6>
									<ol>
										<li>Delivery Within 15 Days</li>
										<li>Payment terms: 100% Payment Before Delivery</li>
										<li>GST Include</li>
									</ol>
								</div>
								<div className='p-3'>
									<h5 className='pb-1 blue'>NOBEL ENTERPRISES</h5>
									<p className='text-center mt-5'>Signature</p>
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

export default NobelPrintScreen
