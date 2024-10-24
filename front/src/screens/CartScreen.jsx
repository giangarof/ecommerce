//react
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

//redux
import { useDispatch, useSelector } from 'react-redux'

//bootstrap
import {Row, Col, ListGroup, Image, Form, Card, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'

//components
import Message from '../components/Message'

//slices
import { addTocart } from '../slices/cartSlice'

export default function CartScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart;

    const addQtyHandler = async(item, qty) => {
        dispatch(addTocart({...item, qty}))
    }

  return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom:"20px"}}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>Your cart is empty <Link to='/'>Start Shopping</Link></Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image[0].url} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control 
                                    as='select' 
                                    value={item.qty} 
                                    onChange={(e) => addQtyHandler(item, Number(e.target.value))}
                                    >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='ligth'>
                                        <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc,item) => acc+item.qty,0)}) Items</h2>
                        ${cartItems.reduce((acc,item) => acc+item.qty * item.price,0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0}>
                            Proceed to checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}
