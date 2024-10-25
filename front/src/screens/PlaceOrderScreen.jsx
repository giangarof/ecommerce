//react
import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

//redux
import { useDispatch, useSelector } from 'react-redux'

//bootstrap
import { Button,Row, Col, ListGroup,Image, Card } from 'react-bootstrap'

//components
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'

//slice
import {useCreateOrderMutation} from '../slices/orderApiSlice'
import {clearCartItems} from '../slices/cartSlice'

export default function PlaceOrderScreen() {
  const [createOrder, {isLoading, error}] = useCreateOrderMutation()
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const placeOrderHandler = async() => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          image: item.image[0].url, // Extract the URL from the first image object in the array
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      console.log(res)
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (error) {
      console.log(error?.data?.message)
      toast.error(error?.data?.message)
    }
  }

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
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>

            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* <p> */}
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup>
                    {cart.cartItems.map((item,index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={3}>
                            <Image src={item.image[0]?.url} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price} 
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              {/* </p> */}

            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant='danger'>{error?.data?.message}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button 
                    type='button' 
                    className='btn-block' 
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}>
                      Place Order
                  </Button>
                  {isLoading && <Loader/>}
                </ListGroup.Item>
              </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}
