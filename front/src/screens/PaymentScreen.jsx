//react
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { useSelector, useDispatch } from 'react-redux'

//components
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

//bootstrap
import { Button, Col, Form } from 'react-bootstrap';

//slice
import { savePaymentMethod } from '../slices/cartSlice'

export default function PaymentScreen() {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <h1>Payment Method</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        className='my-2'
                        label='Paypal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}
