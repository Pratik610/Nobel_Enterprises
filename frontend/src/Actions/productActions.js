import axios from 'axios'

import {
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
} from '../Constants/productConstants.js'

export const createProducts = (products) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		delete products.itemID
		const { data } = await axios.post('/api/products', products, config)
		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getAllProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		})

		const { data } = await axios.get('/api/products')
		console.log(data)
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		})

		await axios.delete(`/api/products/${id}`)

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
