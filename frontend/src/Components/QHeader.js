import React from 'react'

const QHeader = ({ schoolDetails }) => {
	return (
		<>
			<div className='col-sm-12 col-md-5 right-blue to  d-flex p-3 '>
				<div className='pr-2 mt-2'>To, </div>
				<div className='w-75 pl-1 mt-2'>
					<p className='mb-2 bottom-blue'>{schoolDetails.to}</p>
					<p className=' bottom-blue  mb-2'>
						जी पा प्रशाला <span>{schoolDetails.village}</span>
					</p>
					<p className=' bottom-blue mb-2 '>
						<span>{schoolDetails.district}</span>
					</p>
				</div>
			</div>
			<div className='col-sm-12 col-md-2 p-0  right-blue   '>
				<div className=' mt-5 top-blue  p-2 '>No.</div>
				<div className=' top-blue p-2'>Date:</div>
				<div className=' top-blue p-2'>
					<h6 className='text-center'>GSTIN</h6>
					<p className='d-block text-center'>27BVCPS5158P1ZR</p>
				</div>
			</div>
			<div className='col-sm-12 col-md-5 p-1  '>
				<h1 className='text-center mb-0 pb-0 name'>NOBEL</h1>
				<h1 className='text-center mt-0 '>ENTERPRISES</h1>
				<p className='text-center mb-0 text-capitalize'>
					Nirantar Tower , 1st floor , Above ICICI Bank ATM , Khadkeshwar ,
					Aurangabad - 431001
				</p>
				<p className='text-center mb-0'>Mob. 9823215724</p>
			</div>
		</>
	)
}

export default QHeader
