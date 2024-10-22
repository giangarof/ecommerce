import React, {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
// import products from '../../products'
import Product from '../components/Product.jsx'

import axios from 'axios'

export default function Home() {
    const [products, setProduct] = useState([])

    useEffect(() => {
        const data = async() => {
            const {data} = await axios.get('/api/products/')
            setProduct(data)
            console.log(data)
        }

        data()
    }, [])
  return (
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
  )
}
