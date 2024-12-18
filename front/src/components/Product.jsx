import React from 'react'

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

export default function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded fluid' >
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image[0]?.url} variant='top' alt={product.name} style={{height:'300px'}}/>
        </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div" className='product-title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews}`}/>
            </Card.Text>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
