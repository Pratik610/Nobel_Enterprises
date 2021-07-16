import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../Components/Header.js'
import { Helmet } from 'react-helmet'

const HomeScreen = ({ history, match }) => {
	const id = match.params.id

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	if (!userInfo) {
		history.push('/login')
	}

	return (
		<div className='container'>
			<Helmet>
				<meta charSet='utf-8' />
				<title>View All Quotation</title>
				<meta name='viewport' content='width=device-width' />
			</Helmet>
			<Header title='Print' />

			<button
				className='btn d-block p-2 pr-4 pl-4 btn-outline-dark mb-3'
				onClick={() => window.history.back()}
			>
				Back
			</button>
			<div className='main'>
				<Link to={`/print/nobel/${id}`} className='m-2'>
					<button
						style={{ background: '#4561bf' }}
						className='btn text-light  btn-block'
					>
						Nobel
					</button>
				</Link>
				<Link to={`/print/akshar/${id}`} className='m-2'>
					<button
						style={{ background: '#1d6128' }}
						className='btn text-light btn-block'
					>
						Akshar
					</button>
				</Link>
				<Link to={`/print/eagle/${id}`} className='m-2'>
					<button
						style={{ background: '#3ba30b' }}
						className='btn text-light btn-block'
					>
						Eagle
					</button>
				</Link>
				<Link to={`/print/pratiksha/${id}`} className='m-2'>
					<button
						style={{ background: '#4d4743' }}
						className='btn text-light btn-block'
					>
						Pratiksha
					</button>
				</Link>
				<Link to={`/print/maharashtra/${id}`} className='m-2'>
					<button
						style={{ background: '#cf4404' }}
						className='btn text-light btn-block'
					>
						Maharashtra
					</button>
				</Link>
				<Link to={`/print/sahyadri/${id}`} className='m-2'>
					<button
						style={{ background: '#30211d' }}
						className='btn text-light btn-block'
					>
						Sahyadri
					</button>
				</Link>
				<Link to={`/print/govind/${id}`} className='m-2'>
					<button
						style={{ background: '#2a3685' }}
						className='btn text-light btn-block'
					>
						Govind
					</button>
				</Link>
				<Link to={`/print/rohit/${id}`} className='m-2'>
					<button
						style={{ background: '#191d24' }}
						className='btn text-light btn-block'
					>
						Rohit
					</button>
				</Link>
				<Link to={`/print/rahul/${id}`} className='m-2'>
					<button
						style={{ background: '#3362a3' }}
						className='btn text-light btn-block'
					>
						Rahul
					</button>
				</Link>
			</div>
		</div>
	)
}

export default HomeScreen
