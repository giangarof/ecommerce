//react
import { useState } from 'react'
import { Outlet } from 'react-router-dom';

//Components
import Header from './components/Header';
import Footer from './components/Footer';

//bootstrap
import { Container } from 'react-bootstrap';


//css
import {ToastContainer} from 'react-toastify';
import './assets/styles/index.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App;
