//react
import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

//redux
import { useDispatch, useSelector } from 'react-redux'

//bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'

//components
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'

//slice
import { useLoginMutation } from '../../slices/userApiSlice'
import { setCredentials } from '../../slices/authSlice'

//other
import { toast } from 'react-toastify'

export default function LoginScreen() {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state) => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate(redirect)
        } catch (error) {
            console.log(error.data)
            toast.error(error.data)
        }
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>Sign In</Button>
            {isLoading && <Loader/>}
        </Form>
        <Row className='py-3'>
            <Col>
                New Costumer? {' '}
                <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>Sign Up</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}
