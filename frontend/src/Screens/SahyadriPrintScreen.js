import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotation } from '../Actions/quotationActions.js'
import { Helmet } from 'react-helmet'

const SahyadriPrintScreen = ({ match }) => {
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
		<div className='container sahyadri ' onClick={() => window.print()}>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Print sahyadrirashtra </title>
				<meta name='viewport' content='width=1024' />
			</Helmet>
			{loading && <h3>Loading...</h3>}
			{error && <h3>{error}</h3>}
			{quotationInfo && (
				<div className='row mt-2 sahyadri-border    '>
					{/* quotation header */}
					<div className='col-sm-12  p-1  bottom-sahyadri  '>
						<p className='text-right m-0 p-0 '>
							<span
								className='p-1 text-light'
								style={{
									'background-color': '#782913',
									'border-radius': '50px',
								}}
							>
								कोटेशन
							</span>
						</p>
						<h1 className='text-center mt-0 mb-0 pb-0 sahyadriname'>
							सह्याद्री स्टेशनर्स
						</h1>

						<h4 className='text-center mt-1 sahyadricolor text-capitalize '>
							सर्व प्रकारच्या स्टेशनरी आणि शालेय साहित्य पुरवठा
						</h4>
						<h5 className='text-center top-sahyadri sahyadricolor mb-0 mt-1 '>
							दुकान नं.४ , स.नं.९, बॉम्बे बाजार बिल्डिंग , पडेगाव , औरंगाबाद
						</h5>
					</div>
					<div className='col-sm-12 col-md-8  sahyadriTo pb-4   d-flex p-2 '>
						<div className='pr-2 mt-2 ml-3 '>प्रति, </div>
						<div className='w-75 pl-1 mt-2'>
							<p className='mb-2 bottom-sahyadri'>{quotationInfo.to}</p>
							<p className=' bottom-sahyadri  mb-2'>
								<span>{quotationInfo.schoolName}</span>
							</p>
							<p className=' bottom-sahyadri mb-2 '>
								<span>{quotationInfo.district}</span>
							</p>
						</div>
					</div>

					<div className='col-sm-12 col-md-4 left-sahyadri pt-5 pl-5  '>
						<p className='  text-capitalize'>
							नं. :{' '}
							<h3 className='d-inline text-danger'>{quotationInfo.billNo}</h3>
						</p>
						<p className=' mb-0'>दिनांक:</p>
					</div>
					{/* Quotation header ends */}

					<div className='col-12 top-sahyadri sahyadri-table-items'>
						<div className='row bottom-sahyadri'>
							<div className='col-1 text-center right-sahyadri p-1'>अ.क्र</div>
							<div className='col-6 text-center right-sahyadri p-1'>विवरण</div>
							<div className='col-2 text-center right-sahyadri p-1'>नग</div>
							<div className='col-3 text-center right-sahyadri p-1'>दर</div>

							{/* ............................................ */}
							{quotationInfo.items.map((i, index) => {
								return (
									<>
										<div
											key={index}
											className='col-1 text-center top-sahyadri right-sahyadri p-1'
										>
											{index + 1}
										</div>
										<div className='col-6 text-left top-sahyadri right-sahyadri p-1'>
											{i.itemName}
										</div>
										<div className='col-2 text-center top-sahyadri  right-sahyadri p-1'>
											{i.itemQty}
										</div>
										<div className='col-3 text-center top-sahyadri right-sahyadri p-1'>
											{i.itemPrice}
										</div>
									</>
								)
							})}
							{emptyItems.map((i, index) => (
								<>
									<div className='col-1 text-center top-sahyadri right-sahyadri p-1'>
										{quotationInfo.items.length + index + 1}
									</div>
									<div className='col-6 text-center top-sahyadri right-sahyadri p-1'></div>
									<div className='col-2 text-center top-sahyadri  right-sahyadri p-1'></div>
									<div className='col-3 text-center top-sahyadri right-sahyadri p-1'></div>
								</>
							))}
						</div>

						<div className='w-100 col-12 d-flex justify-content-between footer mb-0'>
							<div className='p-3'></div>
							<div className='pt-2 pr-2'>
								<h5 className='mt-5 sahyadricolor'>सह्याद्री स्टेशनर्स</h5>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default SahyadriPrintScreen
