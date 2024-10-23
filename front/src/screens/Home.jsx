//bootstrap
import React, {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'

//components
import Product from '../components/Product.jsx'

//slice
import { useGetProductsQuery } from '../slices/productApiSlice.js'


export default function Home() {
    const {data:products, isLoading, isError} = useGetProductsQuery()
   
  return (
    <>
        {isLoading ? (
            <>
                <h2>Loading...</h2>
            </>) : 
        isError ? (
            <>
                 <h2>{isError}</h2>
            </>) : (
            <>
                <h1>Latest Books</h1>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
            </>)}
    </>
  )
}
