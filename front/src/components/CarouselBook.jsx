import React from 'react'
import { Link } from "react-router-dom";
import { Image, Carousel, Row, Col } from "react-bootstrap";

import Message from './Message';

import { useGetTopProductQuery } from '../slices/productApiSlice';
import Loader from './Loader';


export default function CarouselBook() {
    const {data, isLoading, error} = useGetTopProductQuery([])
    console.log(data)
  return (
    isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-primary mb-4'>
            {data.map(x => (
                <Carousel.Item key={x._id}>
                            <Link to={`/product/${x._id}`}>
                                <Image src={x.image[0]?.url} alt={x.name} className="image-size" />
                            </Link>
                   
                                <Carousel.Caption >
                                    <h2>{x.name}</h2>
                                </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}
