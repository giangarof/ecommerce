import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button,Row, Col, ListGroup,Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

export default function PlaceOrderScreen() {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if(!cart.shippingAddress.address){
      navigate('/shipping')
      
    } else if (!cart.paymentMethod){
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>column</Col>
        <Col md={4}>column</Col>
      </Row>
    </>
  )
}
