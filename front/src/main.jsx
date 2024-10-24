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

//screens
import App from './App.jsx'
import Home from './screens/Home.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import SignupScreen from './screens/SignupScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/signup' element={<SignupScreen/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
