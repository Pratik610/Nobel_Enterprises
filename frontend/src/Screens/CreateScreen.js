import React, { useState, useEffect } from 'react'
import Header from '../Components/Header.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import { createQuotation } from '../Actions/quotationActions.js'
import { QUOTATION_CREATE_RESET } from '../Constants/quotationConstants.js'

const AddItemScreen = ({ history }) => {
	const [items, setItems] = useState([])
	const [item, setItem] = useState('')
	const [type, setType] = useState('Quotation')
	const [qty, setQty] = useState(1)
	const [price, setPrice] = useState('')
	const [district, setDistrict] = useState('')
	const [village, setVillage] = useState('')
	const [products, setProducts] = useState([])
	const [to, setTo] = useState('मुख्याध्यापक')

	// when to disable conditions
	let dis = items.length === 0 ? true : false
	let dis2 = type === 'Quotation' ? true : false

	const dispatch = useDispatch()

	useEffect(() => {
		const getProductsFromBackend = async () => {
			const { data } = await axios.get('/api/products')
			setProducts(data)
		}

		getProductsFromBackend()
	}, [])

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const quotationCreate = useSelector((state) => state.quotationCreate)
	const { quotation, error } = quotationCreate

	if (!userInfo) {
		history.push('/login')
	}

	if (quotation) {
		history.push(`/print/${quotation._id}`)
		dispatch({
			type: QUOTATION_CREATE_RESET,
		})
	}

	// add item to list
	const addItem = () => {
		setItems([
			...items,
			{
				itemID: uuidv4(),
				itemName: item,
				itemQty: Number(qty),
				itemPrice: Number(price),
			},
		])
		setItem('')
		setQty(1)
		setPrice('')
	}

	//get items from  localstorage
	const getItemsFromLocalStorage = () => {
		setItems(JSON.parse(localStorage.getItem('Items')))
	}

	//delete  item from list
	const deleteItem = (i) => {
		if (window.confirm(`Delete ?`)) {
			setItems(items.filter((item) => item.itemID !== i))
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()

		localStorage.setItem('Items', JSON.stringify(items))

		const total = items.reduce(
			(acc, i) => Number(acc) + i.itemQty * i.itemPrice,
			(0).toFixed(2)
		)

		const quoation = {
			user: userInfo._id,
			type: type,
			to: to,
			village,
			district,
			items: items,
			totalPrice: total,
		}

		dispatch(createQuotation(quoation))
	}

	const handleOnDragEnd = (result) => {
		if (!result.destination) return
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)
		setItems(items)
	}

	return (
		<div className='container'>
			<Header title='Create' />
			{error && <p>{error}</p>}

			<div className='main'>
				<form onSubmit={submitHandler}>
					<div className='d-flex justify-content-between  pl-3 pr-3'>
						<button
							className='btn d-block p-2 pr-4 pl-4 btn-outline-dark mb-3'
							onClick={() => window.history.back()}
						>
							Back
						</button>{' '}
						<button
							className='btn d-block p-2 pr-4 pl-4 btn-outline-dark mb-3'
							onClick={() => getItemsFromLocalStorage()}
						>
							Get last Items
						</button>
						<button
							className='btn d-block p-2 pr-4 pl-4 btn-outline-warning mb-3'
							type='submit'
							disabled={dis}
						>
							Next
						</button>
					</div>

					<div className='form-group'>
						<label htmlFor=''>Type</label>
						<select
							className='form-control'
							onChange={(e) => setType(e.target.value)}
							name=''
							id=''
						>
							<option value='Quotation'>Quotation</option>
							<option value='Tax Invoice'>Tax Invoice</option>
						</select>
					</div>

					<div className='form-group'>
						<label htmlFor=''>To</label>
						<input
							type='text'
							name=''
							id=''
							required
							onChange={(e) => setTo(e.target.value)}
							value={to}
							className='form-control'
							placeholder=''
							aria-describedby='helpId'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor=''>Village</label>
						<input
							type='text'
							name=''
							id=''
							required
							onChange={(e) => setVillage(e.target.value)}
							value={village}
							className='form-control'
							placeholder=''
							aria-describedby='helpId'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor=''>District</label>
						<input
							type='text'
							name=''
							id=''
							required
							onChange={(e) => setDistrict(e.target.value)}
							value={district}
							className='form-control'
							placeholder=''
							aria-describedby='helpId'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor=''>Item</label>
						<input
							type='text'
							list='allitems'
							value={item}
							onChange={(e) => setItem(e.target.value.trim())}
							className='form-control mb-2 mr-sm-2'
						/>
						<datalist id='allitems'>
							{products.map((i) => (
								<option key={i._id} value={i.name} />
							))}
						</datalist>
					</div>
					<div className='row'>
						<div className='form-group col-6'>
							<label htmlFor=''>Quantity</label>
							<input
								type='text'
								name=''
								id=''
								required
								disabled={dis2}
								onChange={(e) => setQty(e.target.value)}
								value={qty}
								className='form-control'
								placeholder=''
								aria-describedby='helpId'
							/>
						</div>
						<div className='form-group col-6'>
							<label htmlFor=''>Price</label>
							<input
								type='number'
								name=''
								id=''
								onChange={(e) => setPrice(e.target.value)}
								value={price}
								className='form-control'
								placeholder=''
								aria-describedby='helpId'
							/>
						</div>
					</div>
					<button
						type='button'
						onClick={addItem}
						className='btn btn-block btn-dark'
					>
						Add Item
					</button>
				</form>
				{items.length > 0 ? (
					<table className='table mt-2 table-dark table-responsive-sm table-bordered'>
						<thead className='thead-dark'>
							<tr>
								<th>Item</th>
								<th>Quantity</th>
								<th>Price</th>
								<th></th>
							</tr>
						</thead>
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable droppableId='items'>
								{(provided) => (
									<tbody {...provided.droppableProps} ref={provided.innerRef}>
										{items.map((i, index) => (
											<Draggable
												key={i.itemID}
												draggableId={i.itemID}
												index={index}
											>
												{(provided) => (
													<tr
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
														className='w-100'
													>
														<td>{i.itemName.substring(0, 20)}</td>
														<td>{i.itemQty}</td>
														<td>{i.itemPrice}</td>

														<td>
															<button
																className='btn btn-danger'
																onClick={() => deleteItem(i.itemID)}
															>
																<i className='fas fa-trash text-light'></i>
															</button>
														</td>
													</tr>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</tbody>
								)}
							</Droppable>
						</DragDropContext>
					</table>
				) : (
					<div className='alert alert-danger mt-2 w-100' role='alert'>
						<strong>0 Items</strong>
					</div>
				)}
			</div>
		</div>
	)
}

export default AddItemScreen
