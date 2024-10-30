//react
import React, {useEffect, useState} from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

//bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'

//components
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

//slices
import { useCreateProductMutation } from '../../slices/productApiSlice'

export default function CreateProductScreen() {
    const [name,setName] = useState('');
    const [author,setAuthor] = useState('');
    const [price,setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('');
    const [image,setImage] = useState('');

    const [createProduct, {isLoading, isError}] = useCreateProductMutation()
    const navigate = useNavigate()

    const uploadFileHandler = (e) => {
        const file = e.target.files[0]
        setImage(file)
        // console.log(file)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('author', author);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('countInStock', countInStock);
            formData.append('image', image); // Attach the file
    
            const res = await createProduct(formData).unwrap();
            toast.success('Product created!');
            navigate('/admin/productlist');
            // console.log(res);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.message);
        }
    };

    return (
        <>
            {isLoading ? <Loader/> :isError ? <Message variant='danger'>{isError}</Message> : (
                <FormContainer>
                    <h1>Book Form</h1>
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='description'
                                placeholder='Enter book`s description'
                                value={description}
                                onChange={(e) =>setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='my-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter book`s price'
                                value={price}
                                onChange={(e) =>setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='author' className='my-3'>
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type='author'
                                placeholder='Enter author'
                                value={author}
                                onChange={(e) =>setAuthor(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category' className='my-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='brand'
                                placeholder='Enter book`s brand'
                                value={category}
                                onChange={(e) =>setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='qty' className='my-3'>
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter book`s available to sell'
                                value={countInStock}
                                onChange={(e) =>setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image' className='my-3'>
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type='file'
                                onChange={uploadFileHandler}>
                            </Form.Control>
                        </Form.Group>
                        
                        <Button type='submit' variant='primary' className='mt-2'>Add Book</Button>
                        {isLoading && <Loader/>}
                    </Form>
                </FormContainer>
            )}
        </>
    )
}
