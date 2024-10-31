//react
import React from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux'

//bootstrap
import {LinkContainer} from 'react-router-bootstrap'

//components
import Message from '../../components/Message'
import Loader from '../../components/Loader'

//slice
import { useDeleteProductMutation, useGetProductsQuery } from '../../slices/productApiSlice'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export default function ProductListScreenAdmin() {
    const {keyword} = useParams()
    const {data:products, refetch, isLoading, error,} = useGetProductsQuery({keyword})
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    // console.log(products)
    
    const deleteHandler = async(id) => {
        if (window.confirm('Are you sure')){
            try {
                await deleteProduct(id)
                toast.success('Product deleted successfully')
                refetch()
            } catch (error) {
                toast.error(err?.data?.message || err.error);
            }
        }
        
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col><h1>Products</h1></Col>
                <Col className='text-end'>
                    <LinkContainer to={`/admin/addproduct`}>
                        <Button className='btn-sm m-3'>Create Product</Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>AUTHOR</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((x) => (
                            <tr key={x._id}>
                                <td>{x._id}</td>
                                <td>{x.name}</td>
                                <td>{x.price}</td>
                                <td>{x.category}</td>
                                <td>{x.author}</td>
                                <td>
                                    <LinkContainer to={`/admin/editproduct/${x._id}`}>
                                        <Button variant='light' className='btn-sm ms-2'>Edit</Button>
                                    </LinkContainer>
                                    <Button onClick={() => deleteHandler(x._id)} variant='danger' className='btn-sm ms-2'>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
