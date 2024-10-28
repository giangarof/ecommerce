import React, {useEffect, useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { toast } from 'react-toastify'

//slice
import { useProfileMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { Col, Row, Form, Button } from 'react-bootstrap'

export default function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile, {isLoading:loadingUpdateProfile}] = useProfileMutation()

    const dispatch = useDispatch()

    console.log(userInfo)

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
        <Col md={9}>column</Col>
    </Row>
  )
}
