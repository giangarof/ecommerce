import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

//slice
import { useUserByIdQuery, useUpdateUserMutation } from '../../slices/userApiSlice'

//bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'

//components
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

export default function EditUserScreen() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    
    const navigate = useNavigate()

    const {id} = useParams();
    const {data:user, isLoading, isError} = useUserByIdQuery(id)

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await updateUser({
                id,
                name,
                email,
                isAdmin,
            }).unwrap();
            toast.success('User updated successfully!');
            console.log(res)
            navigate('/admin/userlist');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.message);
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
      }, [user]);

  return (
    <>
            {loadingUpdate && <Loader />}
            {isLoading ? <Loader/> : isError ? <Message variant='danger'>{isError}</Message> : (
                <FormContainer>
                    <h1>User Form</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='my-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter book`s name'
                                value={name}
                                onChange={(e) =>setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='my-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='description'
                                placeholder={email}
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='my-3'>
                            <Form.Label>Is Admin</Form.Label>
                            <Form.Check
                                type='checkbox'
                                checked={isAdmin}
                                onChange={(e) =>setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        
                        <Button type='submit' variant='primary' className='mt-2'>Update User</Button>
                        {isLoading && <Loader/>}
                    </Form>
                </FormContainer>
            )}
        </>
  )
}
