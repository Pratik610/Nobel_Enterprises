import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'

const HomeScreen = ({ history }) => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	if (!userInfo) {
		history.push('/login')
	}
	return (
		<div className='container'>
			<Header title='Noble Enterprises' />
			<div className='main'>
				<Link to='/create' className='m-2'>
					<button className='btn btn-dark btn-block'>Create</button>
				</Link>
				<Link to='/quotations' className='m-2'>
					<button className='btn btn-dark btn-block'>
						View All Quotations
					</button>
				</Link>
				<Link to='/addproduct' className='m-2'>
					<button className='btn btn-dark btn-block'>Add Product</button>
				</Link>
				<Link to='/viewproducts' className='m-2'>
					<button className='btn btn-dark btn-block'>View All Products</button>
				</Link>
			</div>
			<Footer />
		</div>
	)
}

export default HomeScreen
