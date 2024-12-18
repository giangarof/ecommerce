//bootstrap
import React, {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'

//components
import Product from '../components/Product.jsx'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import CarouselBook from '../components/CarouselBook.jsx'

//slice
import { useGetProductsQuery } from '../slices/productApiSlice.js'
import { useParams } from 'react-router-dom'


export default function Home() {
    const {keyword} = useParams()
    console.log(keyword)
    const {data:products, isLoading, isError} = useGetProductsQuery({keyword})
    // console.log(products)
   
  return (
    <>
                <CarouselBook />
        {isLoading ? (
            <>
                <Loader/>
            </>) : 
        isError ? (
            <>
                 <Message variant='danger'>{isError}</Message>
            </>) : products.length > 0 ? (
                <>
                    <h1>Latest Books</h1>
                    
                        <Row>
                            {products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                </>
            ) : (
                <>
                    No products found.
                </>
            )}
    </>
  )
}
