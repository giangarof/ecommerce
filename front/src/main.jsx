//react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

//redux
import store from './store'
import { Provider } from 'react-redux'

//css
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

//components
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

//paypal
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

//screens
import App from './App.jsx'
import Home from './screens/Home.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import SignupScreen from './screens/SignupScreen.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import OrderListScreen from './screens/OrderListScreen.jsx'
import ProductListScreenAdmin from './screens/ProductListScreenAdmin.jsx'
import CreateProductScreen from './screens/CreateProductScreen.jsx'
import EditProductScreen from './screens/EditProductScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/signup' element={<SignupScreen/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>}/> 
        <Route path='/payment' element={<PaymentScreen/>}/> 
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/> 
        <Route path='/order/:id' element={<OrderScreen/>}/> 
        <Route path='/profile' element={<ProfileScreen/>}/> 
      </Route>

      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/productlist' element={<ProductListScreenAdmin/>}/>
        <Route path='/admin/addproduct' element={<CreateProductScreen/>}/>
        <Route path='/admin/editproduct/:id' element={<EditProductScreen/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>

        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
)
