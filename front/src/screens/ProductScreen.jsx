//react
import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

//css
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

//components
import Rating from '../components/Rating.jsx';
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'

//redux
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductByIdQuery, useCreateReviewMutation, useDeleteReviewMutation, } from '../slices/productApiSlice.js';
import { addTocart } from '../slices/cartSlice.js';


export default function ProductScreen() {
    const [qty, setQty]= useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const {id} = useParams();
    const {data:product, isLoading, refetch, isError} = useGetProductByIdQuery(id);
    const [createReview, {isLoading: isLoadingReview}] = useCreateReviewMutation()
    const [deleteReview, {isLoading: loadindDeleteReview}] = useDeleteReviewMutation()

    const {userInfo} = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addTocart({...product, qty}))
        navigate('/cart')
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            await createReview({
                id,
                rating,
                comment
            }).unwrap()
            refetch()
            toast.success('Review Submitted!')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const deleteHandler = async(productId, deleteReviewId) => {
        // e.preventDefault()
        if (window.confirm('Are you sure')){
            try {
                console.log(productId, deleteReviewId)
                await deleteReview({id:productId, idreview:deleteReviewId})
                toast.success('Review deleted successfully')
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
        
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
                <Row className='review'>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && (
                            <Message>No reviews</Message>
                        )}

                        <ListGroup variant='flush'>
                            {product.reviews.map(x => (
                                <ListGroup.Item key={x._id}>
                                    <Row>
                                        <Col md={8}>
                                            <strong md={2}>{x.name}</strong>
                                        </Col>
                                        <Col md={4}>
                                            <Button variant='danger' onClick={() => deleteHandler(product._id, x._id)}>Delete Review</Button>
                                        </Col>
                                    </Row>
                                    <Rating value={x.rating}></Rating>
                                    <p>{x.createdAt.substring(0,10)}</p>
                                    <p>{x.comment}</p>
                                </ListGroup.Item>
                            ))}
                                <ListGroup.Item>
                                    <h2>Write a costumer review</h2>
                                    {isLoadingReview && <Loader/>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className='my-2' controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select' 
                                                    value={rating} 
                                                    onChange={(e) => setRating(Number(e.target.value))}>
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='my-2' controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button disabled={isLoadingReview} type='submit' variant='primary'>
                                                Submit Review
                                            </Button>
                                        </Form>
                                    ) : (
                                        <>
                                            <Message>Log In to submit a review.</Message>
                                        </>)}
                                </ListGroup.Item>
                        </ListGroup>
                    </Col>

                </Row>
            </>
        )}

    </>
  )
}
