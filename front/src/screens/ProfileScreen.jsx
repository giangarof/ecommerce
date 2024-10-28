//react
import React, {useEffect, useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'

//redux
import { useSelector, useDispatch } from 'react-redux'

//components
import Message from '../components/Message'
import Loader from '../components/Loader'

//slice
import { useGetMyOrderQuery } from '../slices/orderApiSlice'
import { useProfileMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { Col, Row, Form, Button, Table } from 'react-bootstrap'

export default function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile, {isLoading:loadingUpdateProfile}] = useProfileMutation()
    const {data:orders, isLoading, error} = useGetMyOrderQuery()
    const dispatch = useDispatch()

    // console.log(userInfo)

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email)
        }
    }, [userInfo, userInfo._id, userInfo.name, userInfo.email]);

    const submitHandler = async(e) => {
        e.preventDefault()
        console.log('ok')
        if(password !== confirmPassword) {
            toast.error(`Password do not match.`)
        } else {
            try {
                const res = await updateProfile({_id:userInfo._id, name,email,password}).unwrap()
                console.log(res)
                dispatch(setCredentials(res))
                toast.success(`Profile updated successfully`)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                </Form.Group>
                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Enter confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Update Changes</Button>
                {loadingUpdateProfile && <Loader />}
            </Form>
        </Col>


        <Col md={9}>
            <h2>My Orders</h2>
           {isLoading ? 
                <Loader />
                
                : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error || 'no orders'}
                </Message>) : (
    
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.paidAt ? (
                                    <>
                                        {order.paidAt.substring(0,10)}
                                    </>
                                    ) : 'No'}
                                </td>
                                <td>{order.deliveredAt ? (
                                    <>
                                        {order.deliveredAt.substring(0,10)}
                                    </> 
                                ) : 'No'}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='info'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            )}
        </Col>
    </Row>
  )
}
