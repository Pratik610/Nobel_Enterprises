import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen.js'
import CreateScreen from './Screens/CreateScreen.js'
import CreateProductScreen from './Screens/CreateProductScreen.js'
import AksharPrintScreen from './Screens/AksharPrintScreen.js'
import NobelPrintScreen from './Screens/NobelPrintScreen.js'
import EaglePrintScreen from './Screens/EaglePrintScreen.js'
import PratikshaPrintScreen from './Screens/PratikshaPrintScreen.js'
import MaharashtraPrintScreen from './Screens/MaharashtraPrintScreen.js'
import GovindPrintScreen from './Screens/GovindPrintScreen.js'
import RahulPrintScreen from './Screens/RahulPrintScreen.js'
import RohitPrintScreen from './Screens/RohitPrintScreen.js'
import SahyadriPrintScreen from './Screens/SahyadriPrintScreen.js'
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
			<Route path='/print/eagle/:id' component={EaglePrintScreen} />
			<Route path='/print/pratiksha/:id' component={PratikshaPrintScreen} />
			<Route path='/print/maharashtra/:id' component={MaharashtraPrintScreen} />
			<Route path='/print/sahyadri/:id' component={SahyadriPrintScreen} />
			<Route path='/print/govind/:id' component={GovindPrintScreen} />
			<Route path='/print/rahul/:id' component={RahulPrintScreen} />
			<Route path='/print/rohit/:id' component={RohitPrintScreen} />
			<Route path='/viewproducts' component={ViewAllProducts} />
			<Route path='/quotations' component={ViewAllQuotations} />
			<Route path='/print/:id' exact component={PrintOptionScreen} />
		</Router>
	)
}

export default App
