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
import LoginScreen from './screens/user/LoginScreen.jsx'
import SignupScreen from './screens/user/SignupScreen.jsx'
import ShippingScreen from './screens/proccess/ShippingScreen.jsx'
import PaymentScreen from './screens/proccess/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/proccess/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import ProfileScreen from './screens/user/ProfileScreen.jsx'
import OrderListScreen from './screens/OrderListScreen.jsx'

import ProductListScreenAdmin from './screens/Admin/ProductListScreenAdmin.jsx'
import CreateProductScreen from './screens/Admin/CreateProductScreen.jsx'
import EditProductScreen from './screens/Admin/EditProductScreen.jsx'
import UserListScreenAdmin from './screens/Admin/UserListScreenAdmin.jsx'
import EditUserScreen from './screens/Admin/EditUserScreen.jsx'

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
      {/* orders */}
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>

        {/* products */}
        <Route path='/admin/productlist' element={<ProductListScreenAdmin/>}/>
        <Route path='/admin/addproduct' element={<CreateProductScreen/>}/>
        <Route path='/admin/editproduct/:id' element={<EditProductScreen/>}/>

        {/* users */}
        <Route path='/admin/userlist' element={<UserListScreenAdmin/>}/>
        <Route path='/admin/edituser/:id' element={<EditUserScreen/>}/>
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
