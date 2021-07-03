import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USER_LOGOUT } from '../Constants/userConstants.js'

const Header = ({ title }) => {
	let toggler = true

	const dispatch = useDispatch()

	const logout = () => {
		dispatch({ type: USER_LOGOUT })
		localStorage.removeItem('userInfo')
	}

	const toggle = () => {
		if (toggler) {
			toggler = false

			document.getElementById('mySidenav').style.width = '250px'
		} else {
			toggler = true
			document.getElementById('mySidenav').style.width = '0px'
		}
	}

	return (
		<>
			<div id='mySidenav' className='sidenav '>
				<b className='closebtn text-light' onClick={toggle}>
					&times;
				</b>

				<Link to='/'>
					<button className='btn btn-outline-light btn-block'>HOME</button>
				</Link>
				<div className='pl-4  mt-5 '>
					<button onClick={logout} className='btn btn-outline-danger btn-block'>
						Logout
					</button>
				</div>
			</div>

			<div className='d-flex justify-content-between p-1'>
				<div>
					<h4 className='pt-2  text-secondary'>{title}</h4>
				</div>
				<div className='p-2'>
					<h3 onClick={toggle}>
						<i className='fas fa-bars'></i>
					</h3>
				</div>
			</div>
		</>
	)
}

export default Header
