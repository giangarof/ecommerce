import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

//slice
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../slices/productApiSlice'

//bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap'

//components
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

export default function EditProductScreen() {
    const [name,setName] = useState('');
    const [author,setAuthor] = useState('');
    const [price,setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('');
    const [image,setImage] = useState('');

    const navigate = useNavigate()

    const {id} = useParams();
    const {data:product, isLoading, isError} = useGetProductByIdQuery(id)

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const uploadFileHandler = (e) => {
        const file = e.target.files[0]
        setImage(file)
        // console.log(file)
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await updateProduct({
                id,
                name,
                author,
                price,
                image,
                category,
                description,
                countInStock,
            }).unwrap();
            toast.success('Product updated successfully!');
            navigate('/admin/productlist');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.message);
        }
    }

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setAuthor(product.author);
            setCountInStock(product.countInStock);
            setImage(product.image);
        }
      }, [product]);

  return (
    <>
            {loadingUpdate && <Loader />}
            {isLoading ? <Loader/> : isError ? <Message variant='danger'>{isError}</Message> : (
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
                                placeholder={description}
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
                        <Form.Group controlId='brand' className='my-3'>
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
                        
                        <Button type='submit' variant='primary' className='mt-2'>Update Book</Button>
                        {isLoading && <Loader/>}
                    </Form>
                </FormContainer>
            )}
        </>
  )
}
