import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen.js'
import CreateScreen from './Screens/CreateScreen.js'
import CreateProductScreen from './Screens/CreateProductScreen.js'
import AksharPrintScreen from './Screens/AksharPrintScreen.js'
import NobelPrintScreen from './Screens/NobelPrintScreen.js'
import ViewAllProducts from './Screens/ViewAllProducts.js'
import LoginScreen from './Screens/LoginScreen.js'
import ViewAllQuotations from './Screens/ViewAllQuotations.js'
import PrintOptionScreen from './Screens/PrintOptionScreen'
function App() {
	return (
		<Router>
			<Route path='/' exact component={HomeScreen} />
			<Route path='/login' exact component={LoginScreen} />
			<Route path='/create' component={CreateScreen} />
			<Route path='/addproduct' component={CreateProductScreen} />
			<Route path='/print/akshar/:id' component={AksharPrintScreen} />
			<Route path='/print/nobel/:id' component={NobelPrintScreen} />
			<Route path='/viewproducts' component={ViewAllProducts} />
			<Route path='/quotations' component={ViewAllQuotations} />
			<Route path='/print/:id' exact component={PrintOptionScreen} />
		</Router>
	)
}

export default App
