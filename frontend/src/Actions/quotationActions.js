import axios from 'axios'
import {
	QUOTATION_CREATE_FAIL,
	QUOTATION_CREATE_REQUEST,
	QUOTATION_CREATE_SUCCESS,
	QUOTATION_GET_BY_ID_FAIL,
	QUOTATION_GET_BY_ID_REQUEST,
	QUOTATION_GET_BY_ID_SUCCESS,
	QUOTATION_VIEW_ALL_FAIL,
	QUOTATION_VIEW_ALL_REQUEST,
	QUOTATION_VIEW_ALL_SUCCESS,
} from '../Constants/quotationConstants'

export const createQuotation = (quotation) => async (dispatch) => {
	try {
		dispatch({
			type: QUOTATION_CREATE_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post('/api/quotation', quotation, config)

		dispatch({
			type: QUOTATION_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: QUOTATION_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const viewQuotations = () => async (dispatch) => {
	try {
		dispatch({
			type: QUOTATION_VIEW_ALL_REQUEST,
		})
		const { data } = await axios.get('/api/quotation')

		dispatch({
			type: QUOTATION_VIEW_ALL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: QUOTATION_VIEW_ALL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getQuotation = (id) => async (dispatch) => {
	try {
		dispatch({
			type: QUOTATION_GET_BY_ID_REQUEST,
		})
		const { data } = await axios.get(`/api/quotation/${id}`)

		dispatch({
			type: QUOTATION_GET_BY_ID_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: QUOTATION_GET_BY_ID_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
