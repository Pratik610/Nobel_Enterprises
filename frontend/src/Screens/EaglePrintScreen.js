import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotation } from '../Actions/quotationActions.js'
import { Helmet } from 'react-helmet'
import { ToWords } from 'to-words'

const EaglePrintScreen = ({ match }) => {
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
		<div className='container  eagle red ' onClick={() => window.print()}>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Print Eagle</title>
				<meta name='viewport' content='width=1024' />
			</Helmet>
			{loading && <h3>Loading...</h3>}
			{error && <h3>{error}</h3>}
			{quotationInfo && (
				<div className='row mt-2 border-red    '>
					{/* quotation header */}
					<div className='col-sm-12 col-md-5 right-red eagleTo pt-2  d-flex p-2 '>
						<div className='pr-2 mt-2 ml-3'>To, </div>
						<div className='w-75 pl-1 mt-2'>
							<p className='mb-2 bottom-red'>{quotationInfo.to}</p>
							<p className=' bottom-red  mb-2'>
								<span>{quotationInfo.schoolName}</span>
							</p>
							<p className=' bottom-red mb-2 '>
								<span>{quotationInfo.district}</span>
							</p>
						</div>
					</div>
					<div className='col-sm-12 col-md-2 p-0  right-red   '>
						<div className='   p-2 '>
							<h4 className='text-center red mt-2 '>{quotationInfo.type}</h4>
						</div>
						<div className=' top-red  p-2 '>
							No.{' '}
							<h4 style={{ color: 'red' }} className='ml-2 d-inline'>
								{quotationInfo.billNo}
							</h4>
						</div>
						<div className=' top-red p-2 bottom-red'>Date:</div>
					</div>
					<div className='col-sm-12 col-md-5 p-2  '>
						<h1 className='text-center mb-0 pb-0 Eaglename'>EaglE</h1>
						<h1 className='text-center mt-0 red '>ENTERPRISES</h1>
						<p className='text-center mb-0 text-capitalize'>
							Opp.Anjali Big Cinema's , Khadkeshwar , Aurangabad
						</p>
						<p className='text-center mb-1'>Mob. 9823215724 , 9823214724</p>
					</div>
					{/* Quotation header ends */}

					<div className='col-12 top-red table-items'>
						<div className='row bottom-red'>
							<div className='col-1 text-center right-red p-1'>Sr.No.</div>
							<div className='col-5 text-center right-red p-1'>Description</div>
							<div className='col-2 text-center right-red p-1'>Quantity</div>
							<div className='col-2 text-center right-red p-1'>Rate</div>
							<div className='col-2 text-center p-1'>Amount</div>
							{/* ............................................ */}
							{quotationInfo.items.map((i, index) => {
								return (
									<>
										<div
											key={index}
											className='col-1 text-center top-red right-red p-1'
										>
											{index + 1}
										</div>
										<div className='col-5 text-center top-red right-red p-1'>
											{i.itemName}
										</div>
										<div className='col-2 text-center top-red  right-red p-1'>
											{i.itemQty}
										</div>
										<div className='col-2 text-center top-red right-red p-1'>
											{i.itemPrice}
										</div>
										<div className='col-2 text-center top-red p-1'>
											{i.itemQty * i.itemPrice}
										</div>
									</>
								)
							})}
							{emptyItems.map((i, index) => (
								<>
									<div className='col-1 text-center top-red right-red p-1'>
										{quotationInfo.items.length + index + 1}
									</div>
									<div className='col-5 text-center top-red right-red p-1'></div>
									<div className='col-2 text-center top-red  right-red p-1'></div>
									<div className='col-2 text-center top-red right-red p-1'></div>
									<div className='col-2 text-center top-red p-1'></div>
								</>
							))}
							{quotationInfo.type === 'Tax Invoice' && (
								<>
									<div className='col-8 top-red bottom-red right-red'>
										{/* <Rupees total={} /> */}
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
									<div className='col-2 pt-1 top-red bottom-red right-red text-center'>
										TOTAL
									</div>
									<div className='col-2  pt-1 top-red bottom-red  text-center'>
										{quotationInfo.totalPrice}
									</div>

									<div className='w-100 col-12  footer mb-0'>
										<div className='row'>
											<div className='p-1 col-3 pt-4 right-red '>
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
											<div className='p-1 col-3 left-red'>
												<p className='pb-1 red text-center'>
													Eagle Enterprises
												</p>
												<p className='text-center mt-5'>Signature</p>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						{quotationInfo.type === 'Quotation' ? (
							<div className='w-100  col-12 d-flex justify-content-between footer mb-0'>
								<div className=' pt-3'>
									<ul className=''>
										<li>VAT TIN NO. 27470127487-V-w.e.f.1-4-2006</li>
										<li>CST IN NO. 27470127487-C-w.e.f.1-4-2006</li>
									</ul>
								</div>
								<div className=' pt-2 pr-2 '>
									<h5 className='pb-1 mt-0 red'>Eagle Enterprises</h5>
									<p className='text-center pt-1 d-block mt-5 '>Signature</p>
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

export default EaglePrintScreen
