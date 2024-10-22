import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import Rating from '../components/Rating.jsx';
import axios from 'axios';


export default function ProductScreen() {
    const [product, setProduct] = useState([])
    const {id} = useParams();

    // const product = products.find((p) => p._id == id)
    // console.log(product)

    useEffect(() => {
        const data = async() => {
            const {data} = await axios.get(`/api/products/${id}`)
            setProduct(data.product)
            console.log(data)

        }
        data()
    }, [id])

  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>

        <Row>
            <Col md={5}>
            {Array.isArray(product.image) && product.image.length > 0 && (

                <Image src={product.image[0]?.url} alt={product.name} fluid/>
            )}
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
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    </>
  )
}
