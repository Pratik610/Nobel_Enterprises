import {
	QUOTATION_CREATE_FAIL,
	QUOTATION_CREATE_RESET,
	QUOTATION_CREATE_SUCCESS,
	QUOTATION_CREATE_REQUEST,
	QUOTATION_VIEW_ALL_REQUEST,
	QUOTATION_VIEW_ALL_SUCCESS,
	QUOTATION_VIEW_ALL_FAIL,
	QUOTATION_GET_BY_ID_REQUEST,
	QUOTATION_GET_BY_ID_SUCCESS,
	QUOTATION_GET_BY_ID_FAIL,
} from '../Constants/quotationConstants.js'

export const quotationCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case QUOTATION_CREATE_REQUEST:
			return { loading: true }
		case QUOTATION_CREATE_SUCCESS:
			return { loading: false, quotation: action.payload }
		case QUOTATION_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case QUOTATION_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const viewAllQuotationReducer = (state = {}, action) => {
	switch (action.type) {
		case QUOTATION_VIEW_ALL_REQUEST:
			return { loading: true }
		case QUOTATION_VIEW_ALL_SUCCESS:
			return { loading: false, quotationList: action.payload }
		case QUOTATION_VIEW_ALL_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const quotationByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case QUOTATION_GET_BY_ID_REQUEST:
			return { loading: true }
		case QUOTATION_GET_BY_ID_SUCCESS:
			return { loading: false, quotationInfo: action.payload }
		case QUOTATION_GET_BY_ID_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
