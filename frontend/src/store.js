import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './Reducers/userReducers.js'
import {
	createProductsReducer,
	productListReducer,
	productDeleteReducer,
} from './Reducers/productReducers.js'
import {
	quotationCreateReducer,
	viewAllQuotationReducer,
	quotationByIdReducer,
	deleteQuotationReducer,
} from './Reducers/quotationReducers.js'

const reducer = combineReducers({
	userLogin: userLoginReducer,
	createProducts: createProductsReducer,
	productList: productListReducer,
	productDelete: productDeleteReducer,
	quotationCreate: quotationCreateReducer,
	viewAllQuotation: viewAllQuotationReducer,
	quotationById: quotationByIdReducer,
	deleteQuotation: deleteQuotationReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
