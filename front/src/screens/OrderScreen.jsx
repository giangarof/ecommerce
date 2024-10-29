//react
import React, {useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

//components
import Message from '../components/Message'
import Loader from '../components/Loader'

//slice
import { 
    useGetOrderDetailsQuery, 
    useGetPayPalClientIdQuery, 
    usePayOrderMutation, 
    useDeliverOrderMutation,

 } from '../slices/orderApiSlice'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'

//paypal
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'


export default function OrderScreen() {
    const {id:orderId} = useParams()
    const {data:order, refetch, isLoading, isError} = useGetOrderDetailsQuery(orderId)
    const [deliverOrder, {isLoading:loadingDeliver}] = useDeliverOrderMutation()
    console.log(order)
    const {userInfo} = useSelector((state) => state.auth)
    
    const [payOrder, {isLoading:loadingPay}] = usePayOrderMutation()
    const [ {isPending}, paypalDispatch ] = usePayPalScriptReducer()

    const {data:paypal, isLoading:loadingPaypal, error:errorPaypal} = useGetPayPalClientIdQuery()

    useEffect(() => {
        if(!errorPaypal && !loadingPaypal && paypal.clientId){
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type:'resetOptions',
                    value:{
                        'client-id': paypal.clientId,
                        currency:'USD'
                    }
                });
                paypalDispatch({type:'setLoadingStatus', value:'pending'})
            }
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPaypalScript()
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal])

    const onApproveTest = async() => {
        await payOrder({orderId,details:{payer:{}}});
        refetch();
        toast.success('Payment successful')
    }

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(async function(details){ 
            try {
                await payOrder({orderId,details});
                refetch();
                toast.success('Payment successful')
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        })
    }

    const onError = (err) => {
        toast.err(err.message)
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount:{
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => {
            return orderId
        })
    }

    const deliveredHandler = async() => {
        try {
            await deliverOrder(orderId)
            refetch()
            toast.success('Order delivered')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }
    
    return isLoading ? <Loader /> : isError ? <Message variant='danger' /> : (
        <>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Email:</strong> {order.user.email}</p>
                        <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                        {order.isDelivered ? (
                            <Message variant='success'>
                                Delivered on: {order.deliveredAt.substring(0,10)}
                            </Message>
                        ) : (
                            <>
                            <Message variant='danger'>
                                Not delivered
                            </Message>
                            </>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>
                                Delivered on: {order.paidAt.substring(0,10)}
                            </Message>
                        ) : (
                            <>
                            <Message variant='danger'>
                                No paid
                            </Message>
                            </>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item,index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={4}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>
                                        {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card >
                    <ListGroup variant='flush'>

                        <ListGroup.Item >
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {/* pay order */}
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {isLoading && <Loader />}

                                {isPending ? <Loader /> : (
                                    <div>
                                        {/* <Button onClick={onApproveTest} style={{marginBottom:'10px'}}>Test</Button> */}
                                        <div>
                                            <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                                        </div>
                                    </div>
                                )}
                            </ListGroup.Item>
                        )}

                        {/* mark as delivered */}
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliveredHandler}>
                                    Mark as deliverd
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>

                </Card>
            </Col>
        </Row>
        </>
    )
}
