import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../Components/Header.js'
import { Helmet } from 'react-helmet'
import Footer from '../Components/Footer.js'

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
			</div>
			<Footer />
		</div>
	)
}

export default HomeScreen
