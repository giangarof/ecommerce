//react
import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

//css
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

//components
import Rating from '../components/Rating.jsx';
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'

//redux
import { useDispatch } from 'react-redux';
import { useGetProductByIdQuery } from '../slices/productApiSlice.js';
import { addTocart } from '../slices/cartSlice.js';


export default function ProductScreen() {
    const [qty, setQty]= useState(1)
    const {id} = useParams();
    const {data:product, isLoading, isError} = useGetProductByIdQuery(id)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addTocart({...product, qty}))
        navigate('/cart')
    }


  return (
    <>
        {isLoading ? (
            <>
            <Loader/>
            </> 
        ) : isError ? (
            <>
            <Message variant='danger'>{isError}</Message>
            </> 
        ) : (
            <>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>

                <Row>
                    <Col md={5}>
                    {/* {Array.isArray(product.image) && product.image.length > 0 && (

                    )} */}
                    <Image src={product.image[0].url} alt={product.name} fluid/>
                    </Col>

                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>Author: {product.author} </ListGroup.Item>
                            <ListGroup.Item>Sinopsis: {product.description} </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price</Col>
                                        <Col> <strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>In stock</Col>
                                        <Col> 
                                            <strong>
                                                {product.countInStock > 0 ? `${product.countInStock}` : `No copies available`}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>QTY</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>

                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x+1} value={x+1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                        Add to cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )}

    </>
  )
}
